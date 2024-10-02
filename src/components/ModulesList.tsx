import {
  List,
  ListItem,
  Box,
  Text,
  Flex,
  Badge,
  Button,
  Collapse,
} from "@chakra-ui/react";
import { IActivity } from "./StudentDashBoard";
import { parseISO, isAfter } from "date-fns";
import { useState } from "react";

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

export const ModuleList = ({
  modules,
  handleModuleClick,
  selectedModule,
}: IModuleListProps) => {
  const [showExpired, setShowExpired] = useState(false);
  const today = new Date();

  const activeModules = modules.filter((module) =>
    isAfter(parseISO(module.endDate), today)
  );

  const expiredModules = modules.filter(
    (module) => !isAfter(parseISO(module.endDate), today)
  );

  if (!modules || modules.length === 0) {
    return <Text>No modules available</Text>;
  }

  return (
    <>
      <Button
        w={24}
        mt={4}
        onClick={() => setShowExpired(!showExpired)}
        colorScheme="blue"
      >
        {showExpired ? "Show Active Modules" : "Show Expired Modules"}
      </Button>

      <List spacing={4} mt={4}>
        {/* Show active modules*/}
        {!showExpired &&
          activeModules.map((module) => (
            <ListItem
              key={module.id}
              onClick={() => handleModuleClick(module)}
              cursor="pointer"
            >
              <Box
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                maxW={"320px"}
                minW={"320px"}
                bg={selectedModule?.id === module.id ? "blue.50" : "white"}
                _hover={{
                  backgroundColor: "gray.100",
                }}
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Text fontSize="lg">{module.name}</Text>{" "}
                  <Badge colorScheme="blue">
                    {module.activities.length} Activities
                  </Badge>
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

        {/* Show expired modules*/}
        {showExpired &&
          expiredModules.map((module) => (
            <ListItem key={module.id} onClick={() => handleModuleClick(module)}>
              <Box
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                bg="gray.100"
                _hover={{
                  backgroundColor: "gray.200",
                }}
                maxW={"320px"}
                minW={"320px"}
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Text fontSize="lg">{module.name}</Text>
                  <Badge colorScheme="red">Expired</Badge>
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
    </>
  );
};
