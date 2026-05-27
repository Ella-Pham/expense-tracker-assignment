import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onSubmit = async(e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (username === "") {
            setError("Username is required.");
            setIsLoading(false);
            return;
        }

        if (!email.includes("@")) {
            setError("Email must be valid.");
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/user/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    role: "user"
                })
            });

            const data = await response.json();
            if (response.ok) {
                navigate("/login");
            } else {
                setError(data.detail || "Registration failed. Please check your details.");
            }
        } catch (error) {
            setError('Registration failed!');
            setIsLoading(false);
            setUsername('');
            setPassword('');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="user-container">
            <form className="user-form" onSubmit={onSubmit}>
                <p className="user-form-subtitle">Sign up to get started!</p>
                <input 
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.currentTarget.value)}
                />
                <input 
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <input 
                    type="password"
                    placeholder="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
                {error && <p className="error">{error}</p>}
                <button className="user-form-button" type="submit" disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    )
}