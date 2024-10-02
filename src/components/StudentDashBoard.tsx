import { List, ListItem, Grid, GridItem, Box, Center, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { ModuleList } from "./ModulesList";
import { ActiveModule } from "./ActiveModule";
import { ICourse, IModule } from "../types/course";

const StudentDashboard = () => {
  const { user, course } = useAuth();
  const [currentCourse, setCurrentCourse] = useState<ICourse | null>(null);
  const [selectedModule, setSelectedModule] = useState<IModule | null>(null);

  console.log("user", user);
  console.log("course", course);

  useEffect(() => {
    if (course && !currentCourse) {
      setCurrentCourse(course as ICourse);
    }
  }, [course, currentCourse]);

  if (!currentCourse) return <p>No Course</p>;

  console.log("currentCourse", currentCourse);

  const handleModuleClick = (module: IModule) => {
    setSelectedModule(module);
  };
  return (
    <Box p={5} w="100%">
      <Heading as="h2" mb={2}>
        <Center>Course:{currentCourse.name}</Center>
      </Heading>
      {/* Additional student-specific components */}
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
        </GridItem>
      </Grid>
    </Box>
  );
};

export default StudentDashboard;
