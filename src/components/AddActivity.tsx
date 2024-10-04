import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  VStack,
  useToast,
  Select,
  Input,
  Textarea,
  Text,
} from "@chakra-ui/react";

const AddActivity = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [typeId, setTypeId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [moduleEndDate, setModuleEndDate] = useState<Date | null>(null);
  const [moduleData, setModuleData] = useState<any | null>(null); // State to hold module data
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    // Fetch module details from the server
    const fetchModuleDetails = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token is missing");
        return;
      }

      try {
        const response = await fetch(`https://localhost:7243/api/modules/${moduleId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const moduleData = await response.json();
          setModuleEndDate(new Date(moduleData.endDate));
          setModuleData(moduleData); // Set module data
        } else {
          console.error("Failed to fetch module details");
        }
      } catch (error) {
        console.error("Error fetching module details:", error);
      }
    };

    fetchModuleDetails();
  }, [moduleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("Access token is missing");
      return;
    }

    // Validate end date
    if (moduleEndDate && new Date(endDate) > moduleEndDate) {
      toast({
        title: "Invalid end date.",
        description: "End date cannot exceed the module's end date.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const activityData = {
      name,
      description,
      typeId,
      startDate,
      endDate,
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
          title: "Activity Created",
          description: "The activity has been created successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate(`/modules/${moduleId}`);
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
      {moduleData && (
        <Box mb={5} p={4} bg="gray.100" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold">
            Module: {moduleData.name}
          </Text>
          <Text>Description: {moduleData.description}</Text>
        </Box>
      )}
      <Heading as="h2" size="lg" mb={5} textAlign="center" color="primary.600">
        Add New Activity
      </Heading>
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Input
          placeholder="Activity Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Textarea
          placeholder="Activity Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Select
          placeholder="Select Type"
          value={typeId ?? ""}
          onChange={(e) => setTypeId(Number(e.target.value))}
          required>
          <option value="1">Lecture</option>
          <option value="2">Submission</option>
          <option value="3">Group Assignment</option>
          <option value="4">Presentation</option>
        </Select>
        <Input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <Input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <Button type="submit" isLoading={isLoading} colorScheme="teal" width="full">
          Create Activity
        </Button>
      </VStack>
    </Box>
  );
};

export default AddActivity;
