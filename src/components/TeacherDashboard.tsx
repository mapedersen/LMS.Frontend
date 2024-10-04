import {
  Box,
  Button,
  Card,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
  Grid,
  GridItem,
  Center,
} from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { ICourse, IModule } from "../types/course";
import { ModuleList } from "./ModulesList";
import { ActiveModule } from "./ActiveModule";

const MAX_COURSES = 5; // Max courses to display initially

const TeacherDashboard = () => {
  const { user, course } = useAuth();
  const [currentCourse, setCurrentCourse] = useState<ICourse | null>(null);
  const [selectedModule, setSelectedModule] = useState<IModule | null>(null);
  const [showAllCourses, setShowAllCourses] = useState(false); // Control for showing more courses
  const [displayedCourses, setDisplayedCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    if (course && !currentCourse) {
      setCurrentCourse(course as ICourse);
    }
  }, [course, currentCourse]);

  // Set displayed courses based on toggle
  useEffect(() => {
    if (course) {
      const courseList = Array.isArray(course) ? course : [course];
      setDisplayedCourses(showAllCourses ? courseList : courseList.slice(0, MAX_COURSES));
    }
  }, [course, showAllCourses]);

  if (!currentCourse) return <p>No Course</p>;

  const handleModuleClick = (module: IModule) => {
    setSelectedModule(module);
  };

  const toggleCoursesView = () => {
    setShowAllCourses((prevState) => !prevState);
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
          {displayedCourses.map((course) => (
            <Card
              key={course.id}
              cursor="pointer"
              onClick={() => setCurrentCourse(course)} // Change course on click
              _hover={{ boxShadow: "lg" }}>
              <CardHeader>
                <Heading size="sm">{course.name}</Heading>
              </CardHeader>
              <Text>{course.description}</Text>
            </Card>
          ))}
        </SimpleGrid>

        {/* Button to show all courses */}
        <Button mt={3} onClick={toggleCoursesView}>
          {showAllCourses ? "Show Less" : "Show All"}
        </Button>
      </Box>

      {/* Modules and Activities */}
      <Grid templateColumns="repeat(7, 1fr)" gap={10}>
        <GridItem colSpan={1}>
          <ModuleList
            modules={currentCourse?.modules || []}
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
        </GridItem>
      </Grid>
    </Box>
  );
};

export default TeacherDashboard;
