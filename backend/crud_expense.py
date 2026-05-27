from typing import List, Optional
from sqlmodel import Session, select
from expense_models import ExpenseCreate, ExpenseUpdate
from models import Expense

def create_expense(session: Session, expense_create: ExpenseCreate, username) -> Expense:
    expense = Expense(
        title=expense_create.title,
        type=expense_create.type,
        amount=expense_create.amount,
        description=expense_create.description,
        category=expense_create.category,
        date=expense_create.date,
        username=username
    )
    session.add(expense)
    return expense

def get_expense(session: Session, expense_id: int) -> Optional[Expense]:
    return session.get(Expense, expense_id)

def get_expenses(session: Session, username, skip: int = 0, limit: int = 100) -> List[Expense]:
    statement = select(Expense).where(Expense.username == username).offset(skip).limit(limit)
    return session.exec(statement).all()

def update_expense(session: Session, expense_id: int, expense_update: ExpenseUpdate) -> Optional[Expense]:
    expense = get_expense(session, expense_id)
    if not expense:
        return None
    update_data = expense_update.model_dump(exclude_unset = True)
    for key, value in update_data.items():
        setattr(expense, key, value)
    session.add(expense)
    return expense

def delete_expense(session: Session, expense_id: int) -> bool:
    expense = get_expense(session, expense_id)
    if not expense:
        return False
    session.delete(expense)
    return True
