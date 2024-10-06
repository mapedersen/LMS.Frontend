import StudentDashboard from "../components/StudentDashboard";
import TeacherDashboard from "../components/TeacherDashboard";
import { useAuth } from "../context/authContext";
import { Box, Text, Heading, VStack } from "@chakra-ui/react";

const DashboardPage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Box textAlign="center" mt={10}>
        <Text>Please log in to access the dashboard.</Text>
      </Box>
    ); // Handle unauthorized access
  }

  return (
    <Box mt={20}>
      {user.role === "Teacher" && <TeacherDashboard />}
      {user.role === "Student" && <StudentDashboard />}
    </Box>
  );
};

export default DashboardPage;
