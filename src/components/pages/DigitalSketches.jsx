import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import FlowField from '../layout/p5js/flowfield/FlowField';

const DigitalSketches = () => {
  return (
    <Box  w='90%' margin="auto">
      <Heading mt="1em">Under construction ⚠️</Heading>
      <Text m="auto" mt="2em">This page will be available soon</Text>
      <Text m="auto" mb="2em"></Text>
      <Flex  flexDirection={{ base: 'column', xl: 'row', sm: 'column' }}>
        <Box margin="auto">
          <Flex
            flexGrow="1"
            flexWrap="wrap"
            marginX="auto"
            spacing={{ base: '25px', '2xl': '25px', xl: '3', md: '3', sm: '3' }}
            justifySelf="stretch"
            justify="space-evenly"
          >
            <Box m={3}>
              <FlowField />
            </Box>
            <Box m={3}>
              <FlowField />
            </Box>
            <Box m={3}>
              <FlowField />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default DigitalSketches;
