// src/pages/Signin/Signin.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fakeLogin } from "../../slices/authSlice";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "./Signin.css";

export default function Signin() {
  const dispatch = useDispatch();
  const { isAuthenticated, status, error } = useSelector((s) => s.auth || {});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [clientError, setClientError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // If already logged in → don't show login form
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }   

  const from = (location.state && location.state.from && location.state.from.pathname) ? location.state.from.pathname : "/";

  const validate = () => {
    setClientError("");
    if (!email.trim() || !password.trim()) {
      setClientError("Please fill both email and password.");
      return false;
    }
    // simple email check
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email.trim())) {
      setClientError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await dispatch(fakeLogin({ email: email.trim(), password })).unwrap();
      // On success: go to requested page or home. replace so back doesn't go to login.
      navigate(from || "/", { replace: true });
    } catch (err) {
      // fakeLogin sets error into slice; console log for debugging
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-card" role="main" aria-labelledby="signin-heading">
        <h1 id="signin-heading" className="signin-title">Welcome back 👋</h1>
        <p className="signin-sub">Log in to continue to <strong>Cookify</strong></p>

        <form className="signin-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className="input"
              aria-required="true"
            />
          </div>

          <div className="form-row">
            <label htmlFor="password">Password</label>
            <div className="password-wrap">
              <input
                id="password"
                name="password"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                autoComplete="current-password"
                className="input"
                aria-required="true"
              />
              <button
                type="button"
                className="show-btn"
                onClick={() => setShowPass((s) => !s)}
                aria-pressed={showPass}
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {clientError && <div className="err client-err" role="alert">{clientError}</div>}
          {error && <div className="err server-err" role="alert">{error}</div>}

          <button
            type="submit"
            className="btn-primary"
            disabled={status === "loading"}
            aria-busy={status === "loading"}
          >
            {status === "loading" ? "Logging in…" : "Login"}
          </button>

          <div className="signin-footer">
            <span>Don't have an account?</span>
            <a className="link" href="/register">Create account</a>
          </div>
        </form>
      </div>
    </div>
  );
}
