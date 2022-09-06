import React from 'react';
import { Center, Spinner } from '@chakra-ui/react';

const LoadingSpinner = () => {
  return (
    <Center>
      <Spinner thickness="4px" speed="0.65s" color="blue.500" size="xl" />
    </Center>
  );
};

export default LoadingSpinner;
