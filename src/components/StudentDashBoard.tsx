import {
  List,
  ListItem,
  Grid,
  GridItem,
  Box,
  Center,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useAuth } from '../context/authContext';
import { useEffect, useState } from 'react';
import { fetchCourseDetails } from '../services/courseService';
import { CourseDetails } from '../types/auth';
import { ModuleList } from './ModulesList';
import { ActiveModule } from './ActiveModule';
import { ActivitiesList } from './ActivitiesList';

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
      <Heading as='h2' mb={2}>
        <Center>Course:{currentCourse.name}</Center>
      </Heading>
      {/* Additional student-specific components */}
      <Grid templateColumns='repeat(7, 1fr)' gap={10}>
        <GridItem colSpan={1}>
          <ModuleList
            modules={currentCourse.modules}
            handleModuleClick={handleModuleClick}
            selectedModule={selectedModule}
          />
        </GridItem>
        <GridItem colSpan={6} bg='gray.50' borderRadius='lg' boxShadow='md'>
          <Box display='flex' justifyContent='center' flexDirection='column'>
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
