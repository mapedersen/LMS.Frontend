import { useState } from "react";
import { useAuth } from "../context/authContext"; // Import the useAuth hook
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Input, VStack, useToast } from "@chakra-ui/react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth(); // Access the login method from context

  const handleLogin = async () => {
    try {
      await login({ username, password }); // Call the login method
      toast({
        title: "Login Successful",
        description: "Welcome to the dashboard!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/dashboard"); // Redirect to the dashboard after login
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgImage={`url("https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg")`}
      bgSize="cover"
      bgPosition="center">
      <Box p={8} bg="white" borderRadius="md" boxShadow="md" width="300px">
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </FormControl>
          <Button colorScheme="teal" onClick={handleLogin}>
            Login
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default LoginPage;
