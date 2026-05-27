
function BalanceSummary({expenses}) {
    const incomeTransactions = expenses.filter(item => item.type === "Income");
    const expenseTransactions = expenses.filter(item => item.type === "Expense");

    const income = incomeTransactions.reduce( (total, item) => total + Number(item.amount), 0);
    const expense = expenseTransactions.reduce( (total, item) => total + Number(item.amount), 0);
    const balance = income - expense;

    return (
        <div className="summary-container">
            <div className="box">
                <h2>Balance</h2>
                <p>{"$" + balance.toFixed(2)}</p>
            </div>
            <div className="box">
                <h2>Income</h2>
                <p>{"$" + income.toFixed(2)}</p>
            </div>
            <div className="box">
                <h2>Expense</h2>
                <p>{"$" + expense.toFixed(2)}</p>
            </div>
        </div>
        
    );
}

export default BalanceSummary