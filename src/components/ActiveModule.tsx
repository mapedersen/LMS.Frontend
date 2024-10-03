import { Box, Text, Divider } from "@chakra-ui/react";
import { IModule } from "./StudentDashboard";
import { ActivitiesList } from "./ActivitiesList";

interface IActiveModuleProps {
  selectedModule: IModule;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

export const ActiveModule = ({ selectedModule }: IActiveModuleProps) => {
  return (
    <Box
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
      maxW="800px"
      margin="auto">
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        {selectedModule.name}
      </Text>
      <Text color="gray.600" mb={4}>
        {selectedModule.description}
      </Text>
      <Text>
        <Text as="span" fontWeight="bold">
          Start Date:
        </Text>{" "}
        {formatDate(selectedModule.startDate)}{" "}
      </Text>
      <Text mb={4}>
        <Text as="span" fontWeight="bold">
          End Date:
        </Text>{" "}
        {formatDate(selectedModule.endDate)}{" "}
      </Text>
      <Divider my={4} />
      {selectedModule.activities.length > 0 ? (
        <Box>
          <Text fontWeight="bold" mb={2}>
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
