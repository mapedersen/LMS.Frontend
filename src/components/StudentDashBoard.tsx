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
  activities: IActivity[];
}

export interface ICourse {
  id: number;
  name: string;
  description: string;
  startDate: string;
  modules: IModule[];
}

const course: ICourse = {
  id: 2,
  name: 'et',
  description: 'Et a atque illum.',
  startDate: '2024-04-29T02:22:28.7259108',
  modules: [
    {
      id: 11,
      name: 'incidunt',
      description: 'Sapiente dicta sit culpa fugiat aut enim.',
      startDate: '2024-04-29T02:22:28.7259108',
      endDate: '2024-05-20T02:22:28.7259108',
      courseId: 2,
      activities: [],
    },
    {
      id: 12,
      name: 'voluptate',
      description: 'Est corrupti reprehenderit eveniet accusamus sed.',
      startDate: '2024-05-21T02:22:28.7259108',
      endDate: '2024-06-09T02:22:28.7259108',
      courseId: 2,
      activities: [],
    },
    {
      id: 13,
      name: 'illum',
      description: 'Consequatur et ut labore et ipsa vero.',
      startDate: '2024-06-10T02:22:28.7259108',
      endDate: '2024-06-27T02:22:28.7259108',
      courseId: 2,
      activities: [],
    },
    {
      id: 14,
      name: 'aut',
      description: 'Aspernatur magnam dolore ut.',
      startDate: '2024-06-28T02:22:28.7259108',
      endDate: '2024-07-15T02:22:28.7259108',
      courseId: 2,
      activities: [],
    },
    {
      id: 15,
      name: 'laudantium',
      description: 'Non doloremque id aliquam est assumenda error.',
      startDate: '2024-07-16T02:22:28.7259108',
      endDate: '2024-08-02T02:22:28.7259108',
      courseId: 2,
      activities: [],
    },
    {
      id: 16,
      name: 'voluptatem',
      description: 'Esse esse neque et qui et et.',
      startDate: '2024-08-03T02:22:28.7259108',
      endDate: '2024-08-11T02:22:28.7259108',
      courseId: 2,
      activities: [
        {
          id: 4,
          name: 'Quibusdam voluptatem.',
          description:
            'Qui numquam voluptas sint. Quia molestias quidem qui unde architecto non maxime vel iusto. Sed magnam molestiae sed. Repudiandae ut nam consequatur quod voluptatibus dolores sunt quo adipisci. Consequatur occaecati magnam rerum numquam incidunt voluptatem. Sint dignissimos ipsam.',
          details: null,
          typeId: 4,
          type: {
            id: 4,
            name: 'Incredible Metal Hat',
          },
          startDate: '2024-01-01T05:33:24.0866266',
          endDate: '2025-05-30T15:53:16.2448733',
          moduleId: 16,
        },
      ],
    },
    {
      id: 17,
      name: 'vero',
      description: 'Repellat at dolores est dolore et quia qui non.',
      startDate: '2024-08-12T02:22:28.7259108',
      endDate: '2024-08-28T02:22:28.7259108',
      courseId: 2,
      activities: [
        {
          id: 14,
          name: 'Et quod.',
          description:
            'Voluptas blanditiis nam dolore corrupti qui omnis perferendis id. Quia in non consequatur nihil. Alias fuga ut molestiae ex suscipit dicta soluta. Qui odio placeat molestias cum necessitatibus.',
          details: null,
          typeId: 1,
          type: {
            id: 1,
            name: 'Unbranded Rubber Pizza',
          },
          startDate: '2024-01-31T00:01:39.7552909',
          endDate: '2025-09-09T17:37:41.4886823',
          moduleId: 17,
        },
      ],
    },
    {
      id: 18,
      name: 'nostrum',
      description: 'Tempore sed ut qui similique.',
      startDate: '2024-08-29T02:22:28.7259108',
      endDate: '2024-09-21T02:22:28.7259108',
      courseId: 2,
      activities: [],
    },
    {
      id: 19,
      name: 'distinctio',
      description:
        'Dolorem doloribus et eaque praesentium enim natus illum sunt.',
      startDate: '2024-09-22T02:22:28.7259108',
      endDate: '2024-10-06T02:22:28.7259108',
      courseId: 2,
      activities: [],
    },
    {
      id: 20,
      name: 'blanditiis',
      description:
        'Odio est voluptatum similique voluptatem natus corporis expedita sint itaque.',
      startDate: '2024-10-07T02:22:28.7259108',
      endDate: '2024-10-31T02:22:28.7259108',
      courseId: 2,
      activities: [],
    },
  ],
};

const StudentDashboard = () => {
  const { user, course } = useAuth();
  console.log(user, course);

  return (
    <Box p={5} w='100%'>
      <Heading as='h2'>Course:</Heading>
      {/* Additional student-specific components */}
      <Grid templateColumns='repeat(7, 1fr)' gap={6}>
        <GridItem colSpan={2} bg='blue.500'>
          <Text>All Modules</Text>
          <List>
            {/* {course.modules.map((module) => (
              <ModuleListItem module={module} />
            ))} */}
          </List>
        </GridItem>
        <GridItem colSpan={5} bg='red.500'>
          <Box>
            <Text>Aktiv module</Text>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default StudentDashboard;
