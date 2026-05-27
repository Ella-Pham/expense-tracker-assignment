from sqlmodel import Field, SQLModel

class Expense (SQLModel, table = True):
    id: int | None = Field(default = None, primary_key = True)
    title: str
    type: str
    amount: float
    description: str | None = None
    category: str
    date: str
    username: str

class User (SQLModel, table = True):
    id: int | None = Field(default = None, primary_key = True)
    username: str
    email: str
    hashed_password: str
    role: str = "user"

class UserActivity (SQLModel, table = True):
    id: int | None = Field(default = None, primary_key = True)
    username: str
    action: str
    details: str
    date: str