import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) {
    // Agar user login nahi hai, Login page pe redirect kar do
    return <Navigate to="/" replace />;
  }

  // User logged in hai, toh nested routes render karo
  return <Outlet />;
};

export default ProtectedRoute;
