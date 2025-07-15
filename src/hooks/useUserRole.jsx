import { useEffect, useState } from "react";
import useAuth from "./useAuth"; 
import useAxiosSecure from "./useAxiosSecure"; // secure axios hook

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  useEffect(() => {
    if (user?.email && !loading) {
      const fetchRole = async () => {
        try {
          const res = await axiosSecure.get(`/users/${user.email}`);
          setRole(res.data?.role || null);
        } catch (error) {
          console.error("Error fetching user role:", error);
          setRole(null);
        } finally {
          setIsRoleLoading(false);
        }
      };

      fetchRole();
    }
  }, [user?.email, loading, axiosSecure]);

  return { role, isRoleLoading };
};

export default useUserRole;
