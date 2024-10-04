import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Center,
  Card,
  CardHeader,
  Text,
  Badge,
  Flex,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { fetchStudentsForCourse } from "../services/courseService";
import { IUser } from "../types/user";
import { IActivity, ICourse, IModule } from "../types/course";
import { format, isPast } from "date-fns";
import { DecodedToken } from "../types/auth";

const CARD_WIDTH = "250px";
const CARD_HEIGHT = "200px";

const StudentDashboard = () => {
  const { user, course } = useAuth() as { user: DecodedToken; course: ICourse };
  const [selectedModule, setSelectedModule] = useState<IModule | null>(null);
  const [studentsForCourse, setStudentsForCourse] = useState<IUser[] | []>([]);
  const [showPastModules, setShowPastModules] = useState(false);

  useEffect(() => {
    if (course && user) {
      const fetchStudents = async () => {
        try {
          const accessToken = localStorage.getItem("accessToken");
          if (accessToken) {
            const students = await fetchStudentsForCourse(accessToken, course.id);
            setStudentsForCourse(students);
          } else {
            console.error("No access token available.");
          }
        } catch (error) {
          console.error("Failed to fetch students:", error);
        }
      };
      fetchStudents();
    }
  }, [course, user]);

  const handleModuleClick = (module: IModule) => {
    if (selectedModule?.id === module.id) {
      setSelectedModule(null); // Unselect the module if it is already selected
    } else {
      setSelectedModule(module); // Select the module
    }
  };

  const filteredModules = course
    ? course.modules.filter((module) =>
        showPastModules ? isPast(new Date(module.endDate)) : !isPast(new Date(module.endDate))
      )
    : [];

  return (
    <Center>
      <Box p={5} w="100%" maxW="1200px" mx="auto">
        <Heading as="h2" mb={5} textAlign="center">
          Welcome, {user?.role}
        </Heading>

        {/* Course details */}
        {course && (
          <Box mb={8}>
            <Card
              mx="auto"
              borderWidth="2px"
              borderRadius="lg"
              overflow="hidden"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              position="relative"
              bg="teal.50"
              p={5}>
              <CardHeader display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Heading size="md">{course.name}</Heading>
                  <Text fontSize="sm" color="gray.500">
                    Start Date: {format(new Date(course.startDate), "MMMM dd, yyyy")}
                  </Text>
                </Box>
                <Badge colorScheme="teal">{course.modules.length} Modules</Badge>
              </CardHeader>
              <Box p={4} flex="1" overflow="hidden">
                <Text mb={2} noOfLines={3} overflow="hidden" textOverflow="ellipsis">
                  {course.description}
                </Text>
              </Box>
              {/* Fellow Students */}
              {studentsForCourse.length > 0 && (
                <Box mt={4}>
                  <Heading size="sm" mb={2}>
                    Fellow Students
                  </Heading>
                  <SimpleGrid columns={3} spacing={4}>
                    {studentsForCourse.map((student: IUser) => (
                      <Flex key={student.id} alignItems="center">
                        <Avatar name={student.firstName} mr={2} />
                        <Text>{student.firstName}</Text>
                      </Flex>
                    ))}
                  </SimpleGrid>
                </Box>
              )}
            </Card>
          </Box>
        )}

        {/* Modules grid */}
        {course && (
          <Box mb={8}>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
              <Heading size="lg">Modules</Heading>
              <Button onClick={() => setShowPastModules(!showPastModules)}>
                {showPastModules ? "Show Active Modules" : "Show Past Modules"}
              </Button>
            </Flex>
            <SimpleGrid columns={3} spacing={6}>
              {filteredModules.map((module: IModule) => (
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
                    <Text fontSize="sm" color="gray.500">
                      {format(new Date(module.startDate), "MMMM dd, yyyy")} -{" "}
                      {format(new Date(module.endDate), "MMMM dd, yyyy")}
                    </Text>
                  </CardHeader>
                  <Box p={4} pt={0} flex="1" overflow="hidden">
                    <Text noOfLines={2} overflow="hidden" textOverflow="ellipsis">
                      {module.description}
                    </Text>
                    <Box position="absolute" bottom="4" left="4">
                      <Badge colorScheme="teal">{module.activities.length} Activities</Badge>
                    </Box>
                  </Box>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        )}

        {/* Activities grid */}
        {selectedModule && (
          <Box mb={8}>
            <Heading size="lg" mb={4}>
              Activities for {selectedModule.name}
            </Heading>
            <SimpleGrid columns={3} spacing={6}>
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
                    <Text fontSize="sm" color="gray.500">
                      Due Date: {format(new Date(activity.endDate), "MMMM dd, yyyy")}
                    </Text>
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
    </Center>
  );
};

export default StudentDashboard;
