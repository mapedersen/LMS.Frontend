// src/Dashboard.tsx
import { Box, Text } from "@chakra-ui/react";

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
