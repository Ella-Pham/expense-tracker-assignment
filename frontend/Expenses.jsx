import Header from "./Header.jsx"
import TransactionHistory from "./TransactionHistory.jsx"
import TransactionForm from "./TransactionForm.jsx"
import EditTransactionForm from "./EditTransactionForm.jsx"

import React, {useEffect, useState} from 'react';

const API_BASE_URL = 'http://127.0.0.1:8000/expenses/';

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("All");
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL, {
        headers: {'Authorization': `Bearer ${token}`}
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveExpense = async (expenseData) => {
    const isEdit = !!currentExpense;
    const url = isEdit ? `${API_BASE_URL}${currentExpense.id}` : API_BASE_URL;
    const method = isEdit ? 'PATCH' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(expenseData)
      });

      if (response.ok) {
        fetchExpenses();
        setIsEditOpen(false);
      }
    } catch (error) {
      alert("Error saving expense.");
    }
  };

  const deleteExpense = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if (response.ok) fetchExpenses();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const openEditForm = (expense = null) => {
    setCurrentExpense(expense);
    setIsEditOpen(true);
  };

  function handleDeleteSelectedExpense (event) {
    if (selectedExpenseId === null)
      return;
    else
      deleteExpense(selectedExpenseId);
  }

  const selectedExpense = expenses.find(item => item.id === selectedExpenseId)

  function handleEditSelectedExpense (event) {
    if (selectedExpenseId === null)
      return;
    else
      openEditForm(selectedExpense)
  }

  const filteredExpenses = expenses.filter((expense) => {
    return (
      expense.title.toLowerCase().includes(search.toLowerCase())
      || expense.category.toLowerCase().includes(search.toLowerCase())
      || expense.description?.toLowerCase().includes(search.toLowerCase())
      || expense.type?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      <Header />
      <TransactionHistory expenses={filteredExpenses} setIsFormOpen={setIsFormOpen} 
                          search={search} setSearch={setSearch}
                          currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} 
                          selectedExpenseId={selectedExpenseId} setSelectedExpenseId={setSelectedExpenseId}
                          handleDeleteSelectedExpense={handleDeleteSelectedExpense} 
                          handleEditSelectedExpense={handleEditSelectedExpense} />
      {isFormOpen && <TransactionForm saveExpense={saveExpense} setIsFormOpen={setIsFormOpen} />}
      {isEditOpen && currentExpense && <EditTransactionForm currentExpense={currentExpense} setSelectedExpenseId={setSelectedExpenseId} 
                           saveExpense={saveExpense} setIsEditOpen={setIsEditOpen} />}
    </>
  );
}

export default Expenses