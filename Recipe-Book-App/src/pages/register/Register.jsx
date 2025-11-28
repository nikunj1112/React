import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css"

// आपके कलर पैलेट
const COLORS = {
    PrimaryOrange: "#CF4B00",
    SoftBlue: "#9CC6DB",
    MutedGold: "#DDBA7D",
    Cream: "#FCF6D9",
};

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Client-side Validation
        if (!username || !email || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // --- Mock Registration Logic ---
        // 🛑 Note: Real registration involves calling a backend API here.
        alert("Registration successful! Please login.");
        navigate('/login'); 
    };

    return (
        <div className="auth-page-container" style={{ backgroundColor: COLORS.Cream }}>
            <div className="auth-card" style={{ borderTop: `5px solid ${COLORS.PrimaryOrange}` }}>
                <h2 className="auth-heading" style={{ color: COLORS.PrimaryOrange }}>
                    🚀 Get Started with Cookify
                </h2>
                <p className="auth-subtext" style={{ color: COLORS.MutedGold }}>
                    Create your free account and start saving your favourite recipes.
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
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    
                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{ border: `1px solid ${COLORS.SoftBlue}` }}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn-submit"
                        style={{ backgroundColor: COLORS.PrimaryOrange, color: COLORS.Cream }}
                    >
                        Register
                    </button>
                </form>

                <p className="auth-link-footer">
                    Already have an account? 
                    <Link to="/login" className="link-text" style={{ color: COLORS.SoftBlue, marginLeft: '5px' }}>
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
}