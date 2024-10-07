import { useEffect, useState } from "react";
import { Box, Heading, SimpleGrid, Center, Button, useToast, Flex } from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { ICourses, ICourse, IModule, IActivity } from "../types/course";
import ModulesCard from "./ui/ModuleCard"; // Import ModulesCard component
import CourseCard from "./ui/CourseCard"; // Import CourseCard component
import ActivityCard from "./ui/ActivityCard"; // Import ActivityCard component
import { useLocation, useNavigate } from "react-router-dom";

const MAX_ITEMS = 5;
const CARD_WIDTH = "250px";

const TeacherDashboard = () => {
  const { course } = useAuth() as { course: ICourses };
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const [showAllModules, setShowAllModules] = useState(false);
  const [selectedModule, setSelectedModule] = useState<IModule | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Initialize useLocation

  useEffect(() => {
    if (location.state) {
      const { selectedCourseId, selectedModuleId } = location.state;
      const selectedCourse = course.courses.find((c) => c.id === selectedCourseId);
      if (selectedCourse) {
        setSelectedCourse(selectedCourse);
        const selectedModule = selectedCourse.modules.find((m) => m.id === selectedModuleId);
        if (selectedModule) {
          setSelectedModule(selectedModule);
        }
      }
    }
  }, [location.state, course.courses]);

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

  const handleAddCourse = () => {
    navigate(`/dashboard/add-course/`);
  };

  const handleAddModule = () => {
    if (selectedCourse) {
      navigate(`/dashboard/add-module/${selectedCourse.id}`);
    }
  };

  const handleAddActivity = () => {
    if (selectedModule) {
      navigate(`/dashboard/add-activity/${selectedModule.id}`);
    }
  };

  return (
    <Box p={5} w="100%">
      {/* Courses grid */}
      <Box mb={8}>
        <Flex align="baseline" mb={4} justifyContent="space-between">
          <Heading size="lg" mb={4}>
            Courses
          </Heading>
          <Button ml={4} onClick={handleAddCourse} colorScheme="teal" mr={10}>
            Add Course
          </Button>
        </Flex>
        <Flex gap={6} wrap="wrap">
          {courseList.map((course: ICourse) => (
            <CourseCard
              key={course.id}
              course={course}
              selectedCourse={selectedCourse}
              onClick={handleCourseClick}
            />
          ))}
        </Flex>
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
          <Flex align="center" mb={4} justifyContent="space-between" mr={10}>
            <Heading size="lg">Modules for {selectedCourse.name}</Heading>
            <Button ml={4} onClick={handleAddModule} colorScheme="teal">
              Add Module
            </Button>
          </Flex>
          <Flex gap={6} wrap="wrap">
            {moduleList.map((module: IModule) => (
              <ModulesCard
                key={module.id}
                module={module}
                selectedModule={selectedModule}
                onClick={handleModuleClick}
              />
            ))}
          </Flex>
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
          <Flex align="center" mb={4} justifyContent="space-between" mr={10}>
            <Heading size="lg">Activities for {selectedModule.name}</Heading>
            <Button ml={4} onClick={handleAddActivity} colorScheme="teal">
              Add Activity
            </Button>
          </Flex>
          <Flex gap={4} wrap="wrap">
            {selectedModule.activities.map((activity: IActivity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default TeacherDashboard;
