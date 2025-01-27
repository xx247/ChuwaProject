import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children, redirectPath = "/login" }) => {
  useEffect(() => {
    if(!isAuthenticated) {
      alert("Unauthorized access attempt detected. Please login to continue.");
    }
}, [isAuthenticated]);

  return isAuthenticated ? children : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
