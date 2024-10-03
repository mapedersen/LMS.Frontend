import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast } from "@chakra-ui/react";

interface Module {
  name: string;
  description: string;
  courseId: number;
}

const AddModule = () => {
  const [moduleData, setModuleData] = useState<Module>({ name: "", description: "", courseId: 0 });
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
          title: "Module added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setModuleData({ name: "", description: "", courseId: 0 });
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
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <FormControl mb={4}>
        <FormLabel>Module Name</FormLabel>
        <Input name="name" value={moduleData.name} onChange={handleChange} placeholder="Enter module name" />
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

      <Button colorScheme="teal" isLoading={isLoading} onClick={handleSubmit}>
        Add Module
      </Button>
    </Box>
  );
};

export default AddModule;
