// src/App.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { loadFromStorage } from "./slices/authSlice";

import NavbarAndHome from "./components/navbar/Navbar";
import RecipeList from "./components/recipeList/RecipeList";
import RecipeForm from "./components/recipeForm/RecipeForm";
import RecipeDetails from "./components/recipeDetails/RecipeDetails";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute";

import Signin from "./pages/Signin/Signin";
import Register from "./pages/Register/Register";
import FirstPage from "./components/firstPage/FirstPage";

export default function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((s) => s.auth || {});

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  return (
    <>
      {/* NAVBAR — ALWAYS RENDER (no condition) */}
      <NavbarAndHome />

      <Routes>
        <Route path="/" element={<FirstPage />} />

        <Route
          path="/login"
          element={
            <RestrictedRoute>
              <Signin />
            </RestrictedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute>
              <Register />
            </RestrictedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <PrivateRoute>
              <RecipeForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/recipes"
          element={
            <PrivateRoute>
              <RecipeList />
            </PrivateRoute>
          }
        />
        <Route
          path="/recipes/:id"
          element={
            <PrivateRoute>
              <RecipeDetails />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
