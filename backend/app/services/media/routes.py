import shutil
import os
import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.auth.deps import get_current_user
from app.services.auth.models import User
from app.services.media import models, schemas

router = APIRouter()

# Local storage configuration for MVP
UPLOAD_DIR = "/app/static/media"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload", response_model=schemas.MediaResponse, status_code=status.HTTP_201_CREATED)
async def upload_media(
    title: str = Form(...),
    description: str = Form(None),
    category: str = Form("General"),
    visibility: str = Form("public"),
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # 1. Save file locally (Simulating S3 upload)
    file_extension = file.filename.split(".")[-1]
    file_name = f"{uuid.uuid4()}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, file_name)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Generate public URL (assuming mounted static endpoint)
    # In production, this would be an S3 URL
    public_url = f"/static/media/{file_name}"

    # 2. Create Media Database Entry
    db_media = models.Media(
        creator_id=current_user.id,
        title=title,
        description=description,
        category=category,
        visibility=visibility,
        status="published", # Skip processing for MVP
        thumbnail_url=None # TODO: Generate thumbnail
    )
    db.add(db_media)
    db.commit()
    db.refresh(db_media)

    # 3. Register Media File
    db_file = models.MediaFile(
        media_id=db_media.id,
        quality="original",
        file_url=public_url,
        file_size=0 # TODO: Calculate size
    )
    db.add(db_file)
    db.commit()
    
    db.refresh(db_media)
    return db_media

@router.get("/feed", response_model=List[schemas.MediaResponse])
def get_feed(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    return db.query(models.Media).filter(models.Media.visibility == "public").offset(skip).limit(limit).all()

@router.get("/{media_id}", response_model=schemas.MediaResponse)
def get_media(media_id: uuid.UUID, db: Session = Depends(get_db)):
    media = db.query(models.Media).filter(models.Media.id == media_id).first()
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
    return media
