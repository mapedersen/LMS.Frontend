import { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import {
  AuthCredentials,
  AuthResponse,
  DecodedToken,
  AuthContextType,
  AuthProviderProps,
} from "../types/auth";
import { login as authServiceLogin } from "../services/authService";

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

// Authprovider component as a functional component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<DecodedToken | null>(null);

  const login = async (credentials: AuthCredentials) => {
    const response: AuthResponse = await authServiceLogin(credentials);
    if (response.accessToken) {
      localStorage.setItem("accessToken", response.accessToken);
      const decodedUser: DecodedToken = jwtDecode(response.accessToken);
      setUser(decodedUser);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
