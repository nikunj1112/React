import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/authSlice'; // Redux Login Thunk
import "./Signin.css"

// आपके कलर पैलेट
const COLORS = {
    PrimaryOrange: "#CF4B00",
    SoftBlue: "#9CC6DB",
    MutedGold: "#DDBA7D",
    Cream: "#FCF6D9",
};

export default function Signin() {
    const [username, setUsername] = useState('testuser'); // Mock username
    const [password, setPassword] = useState('password'); // Mock password
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Username and Password are required.');
            return;
        }

        // Dispatch Redux Login Thunk
        const success = await dispatch(login(username, password));

        if (success) {
            // Success: Navigate to the Home page
            navigate('/');
        } else {
            // Failure: Mock login failure
            setError('Invalid username or password. Use: testuser / password');
        }
    };

    return (
        <div className="auth-page-container" style={{ backgroundColor: COLORS.Cream }}>
            <div className="auth-card" style={{ borderTop: `5px solid ${COLORS.PrimaryOrange}` }}>
                <h2 className="auth-heading" style={{ color: COLORS.PrimaryOrange }}>
                    🔑 Welcome Back!
                </h2>
                <p className="auth-subtext" style={{ color: COLORS.MutedGold }}>
                    Please sign in to access your recipes.
                </p>

                <form onSubmit={handleSubmit} className="auth-form">
                    
                    {error && <p className="error-message">{error}</p>}

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ border: `1px solid ${COLORS.SoftBlue}` }}
                            required
                        />
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ border: `1px solid ${COLORS.SoftBlue}` }}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn-submit"
                        style={{ backgroundColor: COLORS.PrimaryOrange, color: COLORS.Cream }}
                    >
                        Login
                    </button>
                </form>

                <p className="auth-link-footer">
                    Don't have an account? 
                    <Link to="/register" className="link-text" style={{ color: COLORS.SoftBlue, marginLeft: '5px' }}>
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}