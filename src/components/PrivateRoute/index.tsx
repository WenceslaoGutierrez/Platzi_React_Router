import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks";

const PrivateRoute = () => {
  const { account, signOut } = useAuth();
  const location = useLocation();

  const isAuthenticated = account.email !== "" && !signOut;

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
