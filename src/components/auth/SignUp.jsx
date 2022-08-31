import { Button } from '@chakra-ui/react';
import React from 'react';

const SignUp = ({ isLoading, disable, type }) => {
  return (
    <Button
      isLoading={isLoading}
      disable={disable}
      type={type}
      colorScheme="pink"
    >
      Sign Up
    </Button>
  );
};

export default SignUp;
