import Header from "./Header.jsx"
import React, {useEffect, useState} from 'react';

const USER_BASE_URL = 'http://127.0.0.1:8000/user/';
const ACTIVITY_BASE_URL = "http://127.0.0.1:8000/activity/";

function Admin() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activities, setActivities] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
            fetchActivities();
    }, []);

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
    }

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch(USER_BASE_URL, {
                headers: {'Authorization': `Bearer ${token}`}
            });

            if (response.status === 401) {
                handleLogout();
                return;
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
    }};

    const fetchActivities = async () => {
        setLoading(true);
        try {
            const response = await fetch(ACTIVITY_BASE_URL, {
                headers: {'Authorization': `Bearer ${token}`}
            });

            if (response.status === 401) {
                handleLogout();
                return;
            }

            const data = await response.json();

            setActivities(data);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
    }};

    const deleteUser = async (id) => {
        if (!window.confirm("Delete this user?")) return;
        try {
            const response = await fetch(`${USER_BASE_URL}${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
            if (response.ok) fetchUsers();
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    const filteredActivities = activities.filter((activity) => {
        return (
            activity.username.toLowerCase().includes(search.toLowerCase())
            || activity.action.toLowerCase().includes(search.toLowerCase())
            || activity.details.toLowerCase().includes(search.toLowerCase())
            || activity.date.toLowerCase().includes(search.toLowerCase())
        );
    });

    return (
        <>
            <Header />
            {loading && <p>Loading...</p>}

            <h2>User Management</h2>

            <div className="user-list">
                <div className="user-row user-header">
                    <div>ID</div>
                    <div>Username</div>
                    <div>Email</div>
                    <div>Role</div>
                    <div>Action</div>
                </div>

                {users.map((user) => (
                    <div className="user-row" key={user.id}>
                        <div>{user.id}</div>

                        <div className="user-cell">
                            <div className="user-avatar">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                            <span>{user.username}</span>
                        </div>

                        <div>{user.email}</div>
                        <div>{user.role}</div>

                        <div>
                            <button onClick={() => deleteUser(user.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <h2>User Activity Management</h2>
            <div className="search-engine">
                <input 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search activities..."
                />
            </div>
            <div className="activity-list">
                <div className="activity-row activity-header">
                    <div>Date</div>
                    <div>Username</div>
                    <div>Action</div>
                    <div>Details</div>
                </div>

                {filteredActivities.map((activity) => (
                    <div className="activity-row" key={activity.id}>
                        <div>{activity.date}</div>
                        <div className="activity-username-cell">
                            <div className="activity-username-avatar">
                                    {activity.username.charAt(0).toUpperCase()}
                            </div>
                            <div className="activity-username">{activity.username}</div>
                        </div>
                        <div>{activity.action}</div>
                        <div>{activity.details}</div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Admin