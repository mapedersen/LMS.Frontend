import React from "react";
import { Box, Card, CardHeader, Text, Heading } from "@chakra-ui/react";
import { format } from "date-fns";
import { IActivity } from "../../types/course";

interface ActivityCardProps {
  activity: IActivity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  console.log(activity);

  return (
    <Card
      key={activity.id}
      _hover={{ boxShadow: "2xl" }}
      width="250px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      position="relative">
      <CardHeader>
        <Heading size="md">{activity.name}</Heading>
        <Text fontSize="sm" color="gray.500">
          Due Date: {format(new Date(activity.endDate), "MMMM dd, yyyy")}
        </Text>
      </CardHeader>
      <Box p={4} flex="1" overflow="hidden" pt="0px">
        <Text noOfLines={2} overflow="hidden" textOverflow="ellipsis">
          {activity.description}
        </Text>
      </Box>
    </Card>
  );
};

export default ActivityCard;
