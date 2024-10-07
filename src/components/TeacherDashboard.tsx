import { useState } from "react";
import { Box, Heading, SimpleGrid, Center, Button, useToast } from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { ICourses, ICourse, IModule, IActivity } from "../types/course";
import ModulesCard from "./ui/ModuleCard"; // Import ModulesCard component
import CourseCard from "./ui/CourseCard"; // Import CourseCard component
import ActivityCard from "./ui/ActivityCard"; // Import ActivityCard component

const MAX_ITEMS = 5;
const CARD_WIDTH = "250px";

const TeacherDashboard = () => {
  const { course } = useAuth() as { course: ICourses };
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const [showAllModules, setShowAllModules] = useState(false);
  const [selectedModule, setSelectedModule] = useState<IModule | null>(null);

  if (!course) return <p>No Course</p>;

  console.log(course);

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
      {/* Courses grid */}
      <Box mb={8}>
        <Heading size="lg" mb={4}>
          Courses
        </Heading>
        <SimpleGrid minChildWidth={CARD_WIDTH} spacing={6} overflowX="auto">
          {courseList.map((course: ICourse) => (
            <CourseCard
              key={course.id}
              course={course}
              selectedCourse={selectedCourse}
              onClick={handleCourseClick}
            />
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
              <ModulesCard
                key={module.id}
                module={module}
                selectedModule={selectedModule}
                onClick={handleModuleClick}
              />
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
          <SimpleGrid columns={3} spacing={6}>
            {selectedModule.activities.map((activity: IActivity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Box>
  );
};

export default TeacherDashboard;
