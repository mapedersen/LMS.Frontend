import { Box, Heading, SimpleGrid, Center } from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { ICourses } from "../types/course";
import { DecodedToken } from "../types/auth";

const TeacherDashboard = () => {
  const { user, course } = useAuth() as { user: DecodedToken; course: ICourses };

  if (!course) return <p>No Course</p>;

  if ("courses" in course) {
    console.log(course.courses[1]); // Now TypeScript knows course is ICourses
  }

  return (
    <Box p={5} w="100%">
      <Heading as="h2" mb={2}>
        <Center>Welcome, {user?.role}</Center>
      </Heading>

      {/* Courses grid */}
      <Box mb={4}>
        <Heading size="md" mb={2}>
          Courses
        </Heading>
        <SimpleGrid minChildWidth="200px" spacing={4} overflowX="auto"></SimpleGrid>
      </Box>
    </Box>
  );
};

export default TeacherDashboard;
