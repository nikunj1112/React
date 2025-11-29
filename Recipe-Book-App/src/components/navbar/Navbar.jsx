// src/components/navbar/Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice";
import { filterByCategory, fetchRecipes } from "../../slices/recipeSlice";
import "./navbar.css";

// Put your logo in src/assets/logo.png (or update the path below)
import logo from "../../assets/img/logo.png";

export default function NavbarAndHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth || {});

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Dessert", "Drinks"];

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  // Start Cooking -> load recipes and navigate to /recipes
  const handleStartCooking = async () => {
    try {
      await dispatch(fetchRecipes());
    } catch (err) {
      console.error("fetchRecipes error:", err);
    }
    dispatch(filterByCategory("All"));
    closeMenus();
    navigate("/recipes");
  };

  // logout: clear auth and replace history entry so back button won't show protected page
  const handleLogout = () => {
    // dispatch logout to clear auth in store
    dispatch(logout());
    closeMenus();

    // Navigate to login and replace current history entry so user can't go back to protected page
    navigate("/login", { replace: true });

    // Extra defense: replace browser history state to the login path (prevents some back behavior)
    try {
      window.history.replaceState({}, "", "/login");
    } catch (e) {
      // ignore in older browsers
    }
  };

  // show extra controls (Categories, Add) ONLY when on /recipes or its subroutes
  const showControls = location.pathname.startsWith("/recipes");

  function HomePageContent() {
    return (
      <div
        className="home-content container-fluid text-center py-5"
        style={{ backgroundColor: "#FCF6D9", minHeight: "50vh" }}
      >
        {/* LOGO ABOVE THE TITLE */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20,marginTop:20 }}>
          <img
            src={logo}
            alt="Cookify Logo"
            style={{
              width: 200,
              height: 150,
              objectFit: "cover",
              borderRadius: 12,
              // boxShadow: "0 6px 18px rgba(0,0,0,0.12)"
            }}
          />
        </div>

        <h1 className="display-4 fw-bold mb-4" style={{ color: "#CF4B00" }}>
          👋 Welcome to Cookify!
        </h1>

        {isAuthenticated ? (
          <>
            <p className="lead" style={{ color: "#DDBA7D" }}>
              Ready to explore some new recipes, {user?.name || "Chef"}?
            </p>
            <button
              className="btn-custom btn-primary-color mx-2 mt-3"
              onClick={handleStartCooking}
            >
              🍳 Start Cooking Now
            </button>
          </>
        ) : (
          <>
            <p className="lead mb-4" style={{ color: "#DDBA7D" }}>
              Your ultimate digital recipe book is here. Discover, create, and share amazing meals.
            </p>
           
            <NavLink className="btn-custom btn-secondary-color mx-2" to="/register" onClick={closeMenus}>
              🚀 Get Started (Free)
            </NavLink>
            <NavLink className="btn-custom btn-primary-color mx-2" to="/login" onClick={closeMenus}>
              Login
            </NavLink>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <nav className="app-navbar" style={{ backgroundColor: "#9CC6DB" }}>
        <Link className="navbar-brand-custom" to="/" style={{ color: "#CF4B00", display: "flex", alignItems: "center", gap: 8 }} onClick={closeMenus}>

          <span style={{ fontWeight: 700, fontSize: 25 }}>🍽 Cookify</span>
        </Link>

        <button className="navbar-toggler-custom" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>

        <div className={`nav-collapse ${isMenuOpen ? "open" : ""}`}>
          <ul className="navbar-nav-list">
            <li className="nav-item-custom">
              <NavLink to="/" className="nav-link-custom" onClick={closeMenus}
                style={({ isActive }) => ({ color: isActive ? "#CF4B00" : "#FCF6D9", fontWeight: 600 })}>
                Home
              </NavLink>
            </li>

            {/* Show Categories only when on /recipes */}
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
                            dispatch(filterByCategory(cat));
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

            {/* Show Add Recipe only when on /recipes */}
            {showControls && (
              <li className="nav-item-custom">
                <NavLink
                  to="/add"
                  onClick={closeMenus}
                  className="btn-custom btn-secondary-color"
                  style={{ backgroundColor: "#DDBA7D", color: "#FCF6D9" }}
                >
                  ➕ Add Recipe
                </NavLink>
              </li>
            )}

            {/* Auth Buttons (always visible) */}
            {!isAuthenticated ? (
              <>
                <li className="nav-item-custom">
                  <NavLink to="/register" onClick={closeMenus} className="btn-custom btn-cream-bg"
                    style={{ backgroundColor: "#FCF6D9", color: "#CF4B00" }}>
                    🚀 Get Started
                  </NavLink>
                </li>
                <li className="nav-item-custom">
                  <NavLink to="/login" onClick={closeMenus} className="btn-custom btn-primary-color"
                    style={{ backgroundColor: "#CF4B00", color: "#FCF6D9" }}>
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item-custom">
                <button className="btn-custom btn-primary-color" style={{ backgroundColor: "#CF4B00", color: "#FCF6D9" }}
                  onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Render Homepage Only On "/" */}
      {location.pathname === "/" && <HomePageContent />}
    </>
  );
}
