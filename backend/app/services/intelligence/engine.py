from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from app.services.media.models import Media
from app.services.intelligence.models import UserInteraction
import random

class TwoTowerEngine:
    def __init__(self, db: Session):
        self.db = db

    def get_candidates(self, limit: int = 100):
        """
        Tower 1: Information Retrieval
        Fetches a broad set of relevant videos rapidly.
        Strategies:
        - Popularity (Global Views)
        - Recency (New Uploads)
        """
        # 1. Popular Candidates
        popular = self.db.query(Media).order_by(desc(Media.views_count)).limit(limit // 2).all()
        
        # 2. Fresh Candidates (Exploration)
        fresh = self.db.query(Media).order_by(desc(Media.created_at)).limit(limit // 2).all()
        
        # Deduplicate
        candidates = list({m.id: m for m in (popular + fresh)}.values())
        return candidates

    def rank_candidates(self, user_id: str, candidates: list):
        """
        Tower 2: Fine Ranking (The "Brain")
        Scores each candidate based on user's probability to engage.
        Formula (MVP): Score = (Popularity * 0.3) + (Recency * 0.2) + (Random_Discovery * 0.5)
        """
        scored_items = []
        
        for media in candidates:
            # Simple heuristic scoring for MVP
            score = 0
            score += (media.views_count or 0) * 0.01  # Normalized popularity
            score += random.uniform(0, 10) # Discovery factor (Cold Start handling)
            
            # Boost depending on category (Simulating user preference)
            # if media.category in user.preferred_categories: score *= 2
            
            scored_items.append((media, score))
            
        # Sort by score descending
        scored_items.sort(key=lambda x: x[1], reverse=True)
        return [item[0] for item in scored_items]

    def get_feed(self, user_id: str, limit: int = 20):
        candidates = self.get_candidates(limit=50)
        ranked = self.rank_candidates(user_id, candidates)
        return ranked[:limit]
