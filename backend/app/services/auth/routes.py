from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_password_hash, verify_password, create_access_token
from app.services.auth import models, schemas
from app.services.auth.deps import get_current_user

router = APIRouter()

import secrets
import string

def generate_referral_code(length=8):
    alphabet = string.ascii_uppercase + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(length))

@router.post("/register", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def register(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    
    # Generate unique referral code
    referral_code = generate_referral_code()
    while db.query(models.User).filter(models.User.referral_code == referral_code).first():
        referral_code = generate_referral_code()

    # Handle Referral
    referred_by_id = None
    if user_in.referral_code:
        referrer = db.query(models.User).filter(models.User.referral_code == user_in.referral_code).first()
        if referrer:
            referred_by_id = referrer.id

    hashed_password = get_password_hash(user_in.password)
    db_user = models.User(
        email=user_in.email,
        hashed_password=hashed_password,
        role="viewer",
        citizenship_tier="iron",
        referral_code=referral_code,
        referred_by_id=referred_by_id
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Create empty profile
    db_profile = models.UserProfile(user_id=db_user.id, username=user_in.username)
    db.add(db_profile)
    db.commit()
    
    return db_user

@router.post("/token", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=30) # Should come from settings
    access_token = create_access_token(
        subject=user.id, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "expires_in": 30*60} # 30 mins

@router.get("/me", response_model=schemas.UserResponse)
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user
