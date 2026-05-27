from typing import List
from sqlmodel import Session
from datetime import datetime
from security import get_current_user
from fastapi import Depends, FastAPI, HTTPException, Query, Response, status
from user_apis import router as user_router
from activity_apis import router as activity_router
from session import get_session, create_db_and_tables
from crud_activity import create_activity
from activity_models import ActivityCreate
from expense_models import ExpenseCreate, ExpenseRead, ExpenseUpdate
from crud_expense import (
    create_expense,
    get_expense,
    get_expenses,
    update_expense,
    delete_expense,
)
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
create_db_and_tables()

app.include_router(user_router)
app.include_router(activity_router)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/expenses/", response_model = ExpenseRead)
def create_expense_endpoint(
    expense: ExpenseCreate, 
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    db_expense = create_expense(db, expense, current_user)

    activity = ActivityCreate(
        username=current_user,
        action="Create a new expense",
        details=f"Created expense: {expense.title}",
        date=str(datetime.now().date())
    )
    create_activity(db, activity)

    db.commit()
    db.refresh(db_expense)
    return db_expense

@app.get("/expenses/{expense_id}", response_model = ExpenseRead)
def read_expense_endpoint(
    expense_id: int, 
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    db_expense = get_expense(db, expense_id)
    if not db_expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    return db_expense

@app.get("/expenses/", response_model=List[ExpenseRead])
def read_expenses_endpoint(
    skip: int = 0, 
    limit: int = 100, 
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    return get_expenses(db, current_user, skip=skip, limit=limit)

@app.patch("/expenses/{expense_id}", response_model=ExpenseRead)
def update_expense_endpoint(
    expense_id: int, 
    expense: ExpenseUpdate, 
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    db_expense = update_expense(db, expense_id, expense)
    if not db_expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    
    activity = ActivityCreate(
        username=current_user,
        action="Update an expense",
        details=f"Updated expense ID: {expense_id}",
        date=str(datetime.now().date())
    )
    create_activity(db, activity)

    db.commit()
    db.refresh(db_expense)
    return db_expense

@app.delete("/expenses/{expense_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_expense_endpoint(
    expense_id: int, 
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    deleted = delete_expense(db, expense_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Expense not found")
    
    activity = ActivityCreate(
        username=current_user,
        action="Delete an expense",
        details=f"Deleted expense ID: {expense_id}",
        date=str(datetime.now().date())
    )
    create_activity(db, activity)

    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)

