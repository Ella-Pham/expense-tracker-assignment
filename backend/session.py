from sqlmodel import Field, SQLModel, Session, create_engine
from models import Expense

username = "root"
password = "root"
database_name = "ass1db"

DATABASE_URL = f"mysql+pymysql://root:Root123!@localhost:3306/ass1db"

engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    """Yields a SQLModel Session instance."""
    with Session(engine) as session:
        yield session
