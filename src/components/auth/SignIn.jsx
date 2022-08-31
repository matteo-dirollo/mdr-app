import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import MyTextInput from './MyTextInput';
import SignUp from './SignUp';
import {
  Button,
  Flex,
  Stack,
  Heading,
  Text,
  Box,
  Link,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/reducers/modalReducer';
import { signInUser } from '../../store/actions/authActions';
import ModalWindow from '../layout/modal/ModalWindow';

export default function LoginForm() {
  const [ register, setRegister ] = useState(false);
  const dispatch = useDispatch();
  const { onClose } = useDisclosure();

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

  const onClickLogin = () => {
    setRegister(false);
  };

  const onClickSignUp = () => {
    setRegister(true);
  };

  const handleSubmit = async (values, { setSubmitting }) => {    
    try {
      setSubmitting(false);
      onClose();
      dispatch(closeModal());
      signInUser(values);
    } catch (error) {
      setSubmitting(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('An error occured: ', errorCode, errorMessage);
    }
  };

  return (
    <React.Fragment>
      
      <ModalWindow name='Login'>
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
                    {register ? (
                      <SignUp
                        isLoading={isSubmitting}
                        disable={!isValid || !dirty || isSubmitting}
                        type="submit"
                      />
                    ) : (
                      <Button
                        isLoading={isSubmitting}
                        disable={!isValid || !dirty || isSubmitting}
                        type="submit"
                        colorScheme="teal"
                      >
                        Login
                      </Button>
                    )}
                  </Form>
                )}
              </Formik>
              <Stack pt={6}>
                {register ? (
                  <Text align={'center'}>
                    Already a user?{' '}
                    <Link onClick={onClickLogin} color={'blue.400'}>
                      Login
                    </Link>
                  </Text>
                ) : (
                  <Text align={'center'}>
                    Not registered?{' '}
                    <Link onClick={onClickSignUp} color={'blue.400'}>
                      Sign Up
                    </Link>
                  </Text>
                )}
              </Stack>
            </Box>
          </Stack>
        </Flex>
        </ModalWindow>
      </React.Fragment>
  );
}
