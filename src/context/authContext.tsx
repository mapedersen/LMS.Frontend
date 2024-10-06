import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  AuthCredentials,
  AuthResponse,
  DecodedToken,
  AuthContextType,
  AuthProviderProps,
} from "../types/auth";

import { login as authServiceLogin, refreshAccessToken } from "../services/authService"; // Import refreshAccessToken
import { fetchCourseDetails } from "../services/courseService";
import { ICourse, ICourses } from "../types/course";

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

// Utility function to decode token and set user claims
const setUserClaims = (token: string): DecodedToken => {
  const decodedToken: Record<string, any> = jwtDecode(token);
  return {
    userName: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
    role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
    exp: decodedToken.exp ?? Math.floor(Date.now() / 1000) + 60 * 60, // Fallback to 1 hour in the future if exp is undefined
  };
};

// AuthProvider component as a functional component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [course, setCourse] = useState<ICourse | ICourses | null>(null);

  // Function to load user and fetch course details
  const loadUser = async () => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const userClaims = setUserClaims(token);

      // Check if token is expired
      if (checkIfTokenExpired(token)) {
        await handleRefreshToken();
      } else {
        setUser(userClaims);
        try {
          const courseDetails = await fetchCourseDetails(token, userClaims.role);
          setCourse(courseDetails);
        } catch (error) {
          console.log("Failed to fetch course details", error);
        }
      }
    }
  };

  // Check if the access token has expired
  const checkIfTokenExpired = (token: string): boolean => {
    const decodedToken: Record<string, any> = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };

  // Handle refresh token logic
  const handleRefreshToken = async () => {
    try {
      const { accessToken, refreshToken } = await refreshAccessToken();
      if (accessToken) {
        // Update local storage
        localStorage.setItem("accessToken", accessToken);
        if (refreshToken) {
          localStorage.setItem("refreshToken", refreshToken);
        }

        // Decode new access token and update user state
        const userClaims = setUserClaims(accessToken);
        setUser(userClaims);

        // Fetch course details again
        const courseDetails = await fetchCourseDetails(accessToken, userClaims.role);
        setCourse(courseDetails);
      } else {
        // Handle case when refresh token fails (e.g., log out)
        logout();
      }
    } catch (error) {
      console.error("Failed to refresh access token", error);
      logout(); // Logout on error
    }
  };

  // Load user on component mount
  useEffect(() => {
    loadUser();
  }, []);

  // Login function
  const login = async (credentials: AuthCredentials) => {
    const response: AuthResponse = await authServiceLogin(credentials);
    if (response.accessToken && response.refreshToken) {
      // Store accessToken and refreshToken in localStorage
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      // Decode accessToken and map claims to DecodedToken structure
      const userClaims = setUserClaims(response.accessToken);

      // Set user in state according to decoded data
      setUser(userClaims);

      // Fetch course details belonging to the user after login
      const courseDetails = await fetchCourseDetails(response.accessToken, userClaims.role);
      setCourse(courseDetails);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setCourse(null);
  };

  return (
    <AuthContext.Provider value={{ user, course, setCourse, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
