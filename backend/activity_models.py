from typing import Optional
from sqlmodel import SQLModel

class ActivityBase(SQLModel):
    username: str
    action: str
    details: str
    date: str

class ActivityCreate(ActivityBase):
    pass

class ActivityRead(ActivityBase):
    id: int

class ActivityUpdate(SQLModel):
    username: Optional[str] = None
    action: Optional[str] = None
    details: Optional[str] = None
    date: Optional[str] = None

class ActivityDelete(SQLModel):
    id: int