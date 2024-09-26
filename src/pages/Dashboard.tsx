// src/Dashboard.tsx

import { Box } from "../Components/Layout";
import { Text } from "../Components/Typography";


const Dashboard = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh" bg="gray.100">
      <Text fontSize="4xl" fontWeight="bold">
        Welcome to the Dashboard!
      </Text>
    </Box>
  );
};

export default Dashboard;
