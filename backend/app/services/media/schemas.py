from typing import Optional, List
from pydantic import BaseModel, UUID4
from datetime import datetime

class MediaFileSchema(BaseModel):
    quality: str
    file_url: str
    file_size: int

    class Config:
        from_attributes = True

class MediaCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category: Optional[str] = "General"
    visibility: Optional[str] = "public"

class MediaResponse(BaseModel):
    id: UUID4
    creator_id: UUID4
    title: str
    description: Optional[str]
    category: Optional[str]
    visibility: str
    status: str
    thumbnail_url: Optional[str]
    views_count: int
    likes_count: int
    created_at: datetime
    files: List[MediaFileSchema] = []

    class Config:
        from_attributes = True
