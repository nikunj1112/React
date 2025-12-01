// src/pages/FirstPage/FirstPage.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/img/logo.png"; // adjust path if needed

// actions (adjust path if your slice lives elsewhere)
import { fetchRecipes, setCategoryFilter } from "../../slices/recipeSlice";

export default function FirstPage() {
  const { isAuthenticated, user } = useSelector((s) => s.auth || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Start Cooking -> load recipes, set filter and navigate to /recipes
  const handleStartCooking = async () => {
    try {
      // load recipes (unwrap will throw if the thunk rejects)
      await dispatch(fetchRecipes()).unwrap();
    } catch (err) {
      // if fetch fails, log and still try to navigate (optional)
      console.error("fetchRecipes error:", err);
      // you might want to show a toast / error UI here instead of continuing
    }

    // set category filter (synchronous action)
    try {
      dispatch(setCategoryFilter("All"));
    } catch (err) {
      console.error("setCategoryFilter error:", err);
    }

    closeMenus();
    navigate("/recipes");
  };

  const closeMenus = () => {
    // placeholder if you want to close any open nav/menu on click
  };

  return (
    <div
      className="home-content container-fluid text-center py-5"
      style={{ backgroundColor: "#FCF6D9", minHeight: "50vh" }}
    >
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20, marginTop: 20 }}>
        <img
          src={logo}
          alt="Cookify Logo"
          style={{
            width: 200,
            height: 150,
            objectFit: "cover",
            borderRadius: 12,
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
