
import React, {useState} from 'react';

function TransactionHistory({expenses = [], search, setSearch, setIsFormOpen, currentFilter, setCurrentFilter, selectedExpenseId, setSelectedExpenseId, handleDeleteSelectedExpense, handleEditSelectedExpense}) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    let filteredExpenses = [];

    if (currentFilter === "Income") {
        filteredExpenses = expenses.filter(item => item.type === "Income");
    }
    else if (currentFilter === "Expense") {
        filteredExpenses = expenses.filter(item => item.type === "Expense");
    }
    else {
        filteredExpenses = expenses;
    }

    const groupedExpenses = {};
    filteredExpenses.forEach(expense => {
        const date = expense.date;

        if (!groupedExpenses[date]) {
            groupedExpenses[date] = [];
        }
        groupedExpenses[date].push(expense);
    })

    return (
        <>
            <div className="transaction-header">
                <div className="transaction-left">
                    <h2>Transaction History</h2>
                    <div className="search-engine">
                        <input 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search expenses..."
                        />
                    </div>
                </div>
                <div className="menu">
                    <button type="button" onClick={ () => setIsMenuOpen(previous => !previous) }>...</button>
                    {isMenuOpen && (
                        <div className="action">
                            <button type="button" onClick={ () => setIsFormOpen(true) }>Add transaction</button>
                            <div className="filter-parent">
                                <button type="button" onClick={ () => setIsFilterOpen(previous => !previous) }>Filter transactions</button>
                                {isFilterOpen && (
                                    <div className="filter-action">
                                        <button type="button" onClick={ () => { setCurrentFilter("All"); setIsFilterOpen(false) } }>All</button>
                                        <button type="button" onClick={ () => { setCurrentFilter("Income"); setIsFilterOpen(false) } }>Income</button>
                                        <button type="button" onClick={ () => { setCurrentFilter("Expense"); setIsFilterOpen(false) } }>Expense</button>
                                    </div>
                                )}
                            </div>
                            <button type="button" onClick={ () => handleDeleteSelectedExpense() }>Delete selected transactions</button>
                            <button type="button" onClick={ () => handleEditSelectedExpense() }>Edit selected transactions</button>
                        </div>
                    )}
                </div>
            </div>

            {expenses.length === 0 && (
                <div className="empty-state">
                    No transactions currently. Please click on the 3 dots to add new transactions.
                </div>
            )}

            {expenses.length > 0 && (
                <div className="transaction-list">
                    {Object.keys(groupedExpenses)
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map(date => {
                            const today = new Date();
                            const yesterday = new Date();
                            yesterday.setDate(today.getDate() - 1);
                            const currentDate = new Date(date);
                            
                            today.setHours(0, 0, 0, 0);
                            currentDate.setHours(0, 0, 0, 0);
                            yesterday.setHours(0, 0, 0, 0);

                            let formattedDate;

                            if (currentDate.getTime() === today.getTime()) {
                                formattedDate = "Today";
                            }
                            else if (currentDate.getTime() === yesterday.getTime()) {
                                formattedDate = "Yesterday";
                            }
                            else {
                                formattedDate = currentDate.toDateString();
                            }

                            return(
                                <div className="transaction-date-group" key={formattedDate}>
                                    <div className="transaction-date-header">
                                        <span>{formattedDate}</span>
                                    </div>
                                    <div className="transaction-date-list">
                                        {groupedExpenses[date].map(expense => <div className= {"listTransactions " + expense.type + (selectedExpenseId === expense.id ? " selected" : "")} key={expense.id}
                                                                                    onClick={ () => {
                                                                                        if (selectedExpenseId === expense.id)
                                                                                            setSelectedExpenseId(null) 
                                                                                        else 
                                                                                            setSelectedExpenseId(expense.id)
                                                                                    }}>
                                                                                        <div className="transaction-row">
                                                                                            <div className="transaction-icon">
                                                                                                {expense.description ? expense.description.charAt(0) : "?"}
                                                                                            </div>
                                                                                            <div className="transaction-info">
                                                                                                <div className="transaction-description">{expense.description}</div>
                                                                                                <div className="transaction-category">{expense.category}</div>
                                                                                            </div>
                                                                                            <div className="transaction-amount">
                                                                                                <span>{expense.type === "Income" ? "+" : ""}${expense.amount}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            )}
        </>
    );
}

export default TransactionHistory