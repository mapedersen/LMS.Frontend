import { ReactNode } from "react";
import { CourseDetails } from "./course";

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshtoken: string;
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
  course: CourseDetails[] | null;
  login: (credentials: AuthCredentials) => Promise<void>;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
