import React from 'react';
import { Navigate, Outlet } from 'react-router';
import useAuth from '../hooks/useAuth';


const UserRoute = () => {
  const { user, userRole, loading } = useAuth(); 

  if (loading) {
    return <div>Loading...</div>;
  }


  if (!user || !['user', 'participant'].includes(userRole)) {
    return <Navigate to="/login" replace />;  
  }

  return <Outlet />;
};

export default UserRoute;
