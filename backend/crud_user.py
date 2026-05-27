from typing import List, Optional
from sqlmodel import Session, select
from user_models import UserCreate, UserUpdate
from models import User
from security import get_password_hash

def create_user(session: Session, user_create: UserCreate) -> User:
    user = User(
        username=user_create.username,
        email=user_create.email,
        hashed_password=get_password_hash(user_create.password),
        role=user_create.role
    )
    session.add(user)
    return user

def get_user(session: Session, user_id: int) -> Optional[User]:
    return session.get(User, user_id)

def get_users(session: Session, skip: int = 0, limit: int = 100) -> List[User]:
    statement = select(User).offset(skip).limit(limit)
    return session.exec(statement).all()

def get_user_by_username(session: Session, username: str) -> Optional[User]:
    user = session.exec(select(User).where((User.username == username))).first()
    return user

def get_user_by_email(session: Session, email: str) -> Optional[User]:
    user = session.exec(select(User).where((User.email == email))).first()
    return user

def update_user(session: Session, user_id: int, user_update: UserUpdate) -> Optional[User]:
    user = get_user(session, user_id)
    if not user:
        return None
    update_data = user_update.model_dump(exclude_unset = True)
    for key, value in update_data.items():
        setattr(user, key, value)
    session.add(user)
    return user

def delete_user(session: Session, user_id: int) -> bool:
    user = get_user(session, user_id)
    if not user:
        return False
    session.delete(user)
    return True 
