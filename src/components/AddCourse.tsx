import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading, VStack, useToast } from "@chakra-ui/react";
import CourseFormFields from "./ui/CourseFormFields";

const AddCourse = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("Access token is missing");
      return;
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
        navigate("/dashboard");
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

  return (
    <Box p={5} maxW="600px" mx="auto" mt="20" bg="white" borderRadius="md" boxShadow="md">
      <Heading as="h2" size="lg" mb={5} textAlign="center" color="primary.600">
        Add New Course
      </Heading>
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <CourseFormFields
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          startDate={startDate}
          setStartDate={setStartDate}
        />
        <Button colorScheme="primary" isLoading={isLoading} type="submit" width="full">
          Add Course
        </Button>
      </VStack>
    </Box>
  );
};

export default AddCourse;
