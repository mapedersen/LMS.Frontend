import {
  Box,
  Flex,
  Button,
  Heading,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
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

  const handleRout = () => {
    navigate("/dashboard/users");
  };

  console.log("user", user?.role);
  return (
    <Box
      bg="blue.600"
      px={4}
      width="100%"
      position="fixed"
      top="0"
      zIndex="999"
    >
      <Flex h={16} alignItems="center">
        <Heading as="h1" size="lg" color="white">
          LMS
        </Heading>
        <Spacer />
        <Flex gap={2}>
          {user.role === "Teacher" && (
            <Button onClick={handleRout} variant="outline">
              View Users
            </Button>
          )}
          <Button onClick={handleLogout}>Logout</Button>
          <Menu>
            <MenuButton as={Button}>Profile</MenuButton>
            <MenuList>
              <Box>
                <Text>User: {user.userName}</Text>
                <Text>Role: {user.role}</Text>
              </Box>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};
