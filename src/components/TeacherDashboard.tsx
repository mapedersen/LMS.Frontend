import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { ICourse, ICourses } from "../types/course";
import { CourseItem } from "./ui/CourseItem"; // Ensure to import the new component

const TeacherDashboard = () => {
  const { course } = useAuth(); // Get the course data from the context
  const [courses, setCourses] = useState<ICourses | null>(null); // State for courses

  useEffect(() => {
    if (course) {
      setCourses(course as ICourses); // Set courses when course data is available
    }
  }, [course]);

  // Render loading state if courses are null
  if (!courses) {
    return <Text>Loading courses...</Text>;
  }

  // Function to handle course item click
  const handleCourseClick = (courseId: number) => {
    console.log(`Course ${courseId} clicked!`); // Here you would implement the logic to show modules
  };

  // Handle the case when courses are available
  return (
    <Box p={5}>
      <Heading as="h2" mb={4}>
        Welcome, Teacher! These are your courses
      </Heading>
      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
        {courses.courses.map(
          (
            c: ICourse // Assuming courses is an array of ICourse
          ) => (
            <CourseItem
              key={c.id}
              name={c.name}
              description={c.description}
              startDate={c.startDate}
              onClick={() => handleCourseClick(c.id)} // Pass the course ID to the click handler
            />
          )
        )}
      </SimpleGrid>
    </Box>
  );
};

export default TeacherDashboard;
