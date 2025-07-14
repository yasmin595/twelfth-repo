import React, { } from "react";

import { Navigate, useLocation } from "react-router";


import Loading from "../pages/shared/Loading";
import useAuth from "../hooks/useAuth";



const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
  //   console.log(user);
  const location = useLocation();
  // console.log(location);

  if (loading) {
    return <Loading></Loading>;
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/auth/login"></Navigate>;

  //if-> user thake return children
  // navigate--> Login
};

export default PrivateRoute;