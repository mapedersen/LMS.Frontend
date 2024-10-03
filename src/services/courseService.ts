import { jwtDecode } from "jwt-decode";
import { ICourse, ICourses } from "../types/course";
import { refreshAccessToken } from "./authService";

// Check if the token is expired
const checkIfTokenExpired = (accessToken: string) => {
  if (!accessToken) return true; // Token doesn't exist, treat as expired

  const decodedToken: Record<string, any> = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

// Fetch course details
export const fetchCourseDetails = async (
  accessToken: string,
  userRole: string
): Promise<ICourse | ICourses> => {
  // Check if token has expired
  if (checkIfTokenExpired(accessToken)) {
    const { accessToken: newAccessToken } = await refreshAccessToken();
    if (newAccessToken) {
      accessToken = newAccessToken; // Update accessToken to the newly fetched one
    } else {
      throw new Error("Failed to refresh access token, please log in again.");
    }
  }

  const url =
    userRole === "Student"
      ? "https://localhost:7243/api/courses/student"
      : "https://localhost:7243/api/courses";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch course details");
  }
  return response.json();
};

export const fetchStudentsForCourse = async (
  accessToken: string,
  courseId: number
): Promise<any[]> => {
  if (checkIfTokenExpired(accessToken)) {
    const { accessToken: newAccessToken } = await refreshAccessToken();
    if (newAccessToken) {
      accessToken = newAccessToken;
    } else {
      throw new Error("Failed to refresh access token, please log in again.");
    }
  }

  const url = `https://localhost:7243/api/courses/${courseId}/students`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch students for course");
  }

  return response.json();
};
