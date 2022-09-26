import { Box, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import FlowField from '../layout/p5js/flowfield/FlowField';

const DigitalSketches = () => {
  return (
    <>
      <Heading>NFT</Heading>
      <Flex flexDirection={{ base: 'column', xl: 'row', sm: 'column' }}>
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
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default DigitalSketches;
