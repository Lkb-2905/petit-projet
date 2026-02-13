from typing import Optional
from pydantic import BaseModel, EmailStr, UUID4

class UserBase(BaseModel):
    email: EmailStr


class UserCreate(UserBase):
    password: str
    username: Optional[str] = None
    referral_code: Optional[str] = None

class UserLogin(UserBase):
    password: str

class UserProfileSchema(BaseModel):
    username: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    country: Optional[str] = None

    class Config:
        from_attributes = True

class UserResponse(UserBase):
    id: UUID4
    role: str
    citizenship_tier: str
    engagement_score: int
    referral_code: Optional[str] = None
    is_active: bool
    profile: Optional[UserProfileSchema] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    expires_in: int
