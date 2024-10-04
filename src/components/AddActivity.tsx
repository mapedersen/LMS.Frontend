import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Heading, VStack, useToast } from "@chakra-ui/react";
import FormField from "./ui/FormFields";

const AddActivity = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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
      name,
      description,
      moduleId,
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
        setName("");
        setDescription("");
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
          id="name"
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Activity Name"
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
        <Button colorScheme="primary" isLoading={isLoading} type="submit" width="full">
          Add Activity
        </Button>
      </VStack>
    </Box>
  );
};

export default AddActivity;
