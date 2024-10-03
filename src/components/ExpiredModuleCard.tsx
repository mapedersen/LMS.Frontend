import { Box, Text, Flex, Badge } from "@chakra-ui/react";
import { IModule } from "../types/course";

interface ExpiredModuleCardProps {
  module: IModule;
}

export const ExpiredModuleCard = ({ module }: ExpiredModuleCardProps) => {
  return (
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
      cursor="not-allowed">
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
  );
};
