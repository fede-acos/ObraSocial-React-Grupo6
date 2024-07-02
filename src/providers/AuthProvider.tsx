import { jwtDecode } from "jwt-decode";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// TODO
//Mover types a otra carpeta

export type CustomJwtPayload = {
  iss: string;
  upn: string;
  groups: string[];
  iat: number;
  exp: number;
  jti: string;
};

type AuthContextType = {
  currentUser: CustomJwtPayload | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<CustomJwtPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("test1" + token);
    if (token) {
      const decodedToken = jwtDecode(token) as CustomJwtPayload;
      setCurrentUser(decodedToken);
    }
    setIsLoading(false);
  }, []);

  const login = (token: string) => {
    console.log("test");
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token) as CustomJwtPayload;
    setCurrentUser(decodedToken);
    navigate("/");
  };
  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
