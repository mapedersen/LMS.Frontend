import { useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  Box,
  Center,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  Flex,
} from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { fetchStudentsForCourse } from "../services/courseService";
import { ActiveModule } from "./ActiveModule";
import { ModuleList } from "./ModulesList";
import { IUser } from "../types/user";
import { ICourse, IModule } from "../types/course";

const StudentDashboard = () => {
  const { user, course } = useAuth();
  const [currentCourse, setCurrentCourse] = useState<ICourse | null>(null);
  const [selectedModule, setSelectedModule] = useState<IModule | null>(null);
  const [studentsForCourse, setStudentsForCourse] = useState<IUser[] | []>([]);

  useEffect(() => {
    if (course && !currentCourse) {
      setCurrentCourse(course as ICourse);
    }

    if (currentCourse && user) {
      const fetchStudents = async () => {
        try {
          const accessToken = localStorage.getItem("accessToken");
          if (accessToken) {
            const students = await fetchStudentsForCourse(accessToken, currentCourse.id);
            setStudentsForCourse(students);
          } else {
            console.error("No access token available.");
          }
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      };
      fetchStudents();
    }
  }, [currentCourse, user]);

  useEffect(() => {
    if (currentCourse && currentCourse.modules.length > 0 && !selectedModule) {
      const activeModules = currentCourse.modules.filter(
        (module) => new Date(module.endDate) >= new Date()
      );
      if (activeModules.length > 0) {
        setSelectedModule(activeModules[0]);
      }
    }
  }, [currentCourse, selectedModule]);

  if (!currentCourse) return <p>No Course</p>;

  const handleModuleClick = (module: IModule) => {
    setSelectedModule(module);
  };
  return (
    <Box p={5} w="100%">
      <Grid templateColumns="repeat(7, 1fr)" gap={10}>
        <GridItem colSpan={1} height="80vh" overflowY="auto" minW={"320px"}>
          <ModuleList
            modules={currentCourse.modules}
            handleModuleClick={handleModuleClick}
            selectedModule={selectedModule}
          />
        </GridItem>
        <GridItem
          colSpan={6}
          bg="gray.50"
          borderRadius="lg"
          boxShadow="md"
          p={4}
          height="fit-content">
          <Box>
            <Heading as="h2" mb={2}>
              <Center>{currentCourse.name}</Center>
            </Heading>
            {selectedModule ? (
              <ActiveModule selectedModule={selectedModule} />
            ) : (
              <Text>No Modules found.</Text>
            )}
          </Box>
          {/* Display fellow student*/}
          <Flex wrap="wrap" justify="center" gap={4} mt={4}>
            {studentsForCourse.length > 0 ? (
              studentsForCourse.map((student) => (
                <Card
                  key={student.id}
                  border="1px"
                  borderColor="gray.200"
                  p={4}
                  maxW="300px"
                  minW="280px"
                  flex="1">
                  <CardHeader>
                    <Heading size="xs">
                      {student.firstName} {student.lastName}
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text fontSize="sm">Email: {student.email}</Text>
                  </CardBody>
                </Card>
              ))
            ) : (
              <Text>No other students for current course {currentCourse.name}.</Text>
            )}
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default StudentDashboard;
