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
import { fetchCourseDetails } from "../services/courseService";
import { useAuth } from "../context/authContext";

const AddActivity = () => {
  const { setCourse, user } = useAuth();
  const { moduleId } = useParams<{ moduleId: string }>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [typeId, setTypeId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [moduleEndDate, setModuleEndDate] = useState<Date | null>(null);
  const [moduleData, setModuleData] = useState<any | null>(null); // State to hold module data
  const [courseData, setCourseData] = useState<any | null>(null); // State to hold module data
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    // Fetch module and course details from the server
    const fetchModuleAndCourseDetails = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token is missing");
        return;
      }

      try {
        // Fetch module details
        const moduleResponse = await fetch(`https://localhost:7243/api/modules/${moduleId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (moduleResponse.ok) {
          const moduleData = await moduleResponse.json();
          setModuleData(moduleData);
          const courseId = moduleData.courseId;

          // Fetch course details
          const courseResponse = await fetch(`https://localhost:7243/api/courses/${courseId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (courseResponse.ok) {
            const courseData = await courseResponse.json();
            setCourseData(courseData);
          } else {
            console.error("Failed to fetch course details");
          }
        } else {
          console.error("Failed to fetch module details");
        }
      } catch (error) {
        console.error("Error fetching module and course details:", error);
      }
    };

    fetchModuleAndCourseDetails();
  }, [moduleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("Access token is missing");
      return;
    }

    // Validate start date
    if (moduleData && new Date(startDate) < new Date(moduleData.startDate)) {
      toast({
        title: "Invalid start date.",
        description: "Start date cannot be before the module's start date.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Validate end date
    if (moduleData && new Date(endDate) > new Date(moduleData.endDate)) {
      toast({
        title: "Invalid end date.",
        description: "End date cannot exceed the module's end date.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Validate that start date is not after end date
    if (new Date(startDate) > new Date(endDate)) {
      toast({
        title: "Invalid date range.",
        description: "Start date cannot be after the end date.",
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
      const response = await fetch("https://localhost:7243/api/activity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(activityData),
      });

      if (response.ok) {
        if (user) {
          if (accessToken) {
            const courses = await fetchCourseDetails(accessToken, user.role);
            console.log(courses);
            setCourse(courses);
          }
        }
        toast({
          title: "Activity Created",
          description: "The activity has been created successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate(`/dashboard`, {
          state: {
            selectedCourseId: moduleData.courseId,
            selectedModuleId: moduleData.id,
          },
        }); // Pass the course, module, and activity IDs as state
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
      {courseData && (
        <Box mb={5} p={4} bg="gray.100" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold">
            Course: {courseData.name}
          </Text>
          <Text>Description: {courseData.description}</Text>
          <Text>Start Date: {new Date(courseData.startDate).toLocaleDateString("en-CA")}</Text>
          {courseData.endDate && (
            <Text>End Date: {new Date(courseData.endDate).toLocaleDateString()}</Text>
          )}
        </Box>
      )}
      {moduleData && (
        <Box mb={5} p={4} bg="gray.100" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold">
            Module: {moduleData.name}
          </Text>
          <Text>Description: {moduleData.description}</Text>
          <Text>Start Date: {new Date(moduleData.startDate).toLocaleDateString("en-CA")}</Text>
          <Text>End Date: {new Date(moduleData.endDate).toLocaleDateString("en-CA")}</Text>
        </Box>
      )}
      <Heading as="h2" size="lg" mb={5} textAlign="center" color="primary.600">
        Add New Activity
      </Heading>
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Select
          placeholder="Select Type"
          value={typeId ?? ""}
          onChange={(e) => {
            setTypeId(Number(e.target.value));
            setName(e.target.options[e.target.selectedIndex].text); // Set the name as the selected activity type
          }}
          required>
          <option value="1">E-Learning</option>
          <option value="2">Assignment</option>
          <option value="3">Presentation</option>
          <option value="4">Group Work</option>
          <option value="5">Quiz</option>
        </Select>
        {/* <Input
          placeholder="Activity Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /> */}
        <Textarea
          placeholder="Activity Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
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
