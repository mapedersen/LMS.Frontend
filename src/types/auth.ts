import { ReactNode } from 'react';
import { ICourse } from '../components/StudentDashBoard';

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

export interface CourseDetails {
  courseId: string;
  courseName: string;
  instructor: string;
}

export interface UserState {
  userClaims: DecodedToken;
  courseDetails?: CourseDetails;
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
