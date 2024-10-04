import { Box } from "@chakra-ui/react";
import { useAuth } from "../context/authContext";

const Users = () => {
  const { user } = useAuth();
  if (user?.role !== "Teacher") return <Box mt={20}>Only teachers have access to this page</Box>;

  return <Box mt={20}>Users</Box>;
};

export default Users;
