from typing import List
from sqlmodel import Session
from security import get_current_user
from fastapi import Depends, FastAPI, HTTPException, Query, Response, status, APIRouter
from user_apis import router as user_router
from session import get_session, create_db_and_tables
from activity_models import ActivityCreate, ActivityRead, ActivityUpdate
from crud_activity import (
    create_activity,
    get_activity,
    get_activities,
    update_activity,
    delete_activity,
)
from fastapi.middleware.cors import CORSMiddleware

router = APIRouter()

@router.post("/activity/", response_model = ActivityRead)
def create_activity_endpoint(
    activity: ActivityCreate, 
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    db_activity = create_activity(db, activity)
    db.commit()
    db.refresh(db_activity)
    return db_activity

@router.get("/activity/{activity_id}", response_model = ActivityRead)
def read_activity_endpoint(
    activity_id: int, 
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    db_activity = get_activity(db, activity_id)
    if not db_activity:
        raise HTTPException(status_code=404, detail="User not found")
    return db_activity

@router.get("/activity/", response_model=List[ActivityRead])
def read_activities_endpoint(
    skip: int = 0, 
    limit: int = 100, 
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    return get_activities(db, skip=skip, limit=limit)

@router.patch("/activity/{activity_id}", response_model=ActivityRead)
def update_activity_endpoint(
    activity_id: int, 
    activity: ActivityUpdate, 
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    db_activity = update_activity(db, activity_id, activity)
    if not db_activity:
        raise HTTPException(status_code=404, detail="User not found")
    db.commit()
    db.refresh(db_activity)
    return db_activity

@router.delete("/activity/{activity_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_activity_endpoint(
    activity_id: int, 
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    deleted = delete_activity(db, activity_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="User not found")
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)

