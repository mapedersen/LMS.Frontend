import { Box, Heading } from "@chakra-ui/react";

const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Box bg="primary.600" p={4} color="white">
      <Heading as="h1" size="lg">
        {title}
      </Heading>
    </Box>
  );
};

export default Header;
