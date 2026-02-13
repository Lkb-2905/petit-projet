import uuid
from sqlalchemy import Column, String, Boolean, ForeignKey, Integer, DateTime, Text, BigInteger
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.core.database import Base

class Media(Base):
    __tablename__ = "media"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    creator_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String, nullable=True) # Music, Sport, Education...
    visibility = Column(String, default="public") # public, premium, private
    status = Column(String, default="processing") # processing, published, rejected
    
    duration_seconds = Column(Integer, default=0)
    thumbnail_url = Column(String, nullable=True)
    
    views_count = Column(BigInteger, default=0)
    likes_count = Column(BigInteger, default=0)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    creator = relationship("User", backref="media_items")
    files = relationship("MediaFile", back_populates="media", cascade="all, delete-orphan")

class MediaFile(Base):
    __tablename__ = "media_files"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    media_id = Column(UUID(as_uuid=True), ForeignKey("media.id"), nullable=False)
    quality = Column(String, nullable=False) # original, 360p, 720p, 1080p
    file_url = Column(String, nullable=False)
    file_size = Column(BigInteger, default=0)
    
    media = relationship("Media", back_populates="files")
