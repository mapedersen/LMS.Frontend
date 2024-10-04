import { Box, Heading, SimpleGrid, Center, Card, CardHeader, Text, Button } from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { ICourses, ICourse, IModule } from "../types/course";
import { DecodedToken } from "../types/auth";
import { useState } from "react";

const MAX_ITEMS = 5;

const TeacherDashboard = () => {
  const { user, course } = useAuth() as { user: DecodedToken; course: ICourses };
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const [showAllModules, setShowAllModules] = useState(false);

  if (!course) return <p>No Course</p>;

  const courseList = showAllCourses ? course.courses : course.courses.slice(0, MAX_ITEMS);
  const moduleList = selectedCourse
    ? showAllModules
      ? selectedCourse.modules
      : selectedCourse.modules.slice(0, MAX_ITEMS)
    : [];

  const handleCourseClick = (course: ICourse) => {
    setSelectedCourse(course);
    setShowAllModules(false); // Reset module view when a new course is selected
  };

  return (
    <Box p={5} w="100%">
      <Heading as="h2" mb={2}>
        <Center>Welcome, {user?.role}</Center>
      </Heading>

      {/* Courses grid */}
      <Box mb={4}>
        <Heading size="md" mb={2}>
          Courses
        </Heading>
        <SimpleGrid minChildWidth="200px" spacing={4} overflowX="auto">
          {courseList.map((course: ICourse) => (
            <Card
              key={course.id}
              cursor="pointer"
              onClick={() => handleCourseClick(course)}
              _hover={{ boxShadow: "lg" }}>
              <CardHeader>
                <Heading size="sm">{course.name}</Heading>
              </CardHeader>
              <Text>{course.description}</Text>
            </Card>
          ))}
        </SimpleGrid>
        {course.courses.length > MAX_ITEMS && (
          <Button onClick={() => setShowAllCourses(!showAllCourses)}>
            {showAllCourses ? "Show Less" : "Show More"}
          </Button>
        )}
      </Box>

      {/* Modules grid */}
      {selectedCourse && (
        <Box mb={4}>
          <Heading size="md" mb={2}>
            Modules for {selectedCourse.name}
          </Heading>
          <SimpleGrid minChildWidth="200px" spacing={4} overflowX="auto">
            {moduleList.map((module: IModule) => (
              <Card key={module.id} cursor="pointer" _hover={{ boxShadow: "lg" }}>
                <CardHeader>
                  <Heading size="sm">{module.name}</Heading>
                </CardHeader>
                <Text>{module.description}</Text>
              </Card>
            ))}
          </SimpleGrid>
          {selectedCourse.modules.length > MAX_ITEMS && (
            <Button onClick={() => setShowAllModules(!showAllModules)}>
              {showAllModules ? "Show Less" : "Show More"}
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default TeacherDashboard;
