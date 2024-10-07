import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Center, Heading, Spinner, VStack, useToast } from "@chakra-ui/react";
import FormField from "./ui/FormFields";
import { refreshAccessToken } from "../services/authService";
import { fetchCourseDetails } from "../services/courseService";
import { useAuth } from "../context/authContext";

const AddCourse = () => {
  const { setCourse, user } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const [isInitialLoading, setIsInitialLoading] = useState(true); // State for initial loading

  useEffect(() => {
    setTimeout(() => {
      setIsInitialLoading(false); // Hide loader after 0.5 seconds
    }, 500);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("Access token is missing. Attempting to refresh token...");
      // Assuming you have a function to refresh the token
      const newAccessToken = await refreshAccessToken();
      if (!newAccessToken) {
        toast({
          title: "Error",
          description: "Unable to refresh access token. Please log in again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        navigate("/login");
        return;
      }
      localStorage.setItem("accessToken", newAccessToken.accessToken);
    }

    const courseData = {
      name,
      description,
      startDate,
    };

    try {
      setIsLoading(true);
      const response = await fetch("https://localhost:7243/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        if (user) {
          if (accessToken) {
            const courses = await fetchCourseDetails(accessToken, user.role);
            console.log(courses);
            setCourse(courses);
          }
        }
        const course = await response.json();
        toast({
          title: "Course created.",
          description: "The course has been created successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setName("");
        setDescription("");
        setStartDate("");

        navigate(`/dashboard/add-module/${course.id}`);
      } else {
        toast({
          title: "Error",
          description: "There was an error creating the course.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error creating the course.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitialLoading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box p={5} maxW="600px" mx="auto" mt="20" bg="white" borderRadius="md" boxShadow="md">
      <Heading as="h2" size="lg" mb={5} textAlign="center" color="primary.600">
        Add New Course
      </Heading>
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <FormField
          id="name"
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Course Name"
          isRequired
        />
        <FormField
          id="description"
          label="Description"
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Course Description"
          isRequired
        />
        <FormField
          id="startDate"
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          isRequired
        />
        <Button colorScheme="primary" isLoading={isLoading} type="submit" width="full">
          Add Course
        </Button>
      </VStack>
    </Box>
  );
};

export default AddCourse;
