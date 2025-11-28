// src/components/navbar/Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice"; 
import { filterByCategory } from "../../slices/recipeSlice";
import "./navbar.css";


// ---------------- Home Page Content ----------------
function HomePageContent() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div 
      className="home-content container-fluid text-center py-5" 
      style={{ backgroundColor: "#FCF6D9", minHeight: '50vh' }}
    >
      <h1 className="display-4 fw-bold mb-4" style={{ color: "#CF4B00" }}>
        👋 Welcome to Cookify!
      </h1>
      
      {isAuthenticated ? (
        <>
          <p className="lead" style={{ color: "#DDBA7D" }}>
            Ready to explore some new recipes, {user?.name || "Chef"}?
          </p>
          <NavLink
            className="btn-custom btn-primary-color mx-2 mt-3"
            to="/recipes"
          >
            🍳 Start Cooking Now
          </NavLink>
        </>
      ) : (
        <>
          <p className="lead mb-4" style={{ color: "#DDBA7D" }}>
            Your ultimate digital recipe book is here. Discover, create, and share amazing meals.
          </p>
          <NavLink
            className="btn-custom btn-secondary-color mx-2"
            to="/register"
          >
            🚀 Get Started (Free)
          </NavLink>
          <NavLink
            className="btn-custom btn-primary-color mx-2"
            to="/login"
          >
            Login
          </NavLink>
        </>
      )}
    </div>
  );
}


// ---------------- Navbar Component ----------------
export default function NavbarAndHome() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Dessert", "Drinks"];

  const handleNavClick = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <>
      {/* --- Navbar --- */}
      <nav className="app-navbar" style={{ backgroundColor: "#9CC6DB" }}>
        <Link
          className="navbar-brand-custom"
          to="/"
          style={{ color: "#CF4B00" }}
          onClick={handleNavClick}
        >
          🍽 Cookify
        </Link>

        {/* Hamburger for Mobile */}
        <button
          className="navbar-toggler-custom"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        <div className={`nav-collapse ${isMenuOpen ? "open" : ""}`}>
          <ul className="navbar-nav-list">

            {/* Home Link */}
            <li className="nav-item-custom">
              <NavLink
                className="nav-link-custom"
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? "#CF4B00" : "#FCF6D9",
                  fontWeight: "600",
                })}
                onClick={handleNavClick}
              >
                Home
              </NavLink>
            </li>

            {/* Categories Dropdown (Only for Authenticated Users) */}
            {isAuthenticated && (
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
                            dispatch(filterByCategory(cat));
                            handleNavClick(); 
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

            {/* Add Recipe Button (Always Visible) */}
            <li className="nav-item-custom">
              <NavLink
                className="btn-custom btn-secondary-color"
                to="/add"
                style={{ backgroundColor: "#DDBA7D", color: "#FCF6D9" }}
                onClick={handleNavClick}
              >
                ➕ Add Recipe
              </NavLink>
            </li>

            {/* Authentication Buttons */}
            {!isAuthenticated ? (
              <>
                <li className="nav-item-custom">
                  <NavLink
                    className="btn-custom btn-cream-bg"
                    to="/register"
                    style={{ backgroundColor: "#FCF6D9", color: "#CF4B00" }}
                    onClick={handleNavClick}
                  >
                    🚀 Get Started
                  </NavLink>
                </li>
                <li className="nav-item-custom">
                  <NavLink
                    className="btn-custom btn-primary-color"
                    to="/login"
                    style={{ backgroundColor: "#CF4B00", color: "#FCF6D9" }}
                    onClick={handleNavClick}
                  >
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item-custom">
                <button
                  className="btn-custom btn-primary-color"
                  style={{ backgroundColor: "#CF4B00", color: "#FCF6D9" }}
                  onClick={() => {
                    dispatch(logout());
                    handleNavClick();
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Home Page Content */}
      {location.pathname === "/" && <HomePageContent />}
    </>
  );
}
