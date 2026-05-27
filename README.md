# Expense Tracker Web Application

## 1. Project Overview
This project is a full-stack Expense Tracker web application developed using React, FastAPI and MySQL.

The purpose of this application is to help users manage their personal financial transactions in a simple and organised way. Users can record income and expenses, monitor their balance, and view transaction history in real time.

The application also includes user authentication and administrator features. Different user roles have different permissions, allowing administrators to manage users and monitor activity records across the system.

## 2. Technical Stack
### Frontend
- React (Vite)
- React Hooks (useState, useEffect)
- React Router
- CSS

### Backend
- FastAPI
- Python
- SQLModel / SQLAlchemy

### Database
- MySQL

### Security
- Password hashing
- JWT authentication
- Role-based access control

### API Communication
REST APIs:
- GET
- POST
- PUT/PATCH
- DELETE

## 3. Main Features
### User Features
- User registration
- User login/logout
- JWT authentication
- Protected routes
- Add transactions
- Edit transactions
- Delete transactions
- View transaction history
- Real-time balance calculation
- Search expenses
- Income and expense categorisation
- Summary & Analysis expenses

### Admin Features
- View all users
- Delete users
- View user activity logs
- Monitor login and transaction activities

## 4. Project Structure
```txt
my-app/
│
├── backend/
│   │
│   ├── activity_apis.py
│   ├── activity_models.py
│   ├── crud_activity.py
│   ├── crud_expense.py
│   ├── crud_user.py
│   ├── expense_apis.py
│   ├── expense_models.py
│   ├── user_apis.py
│   ├── user_models.py
│   ├── security.py
│   ├── session.py
│   └── models.py
│
├── frontend/
│   │
│   ├── App.jsx
│   ├── Admin.jsx
│   ├── Dashboard.jsx
│   ├── Expenses.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Navbar.jsx
│   ├── Profile.jsx
│   ├── TransactionHistory.jsx
│   ├── TransactionForm.jsx
│   ├── EditTransactionForm.jsx
│   ├── BalanceSummary.jsx
│   ├── Graph.jsx
│   ├── Header.jsx
│   ├── Logout.jsx
│   ├── NotFound.jsx
│   ├── main.jsx
│   └── index.css
│
├── public/
│   └── expense_tracker.png
│
├── ass2db.sql
├── index.html
├── package.json
├── README.md
├── vite.config.js
└── .gitignore
```

### Folder Description
**backend/**
Contains API routes, database models, CRUD operations, authentication and database connection setup.

**frontend/**
Contains React components, routing logic, pages and styling.

**public/**
Stores logo image of the page.

## 5. Design Decisions
Some design decisions were made to improve both functionality and user experience:
- React Router was used to create a Single Page Application so pages can update without reloading.
- JWT authentication was implemented to securely manage user sessions.
- Role-based access control was added so administrators and normal users have different permissions.
- useState and useEffect hooks were used for handling component state and updating UI dynamically.
- Search functionality was implemented to provide instant filtering of expenses and activities.

## 6. Challenges and Solutions
One challenge during development was connecting the frontend and backend correctly. Some API endpoints initially returned errors because routes and URLs were inconsistent. This was solved by standardising API naming and centralising endpoint usage.

Another challenge involved implementing authentication with JWT tokens and protected routes. Managing login status across pages required storing tokens and user information properly.

Designing administrator functionality also required additional backend logic because normal users should only access their own data while administrators can access all users and activity records.

## 7. How to Run the Project
### Backend
Navigate into backend folder:
- cd backend

Install required packages:
- pip install fastapi uvicorn sqlmodel sqlalchemy pymysql python-jose passlib bcrypt

Run server:
- uvicorn expense_apis:app --reload

### Frontend
Navigate into frontend folder:
- cd frontend

Install packages:
- npm install

Run application:
- npm run dev

## 8. Database Export
Database export is included as ass2db.sql
This file contains the tables and sample data used by the application.

## 9. Future Improvements
Possible future improvements include:
- Budget goals and spending limits
- Monthly analytics dashboard
- Dark mode support
- Export expenses as CSV or PDF
- Email notifications

## 10. Workload Allocation
This project was completed individually. All frontend, backend, database design, authentication, CRUD operations, UI styling, README writing and demo preparation were completed by Thanh Ngoc Pham 25584071 (Ella).