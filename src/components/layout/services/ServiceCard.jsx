import { Box, Text } from '@chakra-ui/react';
import React from 'react';

const ServiceCard = ({title, description}) => {
    return (
        <Box
      maxW="sm"
      // borderWidth="1px"
      // borderRadius="lg"
      p={6}
      m={4}
      // boxShadow="lg"
      width="300px"
    >
      <Text as="h3" fontSize="2xl" fontWeight="600" mb={4}>
        {title}
      </Text>
      <Text>{description}</Text>
    </Box>
    );
}

export default ServiceCard;
