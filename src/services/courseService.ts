import { Course, Courses } from "../types/course";

// Fetch course details
export const fetchCourseDetails = async (
  accessToken: string,
  userRole: string
): Promise<Course | Courses> => {
  const url =
    userRole === "Student"
      ? "https://localhost:7243/api/courses/student"
      : "https://localhost:7243/api/courses";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch course details");
  }

  return response.json();
};
