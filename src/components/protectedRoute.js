import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.allStudent.authenticated);
  if (!auth) {
    return <Navigate to="/students/login" />;
  }
  return children;
};
export default ProtectedRoute;