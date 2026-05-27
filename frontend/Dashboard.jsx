import Header from "./Header.jsx"
import BalanceSummary from "./BalanceSummary.jsx"

import React, {useEffect, useState} from 'react';
import Graph from "./Graph.jsx"

const API_BASE_URL = 'http://127.0.0.1:8000/expenses/';

function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchExpenses();
    }, []);
    
    const token = localStorage.getItem("token");
    console.log(token)

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
    
    return (
    <>
        <Header />
        <BalanceSummary expenses={expenses} />
        <Graph expenses={expenses} />
    </>
  );
}

export default Dashboard;