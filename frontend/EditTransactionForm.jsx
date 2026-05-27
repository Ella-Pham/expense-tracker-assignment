import React, {useState} from 'react';

function EditTransactionForm({currentExpense, setSelectedExpenseId, saveExpense, setIsEditOpen}) {
    const [transactionType, setTransactionType] = useState(currentExpense.type);
    const [transactionAmount, setTransactionAmount] = useState(currentExpense.amount);
    const [transactionDate, setTransactionDate] = useState(currentExpense.date);
    const [transactionDescription, setTransactionDescription] = useState(currentExpense.description);
    const [transactionCategory, setTransactionCategory] = useState(currentExpense.category);
    
    function handleSubmit(event){
        event.preventDefault();
        
        const updatedExpense = {
            title: transactionDescription, 
            type: transactionType,
            amount: Number(transactionAmount),
            date: transactionDate,
            description: transactionDescription,
            category: transactionCategory
        };

        saveExpense(updatedExpense);

        setIsEditOpen(false);
        setSelectedExpenseId(null);
    }

    function handleTransactionAmount(event){
        setTransactionAmount(event.target.value);
    }

    function handleTransactionType(event){
        setTransactionType(event.target.value);
    }

    function handleTransactionDate(event){
        setTransactionDate(event.target.value);
    }

    function handleTransactionDescription(event){
        setTransactionDescription(event.target.value);
    }

    function handleTransactionCategory(event){
        setTransactionCategory(event.target.value);
    }

    return(
        <div className="edit-transaction-form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="transactionType">Type</label>
                <select name="transactionType" 
                        id="transactionType" 
                        value={transactionType} 
                        onChange={handleTransactionType}>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>

                <label htmlFor="transactionAmount">Amount</label>
                <input type="number" 
                    id="transactionAmount"
                    value={transactionAmount}
                    onChange={handleTransactionAmount}>
                </input>

                <label htmlFor="transactionDate">Date</label>
                <input
                    type="date"
                    id="transactionDate"
                    value={transactionDate}
                    onChange={handleTransactionDate}>
                </input>

                <label htmlFor="transactionDescription">Description</label>
                <input
                    type="text"
                    id="transactionDescription"
                    value={transactionDescription}
                    onChange={handleTransactionDescription}>
                </input>

                <label htmlFor="transactionCategory">Category</label>
                <input
                    type="text"
                    id="transactionCategory"
                    value={transactionCategory}
                    onChange={handleTransactionCategory}>
                </input>

                <button type="submit">Submit</button>
                <button type="button" onClick={ () => {setIsEditOpen(false); setSelectedExpenseId(null);} }>Cancel</button>
            </form>
        </div>
    );
}

export default EditTransactionForm