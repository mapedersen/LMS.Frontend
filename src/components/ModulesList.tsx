import { List, ListItem, Box, Text, Flex, Badge } from "@chakra-ui/react";
import { IActivity } from "./StudentDashBoard";
import { parseISO, isAfter } from "date-fns";
import { useState } from "react";
import { ToggleButton } from ".";

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
  const [showAllActive, setShowAllActive] = useState(false);
  const [viewActiveModules, setViewActiveModules] = useState(true);
  const today = new Date();

  const activeModules = modules.filter((module) =>
    isAfter(parseISO(module.endDate), today)
  );

  const expiredModules = modules.filter(
    (module) => !isAfter(parseISO(module.endDate), today)
  );

  const activeModulesToShow = showAllActive
    ? activeModules
    : activeModules.slice(0, 3);

  const hiddenActiveModulesCount =
    activeModules.length - activeModulesToShow.length;

  if (!modules || modules.length === 0) {
    return <Text>No modules available</Text>;
  }

  return (
    <>
      <ToggleButton
        isToggled={viewActiveModules}
        onToggle={() => setViewActiveModules(!viewActiveModules)}
        activeLabel="Show Expired Modules"
        inactiveLabel="Show Active Modules"
      />

      {viewActiveModules ? (
        <>
          <List spacing={4} mt={4}>
            {activeModulesToShow.map((module) => (
              <ListItem
                key={module.id}
                onClick={() => handleModuleClick(module)}
                cursor="pointer"
              >
                <Box
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  bg={selectedModule?.id === module.id ? "blue.50" : "white"}
                  _hover={{
                    backgroundColor: "gray.100",
                  }}
                  maxW="320px"
                  minW="320px"
                  minH="150px"
                >
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text fontSize="lg">{module.name}</Text>
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
          </List>

          {activeModules.length > 3 && (
            <ToggleButton
              isToggled={showAllActive}
              onToggle={() => setShowAllActive(!showAllActive)}
              activeLabel="Show fewer modules"
              inactiveLabel={`Show ${hiddenActiveModulesCount} more active module${
                hiddenActiveModulesCount > 1 ? "s" : ""
              }`}
            />
          )}
        </>
      ) : (
        <>
          <List spacing={4} mt={4}>
            {expiredModules.map((module) => (
              <ListItem
                key={module.id}
                onClick={() => handleModuleClick(module)}
                cursor="not-allowed"
              >
                <Box
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  bg="gray.100"
                  _hover={{
                    backgroundColor: "gray.200",
                  }}
                  opacity={0.6}
                  maxW="320px"
                  minW="320px"
                  minH="150px"
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
      )}
    </>
  );
};
