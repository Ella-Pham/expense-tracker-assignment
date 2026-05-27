from typing import Optional
from sqlmodel import SQLModel

class UserBase(SQLModel):
    username: str
    email: str
    role: str = "user"

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int

class UserUpdate(SQLModel):
    username: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    role: Optional[str] = None

class UserDelete(SQLModel):
    id: int