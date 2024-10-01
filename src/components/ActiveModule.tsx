import { Box, Text, Divider } from '@chakra-ui/react';
import React from 'react';
import { IModule } from './StudentDashBoard';
import { ActivitiesList } from './ActivitiesList';

interface IActiveModuleProps {
  selectedModule: IModule;
}

// Funktion för att formatera datum till endast år, månad och dag
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Detta kommer att returnera datum i formatet "åååå-mm-dd" beroende på lokala inställningar
};

export const ActiveModule = ({ selectedModule }: IActiveModuleProps) => {
  return (
    <Box
      p={6}
      borderWidth='1px'
      borderRadius='lg'
      boxShadow='lg'
      bg='white'
      maxW='800px'
      margin='auto'
    >
      <Text fontSize='xl' fontWeight='bold' mb={2}>
        {selectedModule.name}
      </Text>
      <Text color='gray.600' mb={4}>
        {selectedModule.description}
      </Text>

      <Text>
        <Text as='span' fontWeight='bold'>
          Start Date:
        </Text>{' '}
        {formatDate(selectedModule.startDate)}{' '}
        {/* Använder formatDate-funktionen */}
      </Text>
      <Text mb={4}>
        <Text as='span' fontWeight='bold'>
          End Date:
        </Text>{' '}
        {formatDate(selectedModule.endDate)}{' '}
        {/* Använder formatDate-funktionen */}
      </Text>

      {/* Divider för att separera modulen från aktiviteterna */}
      <Divider my={4} />

      {/* Rendera aktiviteterna under den aktiva modulen */}
      {selectedModule.activities.length > 0 ? (
        <Box>
          <Text fontWeight='bold' mb={2}>
            Activities
          </Text>
          <ActivitiesList activities={selectedModule.activities} />
        </Box>
      ) : (
        <Text>No Activities found.</Text>
      )}
    </Box>
  );
};
