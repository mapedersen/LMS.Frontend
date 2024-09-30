import { CourseDetails } from "../types/auth";

export const fetchCourseDetails = async (accessToken: string): Promise<CourseDetails> => {
  const response = await fetch("https://localhost:7243/api/courses/student", {
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
