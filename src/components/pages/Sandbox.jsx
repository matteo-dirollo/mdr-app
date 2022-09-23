import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import UserProfile from '../layout/profile/UserProfile';
import { TabTitle } from '../layout/routing/TabTitle';

const Sandbox = () => {
  return (
    <>
      <TabTitle title='Sandbox' />
      <Box pt="3em">
        <Text textAlign="center">Sandbox</Text>
        <Box w="100%">
          <UserProfile />
        </Box>
      </Box>
    </>
  );
};

export default Sandbox;
