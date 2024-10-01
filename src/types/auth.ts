import { ReactNode } from "react";
import { CourseDetails } from "./course";
import { ICourse } from '../components/StudentDashBoard';


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
  course: CourseDetails | ICourse | null;
  login: (credentials: AuthCredentials) => Promise<void>;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
