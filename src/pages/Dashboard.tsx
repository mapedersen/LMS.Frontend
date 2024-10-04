import { Navbar } from "../components";
import StudentDashboard from "../components/StudentDashboard";
import TeacherDashboard from "../components/TeacherDashboard";
import { useAuth } from "../context/authContext";
import { Box, Text, Heading, VStack } from "@chakra-ui/react";

const Dashboard = () => {
  const { user, course } = useAuth();
  if (user) {
    console.log("The user is: ", user);
  }
  if (course) {
    console.log("The course is: ", course);
  }

  if (!user) {
    return (
      <Box textAlign="center" mt={10}>
        <Text>Please log in to access the dashboard.</Text>
      </Box>
    ); // Handle unauthorized access
  }

  return (
    <>
      <Navbar />
      <Box p={5}>
        <Heading mb={4}>Dashboard</Heading>
        <VStack spacing={4} align="start">
          {user.role === "Teacher" && <TeacherDashboard />}
          {user.role === "Student" && <StudentDashboard />}
          {/* Additional role checks as necessary */}
        </VStack>
      </Box>
    </>
  );
};

export default Dashboard;
