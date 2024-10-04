import { Box, Button, Container, Text } from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const UsersPage = () => {
  console.log("JAg har kommit till users");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  console.log("User roll is: ", user?.role);

  if (user?.role !== "Teacher")
    return (
      <Box mt={20}>
        Only teachers have access to this page{" "}
        <Button onClick={() => navigate("/")}>TO LOGIN PAGE</Button>
      </Box>
    );

  return (
    <Box mt={20} h={"100%"} bg={"red"}>
      <Text>Users</Text>
    </Box>
  );
};
