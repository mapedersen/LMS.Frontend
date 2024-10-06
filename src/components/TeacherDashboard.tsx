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
  IconButton,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useAuth } from "../context/authContext";
import { ICourses, ICourse, IModule, IActivity } from "../types/course";
import { useState } from "react";
import { format } from "date-fns";
import { deleteCourse } from "../services/courseService";

const MAX_ITEMS = 5;
const CARD_WIDTH = "250px";
const CARD_HEIGHT = "200px";

const TeacherDashboard = () => {
  const { course } = useAuth() as { course: ICourses };
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const [showAllModules, setShowAllModules] = useState(false);
  const [selectedModule, setSelectedModule] = useState<IModule | null>(null);
  const toast = useToast();

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

  const handleEditCourse = (course: ICourse) => {
    // Handle course edit logic here
    console.log("Edit course:", course);
  };

  const handleDeleteCourse = async (course: ICourse) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("Access token is missing");
      return;
    }
    try {
      await deleteCourse(accessToken, course.id.toString());
      toast({
        title: "Course deleted.",
        description: `Course ${course.name} has been deleted successfully.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Optionally, refresh the course list or remove the deleted course from the state
    } catch (error) {
      toast({
        title: "Error deleting course.",
        description: `Failed to delete course ${course.name}.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5} w="100%">
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
              <Box position="absolute" top="2" right="2">
                <IconButton
                  aria-label="Edit Course"
                  icon={<EditIcon />}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditCourse(course);
                  }}
                  mr={2}
                />
                {/* <IconButton
                  aria-label="Delete Course"
                  icon={<DeleteIcon />}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCourse(course);
                  }}
                /> */}
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
