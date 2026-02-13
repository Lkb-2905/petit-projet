import uuid
from sqlalchemy import Column, String, ForeignKey, Integer, DateTime, Float
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.core.database import Base

class UserInteraction(Base):
    __tablename__ = "user_interactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    media_id = Column(UUID(as_uuid=True), ForeignKey("media.id"), nullable=False)
    
    # Interaction Types: VIEW, LIKE, SHARE, COMMENT, SKIP
    interaction_type = Column(String, nullable=False) 
    
    # Context
    watch_time_seconds = Column(Float, default=0.0)
    weight = Column(Float, default=1.0) # Calculated score impact
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", backref="interactions")
    media = relationship("Media", backref="interactions")
