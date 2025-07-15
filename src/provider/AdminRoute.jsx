// routes/AdminRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import Loading from "../Pages/shared/Loading";


const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isRoleLoading } = useUserRole();
  const location = useLocation();

  if (loading || isRoleLoading) {
    return <Loading></Loading> ;
  }

  if (user && (role === "admin" || role === "organizer")) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
