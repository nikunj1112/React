// src/components/navbar/Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice";
import { fetchRecipes, setCategoryFilter } from "../../slices/recipeSlice";
import "./navbar.css";



export default function NavbarAndHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user } = useSelector((s) => s.auth || {});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Dessert", "Drinks"];

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    closeMenus();
    navigate("/login", { replace: true });
  };

  const showControls = location.pathname.startsWith("/recipes");

  return (
    <nav className="app-navbar" style={{ backgroundColor: "#9CC6DB" }}>
      {/* LOGO */}
      <Link
        className="navbar-brand-custom"
        to="/"
        onClick={closeMenus}
        style={{ color: "#CF4B00", display: "flex", alignItems: "center", gap: 8 }}
      >
       
        <span style={{ fontWeight: 700, fontSize: 25 }}>🧑‍🍳 Cookify</span>
      </Link>

      {/* MOBILE TOGGLER */}
      <button className="navbar-toggler-custom" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>

      {/* MENU */}
      <div className={`nav-collapse ${isMenuOpen ? "open" : ""}`}>
        <ul className="navbar-nav-list">
          
          {/* HOME LINK */}
          <li className="nav-item-custom">
            <NavLink
              to="/"
              onClick={closeMenus}
              className="nav-link-custom"
              style={({ isActive }) => ({
                color: isActive ? "#CF4B00" : "#FCF6D9",
                fontWeight: 600,
              })}
            >
              Home
            </NavLink>
          </li>

          {/* CATEGORY DROPDOWN ONLY ON /recipes */}
          {showControls && isAuthenticated && (
            <li className="nav-item-custom dropdown-custom">
              <button
                className="btn-custom dropdown-toggle"
                style={{ backgroundColor: "#DDBA7D", color: "#CF4B00" }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Categories
              </button>

              {isDropdownOpen && (
                <ul className="dropdown-menu-custom">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button
                        className="dropdown-item-custom"
                        style={{ color: "#CF4B00" }}
                        onClick={() => {
                          dispatch(setCategoryFilter(cat));
                          closeMenus();
                          navigate("/recipes");
                        }}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )}

          {/* Add Recipe */}
          {showControls && (
            <li className="nav-item-custom">
              <NavLink
                to="/add"
                onClick={closeMenus}
                className="btn-custom"
                style={{ backgroundColor: "#DDBA7D", color: "#CF4B00" }}
              >
                ➕ Add Recipe
              </NavLink>
            </li>
          )}

          {/* AUTH BUTTONS */}
          {!isAuthenticated ? (
            <>
              <li className="nav-item-custom">
                <NavLink
                  to="/register"
                  onClick={closeMenus}
                  className="btn-custom"
                  style={{ backgroundColor: "#FCF6D9", color: "#CF4B00" }}
                >
                  🚀 Get Started
                </NavLink>
              </li>

              <li className="nav-item-custom">
                <NavLink
                  to="/login"
                  onClick={closeMenus}
                  className="btn-custom"
                  style={{ backgroundColor: "#CF4B00", color: "#FCF6D9" }}
                >
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <li className="nav-item-custom">
              <button
                className="btn-custom"
                style={{ backgroundColor: "#CF4B00", color: "#FCF6D9" }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
