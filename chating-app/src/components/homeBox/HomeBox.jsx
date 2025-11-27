import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchusers, getUser } from '../../slices/userslice';
import { useNavigate } from 'react-router-dom';
import "./HomBox.css";
import Logo from "../../../asset/img/logo.png";

export default function HomeBox() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, currentuser } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchusers());
  }, [dispatch]);

  const chatUsers = users.filter(user => user.email !== currentuser?.email);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="app-container">
      {/* Logo ko yahan andar rakhein */}
      <div className="logo-container">
        <img src={Logo} alt="app logo" className="logo" />
      </div>

      <div className="chat-card">
        <div className="chat-headers">
          <div className="header-info">
            <h2>Messages</h2>
            <p className="current-user-tag">
              Logged in as: <b>{currentuser?.name || currentuser?.email}</b>
            </p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="user-list-container">
          {chatUsers.length > 0 ? (
            <ul className="user-list">
              {chatUsers.map((user, index) => (
                <li
                  key={user._id || index}
                  onClick={() => navigate("/chat", { state: user })}
                  className="user-item"
                >
                  <div className="user-avatar">
                    {(user.name || user.email).charAt(0).toUpperCase()}
                  </div>
                  <div className="user-details">
                    <span className="user-name">{user.name || user.email}</span>
                    <span className="user-status">Tap to start conversation</span>
                  </div>
                  <div className="arrow-icon">›</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">No other users found.</div>
          )}
        </div>
      </div>
    </div>
  );
}