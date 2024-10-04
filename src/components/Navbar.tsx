import { Box, Flex, Heading, Spacer, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;

  console.log(user);

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
        <Link to="/dashboard/users">Users</Link>
        <Link to="/create/course">Create Course</Link>
        <Link to="/create/module">Create Module</Link>
        <Button onClick={handleLogout}>Logout</Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
