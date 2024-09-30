import { Box, Heading, Text } from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react';
import { ModuleListItem } from './ModuleListItem';
import { useAuth } from '../context/authContext';
import { useEffect, useState } from 'react';
import { fetchCourseDetails } from '../services/courseService';
import { CourseDetails } from '../types/auth';

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
  console.log('user', user);
  console.log('course', course);

  useEffect(() => {
    if (course && !currentCourse) {
      setCurrentCourse(course as ICourse);
    }
  }, [course, currentCourse]);

  if (!currentCourse) return <p>No Course</p>;

  console.log('currentCourse', currentCourse);
  const handleModuleClick = (module: IModule) => {
    setSelectedModule(module);
  };
  return (
    <Box p={5} w='100%'>
      <Heading as='h2'>Course:{currentCourse.name}</Heading>
      {/* Additional student-specific components */}
      <Grid templateColumns='repeat(7, 1fr)' gap={6}>
        <GridItem colSpan={2} bg='blue.500'>
          <Text>All Modules</Text>
          <List>
            {currentCourse.modules.map((module) => (
              <ListItem
                key={module.id}
                onClick={() => handleModuleClick(module)}
                cursor='pointer'
                _hover={{ backgroundColor: 'blue.200' }}
              >
                <Text fontWeight='bold'>{module.name}</Text>
              </ListItem>
            ))}
          </List>
        </GridItem>
        <GridItem colSpan={5} bg='red.500'>
          <Box>
            <Text>Aktiv module</Text>
            {selectedModule ? (
              <Box>
                <Text fontWeight='bold'>Name: {selectedModule.name}</Text>
                <Text>Description: {selectedModule.description}</Text>
                <Text>Start Date: {selectedModule.startDate}</Text>
                <Text>End Date: {selectedModule.endDate}</Text>
              </Box>
            ) : (
              <Text>No Modules found.</Text>
            )}
            <Text>Activities</Text>
            {selectedModule?.activities.length !== 0 ? (
              selectedModule?.activities?.map((activity) => (
                <Box>
                  <Text fontWeight='bold'>Name: {activity.name}</Text>
                  <Text>Description: {activity.description}</Text>
                  <Text>Start Date: {activity.startDate}</Text>
                  <Text>End Date: {activity.endDate}</Text>
                </Box>
              ))
            ) : (
              <Text>No Activities found.</Text>
            )}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default StudentDashboard;
