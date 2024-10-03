import CreateCourse from '../components/AddCourse';
import StudentDashboard from '../components/StudentDashBoard';
import TeacherDashboard from '../components/TeacherDashboard';
import { useAuth } from '../context/authContext';
import { Box, Text, Heading, VStack } from '@chakra-ui/react';

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
      <Box textAlign='center' mt={10}>
        <Text>Please log in to access the dashboard.</Text>
      </Box>
    ); // Handle unauthorized access
  }

  return (
    <Box p={5}>
      <Heading mb={4}>CreateCourse</Heading>
      <CreateCourse></CreateCourse>
    </Box>
  );
};

export default Dashboard;
