import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks";

const PrivateRoute = () => {
  const { signOut } = useAuth();
  const isAuthenticated = !signOut;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
