import React from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { signOutFirebase } from './authSlice';
import { useDispatch } from 'react-redux';

const SignOut = ({ setAuthenticated }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleSignOut() {
    try {
      await dispatch(signOutFirebase());
      navigate('/');
      window.location.reload();
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
