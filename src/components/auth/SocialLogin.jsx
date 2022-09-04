import React from 'react';
import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/reducers/modalReducer';
import { socialLogin } from '../../apis/firestore/firebaseService';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

const SocialLogin = () => {
  const dispatch = useDispatch();
  function handleSocialLogin(provider) {
    dispatch(closeModal());
    socialLogin(provider);
  }
  return (
    <>
      <Button
        onClick={() => handleSocialLogin('google')}
        leftIcon={<FaGoogle />}
        colorScheme="red"
        minW="100%"
        size="md"
      >
        Login with Google
      </Button>
      <Button
        onClick={() => handleSocialLogin('facebook')}
        leftIcon={<FaFacebook />}
        marginTop="0.4em"
        colorScheme="facebook"
        width="100%"
        size="md"
      >
        Login with Facebook
      </Button>
    </>
  );
};

export default SocialLogin;
