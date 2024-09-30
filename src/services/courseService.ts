import { jwtDecode } from "jwt-decode";
import { CourseDetails } from "../types/course";
import { refreshAccessToken } from "./authService";

const checkIfTokenExpired = (accessToken: string) => {
  if (!accessToken) return true; // Token doesnt exist, treat as checkIfTokenExpired

  const decodedToken: Record<string, any> = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

export const fetchCourseDetails = async (
  accessToken: string,
  userRole: string
): Promise<CourseDetails[]> => {
  // check if token has expired
  if (checkIfTokenExpired(accessToken)) {
    await refreshAccessToken();
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
