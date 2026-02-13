from sqlalchemy.orm import Session
from app.services.auth.models import User
from app.services.intelligence.models import UserInteraction

# Tier Thresholds
TIERS = {
    "iron": 0,
    "gold": 1000,
    "vibranium": 5000
}

POINTS_MAP = {
    "REFERRAL": 100,
    "WATCH": 1,
    "LIKE": 5,
    "SHARE": 10,
    "COMMENT": 5
}

class GamificationService:
    def calculate_score(self, db: Session, user_id: str) -> int:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            return 0
        return user.engagement_score

    def award_points(self, db: Session, user_id: str, action_type: str, custom_points: int = None):
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            return None
        
        points = custom_points if custom_points is not None else POINTS_MAP.get(action_type, 0)
        user.engagement_score += points
        
        self.check_and_update_tier(user)
        
        db.commit()
        db.refresh(user)
        return user.engagement_score

    def check_and_update_tier(self, user: User):
        current_score = user.engagement_score
        new_tier = user.citizenship_tier
        
        if current_score >= TIERS["vibranium"]:
            new_tier = "vibranium"
        elif current_score >= TIERS["gold"]:
            new_tier = "gold"
        else:
            new_tier = "iron"
            
        if new_tier != user.citizenship_tier:
            user.citizenship_tier = new_tier
            # TODO: Trigger notification or reward
            
    def get_progress(self, db: Session, user_id: str):
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            return None
            
        current_tier = user.citizenship_tier
        score = user.engagement_score
        
        next_tier = None
        points_needed = 0
        
        if current_tier == "iron":
            next_tier = "gold"
            points_needed = TIERS["gold"] - score
        elif current_tier == "gold":
            next_tier = "vibranium"
            points_needed = TIERS["vibranium"] - score
            
        return {
            "current_tier": current_tier,
            "current_score": score,
            "next_tier": next_tier,
            "points_needed": max(0, points_needed) if next_tier else 0,
            "progress_percent": self._calculate_progress(score, current_tier)
        }

    def _calculate_progress(self, score: int, current_tier: str) -> float:
        if current_tier == "vibranium":
            return 100.0
            
        start = TIERS[current_tier]
        end = TIERS["gold"] if current_tier == "iron" else TIERS["vibranium"]
        
        if end == start: return 100.0
        
        return min(100.0, max(0.0, (score - start) / (end - start) * 100))

gamification_service = GamificationService()
