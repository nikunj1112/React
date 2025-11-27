import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, setCurrentUser } from "../../slices/userslice";
import "./SignUp.css";
import Logo from "../../../asset/img/logo.png";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password) return;

    try {
      // 1️⃣ Signup user
      const resultAction = await dispatch(signup({ email, password }));

      if (signup.fulfilled.match(resultAction)) {
        // 2️⃣ Set the new user as current user in Redux
        dispatch(setCurrentUser(resultAction.payload));

        // 3️⃣ Alert success
        alert(`Account created successfully! Welcome, ${resultAction.payload.email}`);

        // 4️⃣ Navigate to Home page
        navigate("/");
      } else {
        console.error("Signup failed:", resultAction.payload);
        alert("Signup failed! Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("An error occurred during signup.");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
              {/* Logo Section */}
                <div className="logo-container">
                  <img src={Logo} alt="app logo" className="logo" />
                </div>
        <h2 className="title">Create Account</h2>
        <p className="subtitle">Join us and start your journey!</p>

        <div className="input-group">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>

        <button className="btn signup-btn" onClick={handleSignup}>
          Create Account
        </button>

        <p className="login-text">
          Already have an account?{" "}
          <span className="login-link" onClick={() => navigate("/")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
