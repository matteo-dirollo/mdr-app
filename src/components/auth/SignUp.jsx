import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import MyTextInput from './MyTextInput';
import {
  Button,
  Flex,
  Stack,
  Heading,
  Text,
  Box,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/reducers/modalReducer';

import { registerFirebase } from '../../apis/firestore/firebaseService';

export default function SignUp({ onClose, onOpen }) {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .min(3, 'Too short!')
      .required('Required')
      .email('Invalid email'),
    password: Yup.string()
      .min(8, 'passwords must be at least 8 characters long')
      .max(30, 'Too long!')
      .required('Required')
      .matches(
        '^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$',
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
  });

  const handleRegister = (values, { setSubmitting }) => {
    try {
      registerFirebase(values);
      setSubmitting(false);
      onClose();
      dispatch(closeModal());
    } catch (error) {
      setSubmitting(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error ocured: ', errorCode, errorMessage);
    }
  };

  return (
    <React.Fragment>
      <Flex
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={6} mx={'auto'} maxW={'lg'} py={6} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Hi there !
            </Heading>
            <Text fontSize={'sm'} color={'gray.600'} textAlign="center">
                Register to get full access or login <br /> if you already have an account ✌️
              </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={10}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              {({ isSubmitting, isValid, dirty }) => (
                <Form>
                  <MyTextInput
                    label="Email"
                    name="email"
                    placeholder="example@xzy.com"
                  />

                  <MyTextInput
                    label="Password"
                    name="password"
                    placeholder="Password"
                    type="password"
                  />
                  <br />
                  <Button
                    isLoading={isSubmitting}
                    disable={!isValid || !dirty || isSubmitting}
                    type="submit"
                    colorScheme="teal"
                  >
                    Sign Up
                  </Button>
                </Form>
              )}
            </Formik>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user?{' '}
                <Link
                  onClick={() => {
                    onOpen();
                    onClose();
                  }}
                  color={'blue.400'}
                >
                  Sign In
                </Link>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </React.Fragment>
  );
}
