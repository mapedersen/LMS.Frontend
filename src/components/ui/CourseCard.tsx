import React from "react";
import { Box, Card, CardHeader, Text, Badge, VStack, Heading } from "@chakra-ui/react";
import { format } from "date-fns";
import { ICourse } from "../../types/course";

interface CourseCardProps {
  course: ICourse;
  selectedCourse: ICourse | null;
  onClick: (course: ICourse) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, selectedCourse, onClick }) => {
  return (
    <Card
      key={course.id}
      cursor="pointer"
      onClick={() => onClick(course)}
      _hover={{ boxShadow: "2xl" }}
      width="250px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      position="relative"
      bg={selectedCourse?.id === course.id ? "teal.100" : "white"}>
      <CardHeader>
        <VStack align="start" spacing={2}>
          <Heading size="md">{course.name}</Heading>
          <Text fontSize="sm" color="gray.500">
            Start Date: {format(new Date(course.startDate), "MMMM dd, yyyy")}
          </Text>
          <Text noOfLines={2} overflow="hidden" textOverflow="ellipsis">
            {course.description}
          </Text>
        </VStack>
      </CardHeader>
      <Box p={4} flex="1" overflow="hidden">
        <Box position="absolute" bottom="4" left="4">
          <Badge colorScheme="teal">{course.modules.length} Modules</Badge>
        </Box>
      </Box>
    </Card>
  );
};

export default CourseCard;
