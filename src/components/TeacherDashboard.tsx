import { useState, useEffect } from "react";
import { Box, Heading, SimpleGrid, Center, Button, Flex, Spinner } from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { ICourses, ICourse, IModule, IActivity } from "../types/course";
import ModuleCard from "./ui/ModuleCard"; // Import ModuleCard component
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
  const [isInitialLoading, setIsInitialLoading] = useState(true); // State for initial loading
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Initialize useLocation

  useEffect(() => {
    if (location.state) {
      const { selectedCourseId, selectedModuleId } = location.state;
      const selectedCourse = course?.courses.find((c) => c.id === selectedCourseId);
      if (selectedCourse) {
        setSelectedCourse(selectedCourse);
        const selectedModule = selectedCourse.modules.find((m) => m.id === selectedModuleId);
        if (selectedModule) {
          setSelectedModule(selectedModule);
        }
      }
    }
    setTimeout(() => {
      setIsInitialLoading(false); // Hide loader after 0.5 seconds
    }, 500);
  }, [location.state, course?.courses]);

  if (isInitialLoading || !course) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

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

  const handleAddCourse = () => {
    navigate(`/dashboard/add-course`);
  };

  return (
    <Box p={10}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">Courses</Heading>
        <Button ml={4} onClick={handleAddCourse} colorScheme="teal">
          Add Course
        </Button>
      </Flex>
      <Flex gap={6} wrap="wrap">
        {courseList.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            selectedCourse={selectedCourse}
            onClick={() => handleCourseClick(course)}
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
      {selectedCourse && (
        <Box mt={8}>
          <Flex justify="space-between" align="center" mb={4}>
            <Heading size="lg">Modules for {selectedCourse.name}</Heading>
            <Button ml={4} onClick={handleAddModule} colorScheme="teal">
              Add Module
            </Button>
          </Flex>
          <Flex gap={6} wrap="wrap">
            {moduleList.map((module: IModule) => (
              <ModuleCard
                key={module.id}
                module={module}
                selectedModule={selectedModule}
                onClick={() => setSelectedModule(module)}
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
      {selectedModule && (
        <Box mt={8}>
          <Flex justify="space-between" align="center" mb={4}>
            <Heading size="lg">Activities for {selectedModule.name}</Heading>
            <Button ml={4} onClick={handleAddActivity} colorScheme="teal">
              Add Activity
            </Button>
          </Flex>
          <Flex wrap="wrap" gap={6}>
            {" "}
            {/* Changed to Flex with wrapping */}
            {selectedModule.activities.map((activity: IActivity) => (
              <Box key={activity.id} p={2}>
                <ActivityCard activity={activity} />
              </Box>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default TeacherDashboard;
