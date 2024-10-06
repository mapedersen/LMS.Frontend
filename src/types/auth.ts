import { ReactNode } from "react";
import { ICourse, ICourses } from "./course";

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface DecodedToken {
  userName: string;
  role: string;
  exp: number;
}

export interface UserState {
  userClaims: DecodedToken;
}

export interface AuthContextType {
  user: DecodedToken | null;
  course: ICourse | ICourses | null;
  setCourse: (course: ICourse | ICourses | null) => void;
  login: (credentials: AuthCredentials) => Promise<void>;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
