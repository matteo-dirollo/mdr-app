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
import { signInWithEmail } from '../../apis/firestore/firebaseService';
import SocialLogin from './SocialLogin';

export default function SignIn({ onClose, onOpen }) {
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
      //  '^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$',
      .matches(
        '^(?=.*[a-z]).{8,}$',
        'Must contain 8 characters and at least one number'
      ),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await signInWithEmail(values);
      setSubmitting(false);
      onClose();
      dispatch(closeModal());
    } catch (error) {
      setSubmitting(false);
      setErrors({ auth: error });
    }
  };

  return (
    <React.Fragment>
      <Flex
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={6} mx={'auto'} maxW={'lg'} py={3} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Hi there !
            </Heading>
            <Text fontSize={'sm'} color={'gray.600'} textAlign="center">
              Login to get full access or register <br /> if you haven't done it
              yet ✌️
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
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, isValid, dirty, errors }) => (
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
                      Sign In
                    </Button>
                    <Divider my="1em" orientation="horizontal" />
                    <SocialLogin />
                    </Stack>
                   
                
                 
                </Form>
              )}
            </Formik>
            <Stack pt={6}>
              <Text align={'center'}>
                Not registered?{' '}
                <Link
                  onClick={() => {
                    onOpen();
                    onClose();
                  }}
                  color={'blue.400'}
                >
                  Sign Up
                </Link>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </React.Fragment>
  );
}
