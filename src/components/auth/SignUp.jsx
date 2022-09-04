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
  Divider
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/reducers/modalReducer';
import { auth } from '../../apis/firestore/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import SocialLogin from './SocialLogin';

// import { registerFirebase } from '../../apis/firestore/firebaseService';

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

  const handleRegister = async (values, { setSubmitting, setErrors }) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      setSubmitting(false);
      onClose();
      dispatch(closeModal());
    } catch (error) {
      // if (error.code === "auth/") {
      //   setErrors(error.code, "You already have an account with these credentials");
      // }
      // else {
      //   setErrors(error.message);
      // }
      setSubmitting(false);
      // const errorCode = error.code;
      // const errorMessage = error.message;
      setErrors({ auth: 'You already have an account with these credentials' });
      //Firebase: Error (auth/email-already-in-use).
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
              Register to get full access or login <br /> if you already have an
              account ✌️
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
              {({ isSubmitting, isValid, dirty, errors }) => (
                <Form>
                  <MyTextInput
                    label="Email"
                    name="email"
                    placeholder="example@xzy.com"
                    errors={errors}
                  />

                  <MyTextInput
                    label="Password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    errors={errors}
                  />
                  {errors.auth && (
                    <label>
                      <Text color="red.300" fontSize="sm">
                        {errors.auth}
                      </Text>
                    </label>
                  )}
                  <br />
                  <Stack>
                    <Button
                      isLoading={isSubmitting}
                      disable={!isValid || !dirty || isSubmitting}
                      type="submit"
                      colorScheme="teal"
                      width='100%'
                    >
                      Sign Up
                    </Button>
                    <Divider my="1em" orientation="horizontal" />
                    <SocialLogin />
                    </Stack>
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
