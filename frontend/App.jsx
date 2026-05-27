import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Dashboard from "./Dashboard.jsx";
import Expenses from "./Expenses.jsx";
import Admin from "./Admin.jsx";
import Profile from "./Profile.jsx";
import NotFound from "./NotFound.jsx";

const ProtectedRoute = ({ children }) => {
    //call a function to check if the user is logged in
    const user = localStorage.getItem("token");
    if (!user) {
        //the replace prop prevents the protected page from being added to the history stack so the user cant go back to it after logging out
        return <Navigate to="/login" replace />;
    } else {
        return children;
    }
};

const AdminRoute = ({ children }) => {
    //call a function to check if the user is logged in
    const user = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!user) {
        //the replace prop prevents the protected page from being added to the history stack so the user cant go back to it after logging out
        return <Navigate to="/login" replace />;
    } else if (role !== "admin") { 
        return <Navigate to="/" replace />;
    } else {
        return children;
    }
};

function App() {
    const [navbarChanged, setNavbarChanged] = useState(false);

    return (
        <BrowserRouter>
            {/* Navigation */}
            <Navbar navbarChanged={navbarChanged} />

            {/* Routes */}
            <Routes>
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
                <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
                <Route path="/login" element={<Login setNavbarChanged={setNavbarChanged} />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;