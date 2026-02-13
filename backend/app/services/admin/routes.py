from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.database import get_db
from app.services.auth import models as auth_models
from app.services.auth import schemas as auth_schemas
from app.services.auth.deps import get_current_admin
from app.services.finance import models as finance_models

router = APIRouter()

@router.get("/users", response_model=List[auth_schemas.UserResponse])
def list_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    admin: auth_models.User = Depends(get_current_admin)
):
    users = db.query(auth_models.User).offset(skip).limit(limit).all()
    return users

@router.post("/users/{user_id}/ban")
def ban_user(
    user_id: str,
    db: Session = Depends(get_db),
    admin: auth_models.User = Depends(get_current_admin)
):
    user = db.query(auth_models.User).filter(auth_models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_active = False
    db.commit()
    return {"message": f"User {user.email} has been banned"}

@router.post("/users/{user_id}/unban")
def unban_user(
    user_id: str,
    db: Session = Depends(get_db),
    admin: auth_models.User = Depends(get_current_admin)
):
    user = db.query(auth_models.User).filter(auth_models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_active = True
    db.commit()
    return {"message": f"User {user.email} has been activated"}

@router.get("/stats")
def get_system_stats(
    db: Session = Depends(get_db),
    admin: auth_models.User = Depends(get_current_admin)
):
    total_users = db.query(auth_models.User).count()
    active_users = db.query(auth_models.User).filter(auth_models.User.is_active == True).count()
    
    # Calculate Total Funds (Sum of all MAIN wallets)
    total_funds = db.query(func.sum(finance_models.WalletAccount.balance)).filter(
        finance_models.WalletAccount.type == "MAIN"
    ).scalar() or 0
    
    return {
        "total_users": total_users,
        "active_users": active_users,
        "total_funds": float(total_funds),
        "currency": "XAF"
    }
