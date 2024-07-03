import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function PublicRoutes({ children }: PropsWithChildren) {
  const auth = useAuth();

  if (auth?.isLoading) {
    return <p>Loading...</p>;
  }
  if (auth?.currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PublicRoutes;
