import React from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { signOutFirebase } from '../../apis/firestore/firebaseService';

const SignOut = ({ setAuthenticated }) => {
  const navigate = useNavigate();
  async function handleSignOut() {
    try {
      navigate('/');
      await signOutFirebase();
    } catch (error) {
      throw error;
    }
  }

  return (
    <Button colorScheme="teal" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};

export default SignOut;
