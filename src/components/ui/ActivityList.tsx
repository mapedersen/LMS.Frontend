import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";

interface Activity {
  id: string;
  title: string;
  dueDate: string;
}

const ActivityList: React.FC<{ activities: Activity[] }> = ({ activities }) => {
  return (
    <Box p={4}>
      <Heading as="h2" size="md" mb={4}>
        Activities
      </Heading>
      <List spacing={3}>
        {activities.map((activity) => (
          <ListItem key={activity.id} bg="gray.100" p={3} borderRadius="md">
            <Text>{activity.title}</Text>
            <Text fontSize="sm" color="gray.600">
              Due: {activity.dueDate}
            </Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ActivityList;
