import uuid
from sqlalchemy import Column, String, ForeignKey, Numeric, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.core.database import Base
import enum

class CurrencyType(str, enum.Enum):
    XAF = "XAF"
    EUR = "EUR"
    USD = "USD"

class WalletType(str, enum.Enum):
    MAIN = "MAIN"
    SAVINGS = "SAVINGS"
    CREATOR = "CREATOR"

class EntryDirection(str, enum.Enum):
    DEBIT = "DEBIT"   # Outgoing
    CREDIT = "CREDIT" # Incoming

class WalletAccount(Base):
    __tablename__ = "wallet_accounts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    type = Column(String, default=WalletType.MAIN)
    currency = Column(String, default=CurrencyType.XAF)
    balance = Column(Numeric(18, 4), default=0)
    status = Column(String, default="ACTIVE")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", backref="wallets")
    entries = relationship("LedgerEntry", back_populates="account")

class LedgerEntry(Base):
    __tablename__ = "ledger_entries"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    transaction_id = Column(UUID(as_uuid=True), nullable=False, index=True) # Grouping ID for double entry
    account_id = Column(UUID(as_uuid=True), ForeignKey("wallet_accounts.id"), nullable=False)
    direction = Column(String, nullable=False) # DEBIT or CREDIT
    amount = Column(Numeric(18, 4), nullable=False)
    balance_before = Column(Numeric(18, 4), nullable=False)
    balance_after = Column(Numeric(18, 4), nullable=False)
    description = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    account = relationship("WalletAccount", back_populates="entries")
