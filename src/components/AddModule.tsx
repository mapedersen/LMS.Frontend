import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";

interface Module {
  name: string;
  description: string;
  courseId: number;
  startDate: string;
  endDate: string;
}

const AddModule = () => {
  const [moduleData, setModuleData] = useState<Module>({
    name: "",
    description: "",
    courseId: 0,
    startDate: "",
    endDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setModuleData({
      ...moduleData,
      [name]: name === "courseId" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch("http://localhost:5058/api/modules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(moduleData),
      });

      if (response.ok) {
        toast({
          title: "Module added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setModuleData({
          name: "",
          description: "",
          courseId: 0,
          startDate: "",
          endDate: "",
        });
      } else {
        throw new Error("Failed to add module");
      }
    } catch (error) {
      toast({
        title: "Error adding module.",
        description: "Unable to add module",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <FormControl mb={4}>
        <FormLabel>Module Name</FormLabel>
        <Input
          name="name"
          value={moduleData.name}
          onChange={handleChange}
          placeholder="Enter module name"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Description</FormLabel>
        <Textarea
          name="description"
          value={moduleData.description}
          onChange={handleChange}
          placeholder="Enter module description"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Course ID</FormLabel>
        <Input
          name="courseId"
          type="number"
          value={moduleData.courseId}
          onChange={handleChange}
          placeholder="Enter related course ID"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Start Date</FormLabel>
        <Input
          name="startDate"
          type="datetime-local"
          value={moduleData.startDate}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>End Date</FormLabel>
        <Input
          name="endDate"
          type="datetime-local"
          value={moduleData.endDate}
          onChange={handleChange}
        />
      </FormControl>

      <Button colorScheme="teal" isLoading={isLoading} onClick={handleSubmit}>
        Add Module
      </Button>
    </Box>
  );
};

export default AddModule;
