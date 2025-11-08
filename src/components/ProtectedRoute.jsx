import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useUserStore();

  if (isLoading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
