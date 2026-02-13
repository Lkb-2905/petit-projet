import uuid
from sqlalchemy import Column, String, Boolean, ForeignKey, Integer, DateTime
from sqlalchemy.orm import relationship, backref
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, nullable=True)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="viewer")  # viewer, creator, admin
    citizenship_tier = Column(String, default="iron") # iron, gold, vibranium
    engagement_score = Column(Integer, default=0)
    referral_code = Column(String, unique=True, index=True, nullable=True)
    referred_by_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    profile = relationship("UserProfile", back_populates="user", uselist=False)
    referrals = relationship("User", backref=backref("referrer", remote_side=[id]))

class UserProfile(Base):
    __tablename__ = "user_profiles"
    
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)
    username = Column(String, unique=True, index=True)
    bio = Column(String, nullable=True)
    avatar_url = Column(String, nullable=True)
    country = Column(String(2), nullable=True) # ISO Code
    
    user = relationship("User", back_populates="profile")
