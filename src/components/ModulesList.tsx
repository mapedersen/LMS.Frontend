import { List, ListItem, Box, Text, Flex, Badge } from "@chakra-ui/react";
import { IActivity } from "../types/course";

interface IModule {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  courseId: number;
  activities: IActivity[];
}

interface IModuleListProps {
  modules: IModule[];
  handleModuleClick: (module: IModule) => void;
  selectedModule: IModule | null;
}

export const ModuleList = ({ modules, handleModuleClick, selectedModule }: IModuleListProps) => {
  if (!modules || modules.length === 0) {
    return <Text>No modules available</Text>;
  }

  return (
    <List spacing={4}>
      {modules.map((module) => (
        <ListItem key={module.id} onClick={() => handleModuleClick(module)} cursor="pointer">
          <Box
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            bg={selectedModule?.id === module.id ? "blue.50" : "white"}
            _hover={{
              backgroundColor: "gray.100",
            }}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="lg">{module.name}</Text> {/* Ingen ändring till bold */}
              <Badge colorScheme="blue">{module.activities.length} Activities</Badge>
            </Flex>
            <Text fontSize="sm" color="gray.500">
              {module.description}
            </Text>
            <Text fontSize="sm" mt={2}>
              <Text as="span" fontWeight="bold">
                Start Date:
              </Text>{" "}
              {module.startDate}
            </Text>
            <Text fontSize="sm">
              <Text as="span" fontWeight="bold">
                End Date:
              </Text>{" "}
              {module.endDate}
            </Text>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};
