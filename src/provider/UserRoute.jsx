import { Navigate, useLocation } from "react-router";
// import useAuth from "../hooks/useAuth";
// import useUserRole from "../hooks/useUserRole";
import Loading from "../Pages/shared/Loading";
import useUserRole from "../hooks/useUserRole";
import useAuth from "../hooks/useAuth";

const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isRoleLoading } = useUserRole();
  const location = useLocation();

  if (loading || isRoleLoading) {
    return <Loading />;
  }

  if (user && (role === "user" || role === "participant")) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default UserRoute;
