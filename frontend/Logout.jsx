import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ setNavbarChanged }) {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        setNavbarChanged(prev => !prev);
        navigate("/login");
    }, [setNavbarChanged, navigate]);

    return (
        <p>Logging out...</p>
    );
}