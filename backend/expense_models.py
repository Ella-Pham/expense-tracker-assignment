from typing import Optional
from sqlmodel import SQLModel

class ExpenseBase(SQLModel):
    title: str
    type: str
    amount: float
    description: Optional[str] = None
    category: str
    date: str

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseRead(ExpenseBase):
    id: int
    username: str

class ExpenseUpdate(SQLModel):
    title: Optional[str] = None
    type: Optional[str] = None
    amount: Optional[float] = None
    description: Optional[str] = None
    category: Optional[str] = None
    date: Optional[str] = None

class ExpenseDelete(SQLModel):
    id: int