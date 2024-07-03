import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  //TODO
  // aca se debería agregar logica para checkear los roles si se hace un dashboard de admin.

  const auth = useAuth();

  if (auth?.isLoading) {
    return <p>Loading...</p>;
  }

  if (!auth?.currentUser) {
    //no hay usuario logeado
    return <Navigate to="/login" />;
  }

  return children;
};
