import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import Blog from '../layout/Articles/Blog';
import Videos from '../layout/videos/Videos';

const Works = () => {
  return (
    <Flex flexDirection={{ base: 'column', xl: 'row', sm: 'column' }}>
      <Box marginX='auto' marginTop="10px">
        <Blog />
      </Box>
      <Box marginX='auto' minW="18em">
        <Videos />
      </Box>
    </Flex>
  );
};

export default Works;
