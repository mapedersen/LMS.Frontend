import { Box, Button, Text } from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IUser } from "../types/user";
import { fetchAllUsers } from "../services/userService";

export const UsersPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  // Todo Fix later
  if (user?.role !== "Teacher") {
    return (
      <Box mt={20}>
        <Text>Only teachers have access to this page </Text>
        <Button onClick={() => navigate("/")}>TO LOGIN PAGE</Button>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </Box>
    );
  }

  useEffect(() => {
    const loadUsers = async () => {
      try {
        if (accessToken) {
          const usersData = await fetchAllUsers(accessToken);
          setUsers(usersData);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    loadUsers();
  }, [accessToken]);

  console.log("users", users);
  return (
    <Box mt={20} h={"100%"} bg={"red"}>
      <Text>Users</Text>
    </Box>
  );
};
