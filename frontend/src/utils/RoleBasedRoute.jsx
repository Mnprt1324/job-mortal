import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const RoleBasedRoute = () => {
  const user = useSelector((state) => state.auth.user);
   
  if (!user || user.role !== "recruiter") {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
