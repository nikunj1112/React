// src/App.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { loadFromStorage } from "./slices/authSlice";

import NavbarAndHome from "./components/navbar/Navbar";
import RecipeList from "./components/recipeList/RecipeList";
import RecipeForm from "./components/recipeForm/RecipeForm";
import RecipeDetails from "./components/recipeDetails/RecipeDetails";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute";
import Signin from "./pages/Signin/Signin";
import Register from "./pages/Register/Register";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  return (
    <>
      <NavbarAndHome />

      <Routes>
        {/* When NOT logged in */}
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

        {/* When logged in */}
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

        {/* IMPORTANT: KEEP ROOT BLANK, NO REDIRECT */}
        <Route path="/" element={null} />

        {/* Not found */}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </>
  );
}
