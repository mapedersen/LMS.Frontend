import { Box, Flex, Heading, Spacer, Text, Avatar, Button } from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  const handleUsersClick = () => {
    navigate("/dashboard/users");
  };

  return (
    <Box bg="teal.600" px={4} width="100%" position="fixed" top="0" zIndex="999">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading as="h1" size="lg" color="white" cursor="pointer" onClick={handleDashboardClick}>
          LMS
        </Heading>
        <Spacer />
        <Flex alignItems="center">
          <Avatar name={user.userName} mr={4} />
          <Text color="white" mr={4}>
            {user.userName}
          </Text>
          {user.role === "Teacher" && (
            <Button
              bg="yellow.400"
              color="black"
              _hover={{ bg: "yellow.500" }}
              onClick={handleUsersClick}
              mr={4}>
              Handle Users
            </Button>
          )}
          <Button
            bg="yellow.400"
            color="black"
            _hover={{ bg: "yellow.500" }}
            onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
