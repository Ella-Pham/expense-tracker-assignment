from typing import List
from sqlmodel import Session 
from datetime import timedelta, datetime
from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.security import OAuth2PasswordRequestForm
from session import get_session
from user_models import UserCreate, UserRead, UserUpdate, UserDelete
from crud_activity import create_activity
from activity_models import ActivityCreate
from security import (
    get_password_hash,
    verify_password,
    create_access_token,
    get_current_user,
    ACCESS_TOKEN_EXPIRE_MINUTES
)
from crud_user import (
    create_user,
    get_user,
    get_users,
    get_user_by_username,
    get_user_by_email,
    update_user,
    delete_user
)

router = APIRouter()

@router.post("/user/", response_model = UserRead)
def create_user_endpoint(
    user: UserCreate, 
    #current_user: str = Depends(get_current_user), 
    db: Session = Depends(get_session)
):
    existing_username = get_user_by_username(db, user.username)
    if existing_username:
        raise HTTPException(
            status_code=400,
            detail="Username already exists")
    existing_mail = get_user_by_email(db, user.email)
    if existing_mail:
        raise HTTPException(
            status_code=400,
            detail="Email already exists")
    db_user = create_user(db, user)

    activity = ActivityCreate(
        username=user.username,
        action="Register",
        details="User registered a new account",
        date=str(datetime.now().date())
    )
    create_activity(db, activity)

    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/token")
async def login_for_access_token(db: Session = Depends(get_session), form_data: OAuth2PasswordRequestForm = Depends()):
    #mock user validation
    #user = db.get_user(form_data.username)
    user = get_user_by_username(db, form_data.username)

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    activity = ActivityCreate(
        username=user.username,
        action="Login",
        details="User logged in",
        date=str(datetime.now().date())
    )
    create_activity(db, activity)
    db.commit()

    #create the jwt token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": form_data.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer", "role": user.role}

@router.get("/user/{user_id}", response_model = UserRead)
def read_user_endpoint(user_id: int, db: Session = Depends(get_session)):
    db_user = get_user(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.get("/user/", response_model=List[UserRead])
def read_users_endpoint(
    skip: int = 0, limit: int = 100, db: Session = Depends(get_session)
):
    return get_users(db, skip=skip, limit=limit)

@router.patch("/user/{user_id}", response_model=UserRead)
def update_user_endpoint(
    user_id: int, user: UserUpdate, db: Session = Depends(get_session)
):
    db_user = update_user(db, user_id, user)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db.commit()
    db.refresh(db_user)
    return db_user

@router.delete("/user/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_endpoint(user_id: int, db: Session = Depends(get_session)):
    deleted = delete_user(db, user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="User not found")
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)

