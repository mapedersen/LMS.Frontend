import { CourseDetails } from "../types/course";

export const fetchCourseDetails = async (
  accessToken: string,
  userRole: string
): Promise<CourseDetails[]> => {
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
