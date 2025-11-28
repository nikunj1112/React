// src/App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/navbar/Navbar";
import RecipeList from "./components/recipeList/RecipeList";
import RecipeForm from "./components/recipeForm/RecipeForm";
import RecipeDetails from "./components/recipeDetails/RecipeDetails";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

// Pages
import Login from "./pages/signin/Signin";
import Register from "./pages/register/Register";

export default function App() {
  return (
    <>
      {/* Navbar हमेशा सबसे ऊपर */}
      <Navbar />

      {/* Routes */}
      <Routes>
        {/* ---------------- PUBLIC ROUTES ---------------- */}
        <Route path="/" element={<RecipeList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />

        {/* ---------------- PROTECTED ROUTES ---------------- */}
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <RecipeForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <RecipeForm isEditMode={true} /> {/* RecipeForm को Edit Mode में उपयोग */}
            </PrivateRoute>
          }
        />

        {/* ---------------- 404 PAGE ---------------- */}
        <Route
          path="*"
          element={
            <h1
              style={{
                textAlign: "center",
                marginTop: "50px",
                color: "#CF4B00",
              }}
            >
              404 | Page Not Found
            </h1>
          }
        />
      </Routes>
    </>
  );
}
