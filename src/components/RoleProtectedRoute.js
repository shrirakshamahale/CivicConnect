import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ children, allowedRole }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");

  if (!isLoggedIn) return <Navigate to="/login" />;
  if (role !== allowedRole) return <Navigate to="/" />;

  return children;
}

export default RoleProtectedRoute;
