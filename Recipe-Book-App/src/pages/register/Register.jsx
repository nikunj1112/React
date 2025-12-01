// src/pages/Register/Register.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// NOTE: register does NOT log the user in
import { fakeRegister } from "../../slices/authSlice";
import { Navigate, useLocation, useNavigate, Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const dispatch = useDispatch();
  const { isAuthenticated, status, error } = useSelector((s) => s.auth || {});
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // If already logged in, don't allow visiting register
  if (isAuthenticated) {
    return <Navigate to="/recipes" replace />;
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      alert("Please fill all fields!");
      return;
    }

    // basic email check
    if (!form.email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      // Register user (does NOT auto-login)
      await dispatch(fakeRegister({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      })).unwrap();

      // Show success then redirect to login
      alert("Account created successfully! Please login.");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Register failed:", err);
      // error will be shown below if present
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-title">Create Your Account</h2>
        <p className="register-sub">Join Cookify & save your delicious recipes!</p>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <label>Full Name</label>
            <input
              className="register-input"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              autoComplete="name"
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              className="register-input"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              type="email"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              className="register-input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              autoComplete="new-password"
              minLength={4}
            />
          </div>

          <button
            className="register-btn"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Creating Account..." : "Register"}
          </button>

          {error && <div className="register-error">{error}</div>}

          <p className="register-footer">
            Already have an account?{" "}
            <Link to="/login" className="register-link">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
