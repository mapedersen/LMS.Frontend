import { createContext, useState, useContext, useEffect } from "react";
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

  // Function to load the user from localStorage if a token exists
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken: Record<string, any> = jwtDecode(token);
      const userClaims: DecodedToken = {
        userName: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        exp: decodedToken.exp,
      };
      setUser(userClaims);
    }
  }, []);

  // Login function
  const login = async (credentials: AuthCredentials) => {
    const response: AuthResponse = await authServiceLogin(credentials);
    if (response.accessToken) {
      localStorage.setItem("accessToken", response.accessToken);

      // Decode token and map claims to DecodedToken structure
      const decodedToken = jwtDecode<Record<string, any>>(response.accessToken);

      const userClaims: DecodedToken = {
        userName: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        exp: decodedToken.exp,
      };

      setUser(userClaims);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

// Hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
