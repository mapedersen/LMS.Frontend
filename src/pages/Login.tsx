// src/components/Login.tsx
import React, { useState } from "react";
import { handleLogin } from "../services/authService";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

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
          {isLoggedIn && <Text color="green.500">You are logged in!</Text>}
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
