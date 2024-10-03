import { Box, Text, Flex, Badge } from "@chakra-ui/react";
import { IModule } from "../types/course";

interface ModuleCardProps {
  module: IModule;
  isSelected: boolean;
}

export const ModuleCard = ({ module, isSelected }: ModuleCardProps) => {
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      bg={isSelected ? "blue.50" : "white"}
      _hover={{
        backgroundColor: "gray.100",
      }}
      maxW="320px"
      minW="320px"
      minH="150px"
      cursor="pointer">
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="lg">{module.name}</Text>
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
  );
};
