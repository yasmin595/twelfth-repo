import React from "react";
import { Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";


const UserRoute = () => {
  const { user, loading, userData } = useAuth(); 


  if (loading) {
    return <p>Loading...</p>; 
  }

 
  if (!user) {
    return <Navigate to="/login" replace />;
  }

 
  if (userData?.role === "participant" || userData?.role === "user") {
    return <Outlet />;  
  }

  return <Navigate to="/" replace />;
};

export default UserRoute;
