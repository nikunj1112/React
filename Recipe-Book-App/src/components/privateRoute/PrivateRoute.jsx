// src/components/privateRoute/PrivateRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useSelector((s) => s.auth || {});
  const location = useLocation();

  if (!isAuthenticated) {
    // redirect to login, remember where we came from
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
