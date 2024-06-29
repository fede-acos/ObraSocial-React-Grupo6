import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jwt-decode/";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("test1" + token);
    if (token) {
      console.log("test2");
      const decodedToken = jwtDecode(token) as CustomJwtPayload;
      setCurrentUser(decodedToken);
      console.log(currentUser);
    }
    setIsLoading(false);
  }, []);

  const login = (token: string) => {
    console.log("test");
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token) as CustomJwtPayload;
    setCurrentUser(decodedToken);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};