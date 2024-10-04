import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading, VStack, useToast } from "@chakra-ui/react";
import FormField from "./ui/FormFields";

const AddActivity = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
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

    const activityData = {
      title,
      description,
      dueDate,
    };

    try {
      setIsLoading(true);
      const response = await fetch("https://localhost:7243/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(activityData),
      });

      if (response.ok) {
        toast({
          title: "Activity created.",
          description: "The activity has been created successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setTitle("");
        setDescription("");
        setDueDate("");
        navigate("/dashboard");
      } else {
        toast({
          title: "Error",
          description: "There was an error creating the activity.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error creating the activity.",
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
        Add New Activity
      </Heading>
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <FormField
          id="title"
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Activity Title"
          isRequired
        />
        <FormField
          id="description"
          label="Description"
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Activity Description"
          isRequired
        />
        <FormField
          id="dueDate"
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          isRequired
        />
        <Button colorScheme="primary" isLoading={isLoading} type="submit" width="full">
          Add Activity
        </Button>
      </VStack>
    </Box>
  );
};

export default AddActivity;
