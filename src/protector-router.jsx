import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ redirectPath = "/login", isAllowed }) => {
  if (!Boolean(sessionStorage.getItem("user"))) {
    return <Navigate to={redirectPath} replace={true} />;
  }
  return <Outlet />;
};
