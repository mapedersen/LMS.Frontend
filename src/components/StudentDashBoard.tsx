import {
  List,
  ListItem,
  Grid,
  GridItem,
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Card,
  CardHeader,
  CardBody,
  Flex,
} from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import {
  fetchCourseDetails,
  fetchStudentsForCourse,
} from "../services/courseService";
//import { CourseDetails } from "../types/auth";
import { ModuleList } from "./ModulesList";
import { ActiveModule } from "./ActiveModule";
import { ActivitiesList } from "./ActivitiesList";
import { IUser } from "../types/user";

export interface IActivityType {
  id: number;
  name: string;
}

export interface IActivity {
  id: number;
  name: string;
  description: string;
  details: string | null;
  typeId: number;
  type: IActivityType;
  startDate: string;
  endDate: string;
  moduleId: number;
}

export interface IModule {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  courseId: number;
  activities: IActivity[] | [];
}

export interface ICourse {
  id: number;
  name: string;
  description: string;
  startDate: string;
  modules: IModule[];
}

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
            const students = await fetchStudentsForCourse(
              accessToken,
              currentCourse.id
            );
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
      setSelectedModule(currentCourse.modules[0]);
    }
  }, [currentCourse, selectedModule]);

  if (!currentCourse) return <p>No Course</p>;

  console.log("studentsForCourse", studentsForCourse);
  const handleModuleClick = (module: IModule) => {
    setSelectedModule(module);
  };
  return (
    <Box p={5} w="100%">
      <Heading as="h2" mb={2}>
        <Center>Course:{currentCourse.name}</Center>
      </Heading>
      <Grid templateColumns="repeat(7, 1fr)" gap={10}>
        <GridItem colSpan={1}>
          <ModuleList
            modules={currentCourse.modules}
            handleModuleClick={handleModuleClick}
            selectedModule={selectedModule}
          />
        </GridItem>
        <GridItem colSpan={6} bg="gray.50" borderRadius="lg" boxShadow="md">
          <Box display="flex" justifyContent="center" flexDirection="column">
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
                  flex="1"
                >
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
              <Text>No students found.</Text>
            )}
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default StudentDashboard;
