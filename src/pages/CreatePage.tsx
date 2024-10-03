import CreateCourse from '../components/AddCourse';
import AddModule from '../components/AddModule';
import { Box, Heading } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const CreatePage = () => {
  const { type } = useParams<{ type: 'course' | 'module' }>();

  return (
    <Box p={5}>
      <Heading mb={4}>
        {type === 'course' ? 'Create Course' : 'Create Module'}
      </Heading>
      {type === 'course' ? <CreateCourse /> : <AddModule />}
    </Box>
  );
};

export default CreatePage;
