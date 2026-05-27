import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            {token && role === "user" && <Link to="/">Dashboard </Link> }
            {token && role === "user" && <Link to="/expenses">Expenses </Link> }
            {token && role === "admin" && <Link to="/admin">Admin </Link> }
            {!token && <Link to="/login">Login </Link> }
            <button onClick={handleLogout}>Logout</button>
            {!token && <Link to="/register">Register </Link> }
        </nav>
    );
}