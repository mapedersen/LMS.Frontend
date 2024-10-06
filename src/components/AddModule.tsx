import React, { useState, useEffect } from "react";
import { Box, Button, Heading, VStack, useToast, Text } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import FormFields from "./ui/FormFields";
import { ICourse } from "../types/course";
import { refreshAccessToken } from "../services/authService";
import FormField from "./ui/FormFields";

const AddModule = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [thisCourse, setThisCourse] = useState<any>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchCourse = async (pageNumber = 1) => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token is missing. Attempting to refresh token...");
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

      try {
        const response = await fetch(
          `https://localhost:7243/api/courses?pageNumber=${pageNumber}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const foundCourse = data.courses.find(
            (course: ICourse) => course.id === Number(courseId)
          );

          if (foundCourse) {
            setThisCourse(foundCourse);
          } else if (data.totalCourses > data.pageSize * pageNumber) {
            fetchCourse(pageNumber + 1); // Fetch next page
          } else {
            console.error("Course not found");
          }
        } else {
          console.error("Failed to fetch courses");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourse();
  }, [courseId, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      toast({
        title: "Error",
        description: "No access token available.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (thisCourse && new Date(startDate) < new Date(thisCourse.startDate)) {
      toast({
        title: "Error",
        description: "Start date cannot be before the course start date.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const moduleData = {
      name,
      description,
      startDate,
      endDate,
      courseId,
    };

    try {
      setIsLoading(true);
      const response = await fetch("https://localhost:7243/api/modules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(moduleData),
      });

      if (response.ok) {
        const module = await response.json();
        toast({
          title: "Module created.",
          description: "The module has been created successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setName("");
        setDescription("");
        setStartDate("");
        setEndDate("");
        navigate(`/dashboard/add-activity/${module.id}`); // Navigate to AddActivity with the new module ID
      } else {
        toast({
          title: "Error",
          description: "There was an error creating the module.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error creating the module.",
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
      {thisCourse && (
        <Box mb={5} p={4} bg="gray.100" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold">
            Course: {thisCourse.name}
          </Text>
          <Text>Description: {thisCourse.description}</Text>
          <Text>Start Date: {new Date(thisCourse.startDate).toLocaleDateString("en-CA")}</Text>
        </Box>
      )}
      <Heading as="h2" size="lg" mb={5} textAlign="center" color="primary.600">
        Add New Module
      </Heading>
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <FormField
          id="name"
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Module Name"
          isRequired
        />
        <FormField
          id="description"
          label="Description"
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Module Description"
          isRequired
        />
        <FormField
          id="startDate"
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            console.log(e.target.value);
          }}
          isRequired
        />
        <FormField
          id="endDate"
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          isRequired
        />
        <Button type="submit" isLoading={isLoading} colorScheme="teal" width="full">
          Create Module
        </Button>
      </VStack>

      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Module Created</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>The module has been created successfully. What would you like to do next?</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddAnotherModule}>
              Add Another Module
            </Button>
            <Button variant="ghost" onClick={handleAddActivity}>
              Add Activity
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </Box>
  );
};

export default AddModule;
