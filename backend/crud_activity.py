from typing import List, Optional
from sqlmodel import Session, select
from activity_models import ActivityCreate, ActivityUpdate
from models import UserActivity

def create_activity(session: Session, activity_create: ActivityCreate) -> UserActivity:
    activity = UserActivity.model_validate(activity_create)
    session.add(activity)
    return activity

def get_activity(session: Session, activity_id: int) -> Optional[UserActivity]:
    return session.get(UserActivity, activity_id)

def get_activities(session: Session, skip: int = 0, limit: int = 100) -> List[UserActivity]:
    statement = select(UserActivity).offset(skip).limit(limit)
    return session.exec(statement).all()

def update_activity(session: Session, activity_id: int, activity_update: ActivityUpdate) -> Optional[UserActivity]:
    activity = get_activity(session, activity_id)
    if not activity:
        return None
    update_data = activity_update.model_dump(exclude_unset = True)
    for key, value in update_data.items():
        setattr(activity, key, value)
    session.add(activity)
    return activity

def delete_activity(session: Session, activity_id: int) -> bool:
    activity = get_activity(session, activity_id)
    if not activity:
        return False
    session.delete(activity)
    return True 
