import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";

interface Course {
  id: string;
  name: string;
}

const CourseList: React.FC<{ courses: Course[] }> = ({ courses }) => {
  return (
    <Box p={4}>
      <Heading as="h2" size="md" mb={4}>
        Courses
      </Heading>
      <List spacing={3}>
        {courses.map((course) => (
          <ListItem key={course.id} bg="gray.100" p={3} borderRadius="md">
            <Text>{course.name}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CourseList;
