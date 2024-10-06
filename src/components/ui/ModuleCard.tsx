import React from "react";
import { Box, Card, CardHeader, Text, Badge, VStack, Heading } from "@chakra-ui/react";
import { format } from "date-fns";
import { IModule } from "../../types/course";

interface ModulesCardProps {
  module: IModule;
  selectedModule: IModule | null;
  onClick: (module: IModule) => void;
}

const ModuleCard: React.FC<ModulesCardProps> = ({ module, selectedModule, onClick }) => {
  return (
    <Card
      key={module.id}
      cursor="pointer"
      onClick={() => onClick(module)}
      _hover={{ boxShadow: "2xl" }}
      width="250px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      position="relative"
      bg={selectedModule?.id === module.id ? "teal.100" : "white"}>
      <CardHeader>
        <VStack align="start" spacing={1}>
          <Heading size="md">{module.name}</Heading>
          <Text fontSize="sm" color="gray.500">
            Start Date: {format(new Date(module.startDate), "MMMM dd, yyyy")}
          </Text>
          <Text fontSize="sm" color="gray.500">
            End Date: {format(new Date(module.endDate), "MMMM dd, yyyy")}
          </Text>
        </VStack>
      </CardHeader>
      <Box p={4} pt={0} mb={2} flex="1" overflow="hidden">
        <Text noOfLines={3} overflow="hidden" textOverflow="ellipsis" mb={6}>
          {module.description}
        </Text>
        <Box position="absolute" bottom="4" left="4">
          <Badge colorScheme="teal">{module.activities.length} Activities</Badge>
        </Box>
      </Box>
    </Card>
  );
};

export default ModuleCard;
