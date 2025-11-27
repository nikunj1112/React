import React, { useEffect, useState } from "react";
import {
  signin,
  fetchusers,
  signinwithgoogles,
} from "../../slices/userslice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import "./SignIn.css";
import Logo from "../../../asset/img/logo.png";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchusers());
  }, [dispatch]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = () => {
    if (!email || !password) return alert("Please enter all fields!");
    dispatch(signin({ email, password })).then((res) => {
      if (!res.error) {
        alert("Login Successful! 🎉");
        navigate("/home");
      } else {
        alert("Invalid Email or Password");
      }
    });
  };

  const handleGoogleLogin = () => {
    dispatch(signinwithgoogles()).then((res) => {
      if (!res.error) {
        alert("Google Login Successful! 🎉" );
        navigate("/home");
      } else {
        alert("Google Login Failed!");
      }
    });
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-card">

        {/* Logo Section */}
        <div className="logo-container">
          <img src={Logo} alt="app logo" className="logo" />
        </div>

        <h2 className="title">Welcome Back</h2>

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

        <button className="btn signin-btn" onClick={handleEmailLogin}>
          Sign In
        </button>

        <button className="btn google-btn" onClick={handleGoogleLogin}>
          Sign In with Google
        </button>

        <p className="signup-text">
          Don't have an account?
          <span
            className="signup-link"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
}
