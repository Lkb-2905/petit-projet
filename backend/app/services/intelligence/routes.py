from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.services.auth.deps import get_current_user
from app.services.auth.models import User
from app.services.media import schemas as media_schemas
from app.services.intelligence.engine import TwoTowerEngine
from app.services.intelligence.models import UserInteraction
from app.services.intelligence.gamification import gamification_service
from pydantic import BaseModel

router = APIRouter()

class InteractionCreate(BaseModel):
    media_id: str
    type: str # VIEW, LIKE, SKIP
    watch_time: float = 0.0

@router.get("/feed", response_model=List[media_schemas.MediaResponse])
def get_personalized_feed(
    limit: int = 20, 
    current_user: User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    """
    Returns a personalized video feed using the Two-Tower Recommendation Architecture.
    """
    engine = TwoTowerEngine(db)
    return engine.get_feed(user_id=str(current_user.id), limit=limit)

@router.post("/interact", status_code=status.HTTP_201_CREATED)
def track_interaction(
    interaction: InteractionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Feeds the algorithm with user behavioral data.
    """
    # Calculate implicit weight
    weight = 1.0
    if interaction.type == "LIKE": weight = 5.0
    elif interaction.type == "SKIP": weight = -2.0
    
    db_interaction = UserInteraction(
        user_id=current_user.id,
        media_id=interaction.media_id,
        interaction_type=interaction.type,
        watch_time_seconds=interaction.watch_time,
        weight=weight
    )
    db.add(db_interaction)
    db.commit()
    return {"status": "captured", "weight": weight}

class PointsRequest(BaseModel):
    action_type: str
    custom_points: int = None

@router.get("/gamification/progress")
def get_gamification_progress(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return gamification_service.get_progress(db, str(current_user.id))

@router.post("/gamification/simulate")
def simulate_points(
    request: PointsRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # In production, restrict this to admin or specific internal services
    new_score = gamification_service.award_points(
        db, 
        str(current_user.id), 
        request.action_type, 
        request.custom_points
    )
    return {"new_score": new_score, "tier": current_user.citizenship_tier}
