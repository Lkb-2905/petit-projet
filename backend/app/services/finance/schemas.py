from typing import List, Optional
from pydantic import BaseModel, UUID4
from decimal import Decimal
from datetime import datetime
import enum

class LedgerEntrySchema(BaseModel):
    id: UUID4
    transaction_id: UUID4
    direction: str
    amount: Decimal
    balance_after: Decimal
    description: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class WalletResponse(BaseModel):
    id: UUID4
    user_id: UUID4
    type: str
    currency: str
    balance: Decimal
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class PaymentMethod(str, enum.Enum):
    STRIPE = "STRIPE"
    ORANGE_MONEY = "ORANGE_MONEY"
    MTN_MONEY = "MTN_MONEY"
    PAYPAL = "PAYPAL"
    CRYPTO = "CRYPTO"

class DepositRequest(BaseModel):
    amount: Decimal
    currency: str = "XAF"
    payment_method: PaymentMethod = PaymentMethod.ORANGE_MONEY
    source: str = "MobileMoney" # Deprecated, kept for compatibility
    transaction_ref: Optional[str] = None

class TransferRequest(BaseModel):
    recipient_email: str
    amount: Decimal
    description: Optional[str] = "Transfer"
