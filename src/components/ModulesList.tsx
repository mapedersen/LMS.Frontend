import { List, ListItem, Text } from "@chakra-ui/react";
import { IActivity } from "./StudentDashBoard";
import { parseISO, isAfter } from "date-fns";
import { useState } from "react";
import { ExpiredModuleCard, ModuleCard, ToggleButton } from ".";

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
                <ModuleCard
                  module={module}
                  isSelected={selectedModule?.id === module.id}
                />
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
        <List spacing={4} mt={4}>
          {expiredModules.map((module) => (
            <ListItem
              key={module.id}
              onClick={() => handleModuleClick(module)}
              cursor="not-allowed"
            >
              <ExpiredModuleCard key={module.id} module={module} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};
