import {
  Box,
  Heading,
  SimpleGrid,
  Center,
  Card,
  CardHeader,
  Text,
  Button,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { ICourses, ICourse, IModule, IActivity } from "../types/course";
import { DecodedToken } from "../types/auth";
import { useState } from "react";
import { format } from "date-fns";

const MAX_ITEMS = 5;
const CARD_WIDTH = "250px";
const CARD_HEIGHT = "200px";

const TeacherDashboard = () => {
  const { user, course } = useAuth() as { user: DecodedToken; course: ICourses };
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const [showAllModules, setShowAllModules] = useState(false);
  const [selectedModule, setSelectedModule] = useState<IModule | null>(null);

  if (!course) return <p>No Course</p>;

  const courseList = showAllCourses ? course.courses : course.courses.slice(0, MAX_ITEMS);
  const moduleList = selectedCourse
    ? showAllModules
      ? selectedCourse.modules
      : selectedCourse.modules.slice(0, MAX_ITEMS)
    : [];

  const handleCourseClick = (course: ICourse) => {
    if (selectedCourse?.id === course.id) {
      setSelectedCourse(null); // Unselect the course if it is already selected
      setSelectedModule(null); // Reset selected module when the course is unselected
    } else {
      setSelectedCourse(course); // Select the course
      setShowAllModules(false); // Reset module view when a new course is selected
      setSelectedModule(null); // Reset selected module when a new course is selected
    }
  };

  const handleModuleClick = (module: IModule) => {
    if (selectedModule?.id === module.id) {
      setSelectedModule(null); // Unselect the module if it is already selected
    } else {
      setSelectedModule(module); // Select the module
    }
  };

  return (
    <Box p={5} w="100%">
      <Heading as="h2" mb={5}>
        <Center>Welcome, {user?.role}</Center>
      </Heading>

      {/* Courses grid */}
      <Box mb={8}>
        <Heading size="lg" mb={4}>
          Courses
        </Heading>
        <SimpleGrid minChildWidth={CARD_WIDTH} spacing={6} overflowX="auto">
          {courseList.map((course: ICourse) => (
            <Card
              key={course.id}
              cursor="pointer"
              onClick={() => handleCourseClick(course)}
              _hover={{ boxShadow: "2xl" }}
              width={CARD_WIDTH}
              height={CARD_HEIGHT}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              position="relative"
              bg={selectedCourse?.id === course.id ? "teal.100" : "white"}>
              <CardHeader>
                <Heading size="md">{course.name}</Heading>
                <Text fontSize="sm" color="gray.500">
                  Start Date: {format(new Date(course.startDate), "MMMM dd, yyyy")}
                </Text>
              </CardHeader>
              <Box p={4} flex="1" overflow="hidden">
                <Text mb={2} noOfLines={2} overflow="hidden" textOverflow="ellipsis">
                  {course.description}
                </Text>
                <Box position="absolute" bottom="4" left="4">
                  <Badge colorScheme="teal">{course.modules.length} Modules</Badge>
                </Box>
              </Box>
            </Card>
          ))}
        </SimpleGrid>
        {course.courses.length > MAX_ITEMS && (
          <Center mt={4}>
            <Button onClick={() => setShowAllCourses(!showAllCourses)}>
              {showAllCourses ? "Show Less" : "Show More"}
            </Button>
          </Center>
        )}
      </Box>

      {/* Modules grid */}
      {selectedCourse && (
        <Box mb={8}>
          <Heading size="lg" mb={4}>
            Modules for {selectedCourse.name}
          </Heading>
          <SimpleGrid minChildWidth={CARD_WIDTH} spacing={6} overflowX="auto">
            {moduleList.map((module: IModule) => (
              <Card
                key={module.id}
                cursor="pointer"
                onClick={() => handleModuleClick(module)}
                _hover={{ boxShadow: "2xl" }}
                width={CARD_WIDTH}
                height={CARD_HEIGHT}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                position="relative"
                bg={selectedModule?.id === module.id ? "teal.100" : "white"}>
                <CardHeader>
                  <Heading size="md">{module.name}</Heading>
                </CardHeader>
                <Box p={4} flex="1" overflow="hidden">
                  <Text noOfLines={3} overflow="hidden" textOverflow="ellipsis">
                    {module.description}
                  </Text>
                  <Box position="absolute" bottom="4" left="4">
                    <Badge colorScheme="teal">{module.activities.length} Activities</Badge>
                  </Box>
                </Box>
              </Card>
            ))}
          </SimpleGrid>
          {selectedCourse.modules.length > MAX_ITEMS && (
            <Center mt={4}>
              <Button onClick={() => setShowAllModules(!showAllModules)}>
                {showAllModules ? "Show Less" : "Show More"}
              </Button>
            </Center>
          )}
        </Box>
      )}

      {/* Activities grid */}
      {selectedModule && (
        <Box mb={8}>
          <Heading size="lg" mb={4}>
            Activities for {selectedModule.name}
          </Heading>
          <SimpleGrid minChildWidth={CARD_WIDTH} spacing={6} overflowX="auto">
            {selectedModule.activities.map((activity: IActivity) => (
              <Card
                key={activity.id}
                _hover={{ boxShadow: "2xl" }}
                width={CARD_WIDTH}
                height={CARD_HEIGHT}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                position="relative">
                <CardHeader>
                  <Heading size="md">{activity.name}</Heading>
                </CardHeader>
                <Box p={4} flex="1" overflow="hidden">
                  <Text noOfLines={3} overflow="hidden" textOverflow="ellipsis">
                    {activity.description}
                  </Text>
                </Box>
              </Card>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Box>
  );
};

export default TeacherDashboard;
