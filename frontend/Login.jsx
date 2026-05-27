import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LOGIN_URL = "http://127.0.0.1:8000/token"

export default function LoginUseState({ setNavbarChanged }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async(e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('username', username);
                localStorage.setItem("role", data.role)
                setIsLoggedIn(true);
                setNavbarChanged(prev => !prev);
                if (data.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            } else {
                setError(data.detail || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            setError('Incorrect username or password!');
            setIsLoading(false);
            setUsername('');
            setPassword('');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="App">
            <div className="user-container">
                {isLoggedIn ? (
                    <>
                        <h1>Welcome {username}!</h1>
                        <button onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("username");
                            localStorage.removeItem("role")
                            setIsLoggedIn(false)}
                        }>Log Out</button>
                    </>
                ) : (
                    <form className="user-form" onSubmit={onSubmit}>
                        <p className="user-form-subtitle">Sign in to continue!</p>
                        <input 
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.currentTarget.value)}
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
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}