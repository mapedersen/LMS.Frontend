import React from "react";
import { Box, Flex, Heading, Spacer, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box bg="primary.600" px={4} width="100%" position="fixed" top="0" zIndex="999">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading
          as="h1"
          size="lg"
          color="white"
          cursor="pointer"
          onClick={() => navigate("/dashboard")}>
          LMS
        </Heading>
        <Spacer />
        <Flex gap={4}>
          {user.role === "Teacher" && (
            <>
              {/* <Button as={Link} to="/dashboard/add-course" colorScheme="whiteAlpha" variant="solid">
                Add Course
              </Button> */}
              {/* <Button as={Link} to="/dashboard/users" colorScheme="whiteAlpha" variant="solid">
                Users
              </Button> */}
            </>
          )}
          <Button onClick={handleLogout} colorScheme="red" variant="solid">
            Logout
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
