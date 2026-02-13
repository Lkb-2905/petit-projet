import uuid
from decimal import Decimal
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.auth.deps import get_current_user
from app.services.auth.models import User
from app.services.finance import models, schemas

router = APIRouter()

# Helper to get or create main wallet
def get_main_wallet(db: Session, user_id: uuid.UUID):
    wallet = db.query(models.WalletAccount).filter(
        models.WalletAccount.user_id == user_id, 
        models.WalletAccount.type == "MAIN"
    ).first()
    
    if not wallet:
        wallet = models.WalletAccount(user_id=user_id, type="MAIN", currency="XAF", balance=0)
        db.add(wallet)
        db.commit()
        db.refresh(wallet)
    return wallet

@router.get("/balance", response_model=schemas.WalletResponse)
def get_balance(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return get_main_wallet(db, current_user.id)

@router.post("/deposit", response_model=schemas.WalletResponse)
def deposit_funds(request: schemas.DepositRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    wallet = get_main_wallet(db, current_user.id)
    
    # 1. Simulate External Transaction (Mobile Money)
    # In real life, we would verify a webhook signature here.
    
    # 2. Create Ledger Entry (Credit)
    transaction_id = uuid.uuid4()
    amount = request.amount
    
    balance_before = wallet.balance
    balance_after = balance_before + amount
    
    entry = models.LedgerEntry(
        transaction_id=transaction_id,
        account_id=wallet.id,
        direction="CREDIT",
        amount=amount,
        balance_before=balance_before,
        balance_after=balance_after,
        description=f"Deposit via {request.payment_method.value} - Ref: {request.transaction_ref}" if request.transaction_ref else f"Deposit via {request.payment_method.value}"
    )
    
    # 3. Update Wallet
    wallet.balance = balance_after
    
    db.add(entry)
    db.add(wallet)
    db.commit()
    db.refresh(wallet)
    
    return wallet

@router.post("/transfer", response_model=schemas.WalletResponse)
def transfer_funds(request: schemas.TransferRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    sender_wallet = get_main_wallet(db, current_user.id)
    
    # Check balance
    if sender_wallet.balance < request.amount:
        raise HTTPException(status_code=400, detail="Insufficient funds")
    
    # Find recipient
    recipient_user = db.query(User).filter(User.email == request.recipient_email).first()
    if not recipient_user:
        raise HTTPException(status_code=404, detail="Recipient not found")
        
    recipient_wallet = get_main_wallet(db, recipient_user.id)
    
    # ATOMIC TRANSACTION
    try:
        transaction_id = uuid.uuid4()
        amount = request.amount
        
        # 1. Debit Sender
        sender_balance_before = sender_wallet.balance
        sender_balance_after = sender_balance_before - amount
        
        sender_entry = models.LedgerEntry(
            transaction_id=transaction_id,
            account_id=sender_wallet.id,
            direction="DEBIT",
            amount=amount,
            balance_before=sender_balance_before,
            balance_after=sender_balance_after,
            description=f"Transfer to {recipient_user.email}"
        )
        sender_wallet.balance = sender_balance_after
        
        # 2. Credit Recipient
        recipient_balance_before = recipient_wallet.balance
        recipient_balance_after = recipient_balance_before + amount
        
        recipient_entry = models.LedgerEntry(
            transaction_id=transaction_id,
            account_id=recipient_wallet.id,
            direction="CREDIT",
            amount=amount,
            balance_before=recipient_balance_before,
            balance_after=recipient_balance_after,
            description=f"Transfer from {current_user.email}"
        )
        recipient_wallet.balance = recipient_balance_after
        
        db.add(sender_entry)
        db.add(sender_wallet)
        db.add(recipient_entry)
        db.add(recipient_wallet)
        
        db.commit()
        db.refresh(sender_wallet)
        return sender_wallet
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
