import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Heading,
  VStack,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setModuleData({ ...moduleData, [name]: name === "courseId" ? parseInt(value) : value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch("https://localhost:7243/api/modules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(moduleData),
      });

      if (response.ok) {
        toast({
          title: "Module created.",
          description: "The module has been created successfully.",
          status: "success",
          duration: 5000,
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
      <Heading as="h2" size="lg" mb={5} textAlign="center">
        Add New Module
      </Heading>
      <VStack spacing={4}>
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={moduleData.name}
            onChange={handleChange}
            placeholder="Module Name"
            bg="gray.50"
          />
        </FormControl>
        <FormControl id="description" isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={moduleData.description}
            onChange={handleChange}
            placeholder="Module Description"
            bg="gray.50"
          />
        </FormControl>
        <FormControl id="courseId" isRequired>
          <FormLabel>Course ID</FormLabel>
          <Input
            type="number"
            name="courseId"
            value={moduleData.courseId}
            onChange={handleChange}
            placeholder="Course ID"
            bg="gray.50"
          />
        </FormControl>
        <FormControl id="startDate" isRequired>
          <FormLabel>Start Date</FormLabel>
          <Input
            type="date"
            name="startDate"
            value={moduleData.startDate}
            onChange={handleChange}
            bg="gray.50"
          />
        </FormControl>
        <FormControl id="endDate" isRequired>
          <FormLabel>End Date</FormLabel>
          <Input
            type="date"
            name="endDate"
            value={moduleData.endDate}
            onChange={handleChange}
            bg="gray.50"
          />
        </FormControl>
        <Button colorScheme="teal" isLoading={isLoading} onClick={handleSubmit} width="full">
          Add Module
        </Button>
      </VStack>
    </Box>
  );
};

export default AddModule;
