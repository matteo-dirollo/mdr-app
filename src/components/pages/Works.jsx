import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import Projects from '../layout/articles/Projects';
import Videos from '../layout/videos/Videos';
import { TabTitle } from '../layout/routing/TabTitle';

const Works = () => {
  return (
    <>
    <TabTitle title='Work'/>
      <Flex flexDirection={{ base: 'column', xl: 'row', sm: 'column' }}>
        <Box marginX="auto" marginTop="10px">
          <Projects />
        </Box>
        <Box marginX="auto" minW="18em" my="0.8em">
          <Videos />
        </Box>
      </Flex>
    </>
  );
};

export default Works;
