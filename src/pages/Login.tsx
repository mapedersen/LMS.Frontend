// src/components/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, FormControl, FormLabel, Input } from "../Components/Forms";
import { Box } from "../Components/Layout";
import { VStack } from "../Components/Stack";
import { Text } from "../Components/Typography";

import { useToast } from "../hooks"

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch("https://localhost:7243/api/authentication/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      setIsLoggedIn(true);
      toast({
        title: "Login Successful",
        description: "You've logged in successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      console.log("Login successful!");
      navigate("/dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log("Login failed!");
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgImage={`url("https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg")`} // Use your image here
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
