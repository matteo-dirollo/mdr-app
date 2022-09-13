import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import UsersDashboard from '../layout/dashboard/UsersDashboard';
import UserProfile from '../layout/profile/UserProfile';

const Sandbox = () => {
  return (
    <Box pt="3em">
      <Text textAlign="center">Sandbox</Text>
      <Box w="100%">
        <UserProfile />
      </Box>
      <Box>
        <UsersDashboard />
      </Box>
    </Box>
  );
};

export default Sandbox;
