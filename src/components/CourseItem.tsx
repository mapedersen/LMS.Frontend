import { Card, CardHeader, CardBody, Heading, Text, Box, Badge } from "@chakra-ui/react";

// Define the type for the course item props
interface CourseItemProps {
  name: string;
  description: string;
  startDate: string; // Assuming you want to show the start date as well
  onClick: () => void; // onClick handler to trigger module rendering
}

export const CourseItem = ({ name, description, startDate, onClick }: CourseItemProps) => {
  return (
    <Card
      cursor="pointer"
      onClick={onClick}
      borderWidth={1}
      borderColor="gray.200"
      borderRadius="lg"
      transition="0.2s"
      _hover={{ boxShadow: "lg", transform: "scale(1.02)" }} // Hover effect
    >
      <CardHeader>
        <Heading size="md">{name}</Heading>
        <Text fontSize="sm" color="gray.500">
          {new Date(startDate).toLocaleDateString()} {/* Format date */}
        </Text>
      </CardHeader>
      <CardBody>
        <Text noOfLines={3} color="gray.600">
          {" "}
          {/* Truncate text if too long */}
          {description}
        </Text>
        <Badge colorScheme="blue" mt={2}>
          Click to view modules
        </Badge>{" "}
        {/* Additional context */}
      </CardBody>
    </Card>
  );
};
