import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: Props) => {
  const userData = localStorage.getItem("user") ?? "{}";
  const user = JSON.parse(userData);

  // If user role is NOT admin, block access and redirect
  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;