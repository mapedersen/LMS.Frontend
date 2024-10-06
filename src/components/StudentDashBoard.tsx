import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Center,
  Flex,
  Avatar,
  Button,
  VStack,
  Card,
  CardHeader,
  Text,
  Badge,
} from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { fetchStudentsForCourse } from "../services/courseService";
import { IUser } from "../types/user";
import { IActivity, ICourse, IModule } from "../types/course";
import { format, isPast } from "date-fns";
import { DecodedToken } from "../types/auth";
import ModulesCard from "./ui/ModuleCard"; // Ensure correct import path
import ActivityCard from "./ui/ActivityCard"; // Ensure correct import path

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
            console.log(students);
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
      <Box
        p={5}
        w="90%"
        maxW="1200px"
        mx="auto"
        mt="5"
        display="flex"
        justifyContent="center"
        alignItems="center">
        <Flex direction="column" alignItems="center">
          <Flex direction="row" width="100%" justifyContent="space-between">
            {/* Modules list */}
            <Box mr={8}>
              <Heading size="lg" mb={4}>
                Modules
              </Heading>
              <Button
                colorScheme="teal"
                onClick={() => setShowPastModules(!showPastModules)}
                mb={4}>
                {showPastModules ? "Show Active Modules" : "Show Past Modules"}
              </Button>
              <VStack spacing={4}>
                {filteredModules.map((module: IModule) => (
                  <ModulesCard
                    key={module.id}
                    module={module}
                    selectedModule={selectedModule}
                    onClick={handleModuleClick}
                  />
                ))}
              </VStack>
            </Box>

            {/* Course details */}
            <Box flex="1">
              {course && (
                <Box mb={8} p={15}>
                  <Card
                    mx="auto"
                    minWidth="800px"
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
                      <Box p={15}>
                        <Heading size="sm" mb={2}>
                          Fellow Students
                        </Heading>
                        <SimpleGrid columns={3} spacing={4}>
                          {studentsForCourse.map((student: IUser, index) => (
                            <Flex key={index} alignItems="center">
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

              {/* Activities grid */}
              {selectedModule && (
                <Box mb={8} p="15px">
                  <Heading size="lg" mb={4}>
                    Activities for {selectedModule.name}
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {selectedModule.activities.map((activity: IActivity) => (
                      <ActivityCard key={activity.id} activity={activity} />
                    ))}
                  </SimpleGrid>
                </Box>
              )}
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Center>
  );
};

export default StudentDashboard;
