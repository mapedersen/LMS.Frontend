import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

interface CourseFormFieldsProps {
  name: string;
  setName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
}

const CourseFormFields: React.FC<CourseFormFieldsProps> = ({
  name,
  setName,
  description,
  setDescription,
  startDate,
  setStartDate,
}) => {
  return (
    <>
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Course Name"
          bg="gray.50"
        />
      </FormControl>
      <FormControl id="description" isRequired>
        <FormLabel>Description</FormLabel>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Course Description"
          bg="gray.50"
        />
      </FormControl>
      <FormControl id="startDate" isRequired>
        <FormLabel>Start Date</FormLabel>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          bg="gray.50"
        />
      </FormControl>
    </>
  );
};

export default CourseFormFields;
