import { Box, Flex, Text } from '@chakra-ui/react';
import { IActivity } from './StudentDashBoard';

// Funktion för att beräkna antalet dagar mellan två datum
const calculateDaysDifference = (startDate: string) => {
  const today = new Date();
  const start = new Date(startDate);

  // Beräkna skillnaden i tid (millisekunder) och sedan omvandla till dagar
  const differenceInTime = start.getTime() - today.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Omvandla millisekunder till dagar

  return differenceInDays;
};

// Funktion som returnerar text baserat på antalet dagar till start eller om aktiviteten är avslutad
const getDaysUntilStartOrCompletion = (
  startDate: string,
  endDate: string
): string => {
  const daysUntilStart = calculateDaysDifference(startDate);
  const today = new Date();
  const end = new Date(endDate);

  // Kontrollera om aktiviteten redan har avslutats
  if (today > end) {
    return 'Completed'; // Om slutdatumet har passerat
  }

  // Kontrollera om startdatum är idag eller i framtiden
  if (daysUntilStart === 0) {
    return 'Today';
  } else if (daysUntilStart === 1) {
    return 'Tomorrow';
  } else if (daysUntilStart > 1) {
    return `${daysUntilStart} days left`;
  } else {
    return 'Already started'; // Om aktiviteten har börjat men inte är avslutad
  }
};

// Funktion för att kontrollera om startdatum är samma som idag
const isToday = (startDate: string): boolean => {
  const today = new Date();
  const start = new Date(startDate);

  // Jämför år, månad och dag för att avgöra om det är idag
  return (
    today.getFullYear() === start.getFullYear() &&
    today.getMonth() === start.getMonth() &&
    today.getDate() === start.getDate()
  );
};

export const ActivitiesList = ({ activities }: { activities: IActivity[] }) => {
  if (activities.length === 0) return <Text>No Activities found.</Text>;

  return (
    <Box>
      {activities.map((activity) => {
        // Behåll den befintliga statuslogiken
        const status = getDaysUntilStartOrCompletion(
          activity.startDate,
          activity.endDate
        );

        return (
          <Box
            key={activity.id}
            p={4}
            mb={3}
            borderWidth='1px'
            borderRadius='md'
            bg='gray.50'
          >
            <Flex justifyContent='space-between' alignItems='center'>
              {/* Aktivitetens namn */}
              <Text fontWeight='bold'>{activity.name}</Text>

              {/* Typens namn, mindre och till höger */}
              <Text fontSize='xs' color='gray.500'>
                {activity.type.name} {/* Typen längst till höger och mindre */}
              </Text>
            </Flex>

            <Text mb={1}>{activity.description}</Text>

            {/* Här visar vi status eller hur många dagar det är kvar till start */}
            <Text
              fontSize='sm'
              color={isToday(activity.startDate) ? 'red.500' : 'black'} // Sätter röd färg om aktiviteten är idag
            >
              <Text as='span' fontWeight='bold'>
                Status:
              </Text>{' '}
              {status}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
};
