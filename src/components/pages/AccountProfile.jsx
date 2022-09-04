import { Box, Button, Container, Heading, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import MyTextInput from '../auth/MyTextInput';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AccountProfile = () => {
  const { currentUser } = useSelector(state => state.auth);

  const validationSchema = Yup.object({
    newPassword1: Yup.string()
      .min(3, 'Too short!')
      .required('Required')
      .matches(
        '^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$',
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
    newPassword2: Yup.string()
      .min(8, 'passwords must be at least 8 characters long')
      .max(30, 'Too long!')
      .required('Required')
      .oneOf([Yup.ref('newPassword1'), null], 'Password do not match'),
  });
  return (
    <Container>
      <Box my="1.5em">
        <Heading as="h1" size="lg">
          Account
        </Heading>
      </Box>
      {currentUser.providerId === 'password' &&
      <Box>
        <Heading as="h2" size="md" mb={3}>
          Change password
        </Heading>
        <Text>Use this form to change your password</Text>

        <Formik
          initialValues={{ newPassword1: '', newPassword2: '' }}
          validationSchema={validationSchema}
          onSubmit={values => {
            console.log(values);
          }}
        >
          {({ errors, isSubmitting, isValid, dirty }) => (
            <Form>
              <MyTextInput
                name="newPassword1"
                type="password"
                placeholder="New Password"
              />
              <MyTextInput
                name="newPassword1"
                type="password"
                placeholder="Confirm Password"
              />
              {errors.auth && (
                <label>
                  <Text color="red.300" fontSize="sm">
                    {errors.auth}
                  </Text>
                </label>
              )}
              <Button
                isLoading={isSubmitting}
                disable={!isValid || !dirty || isSubmitting}
                type="submit"
                colorScheme="teal"
                minWidth={2}
                my={4}
              >
                Update password
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
      }

{currentUser.providerId === 'facebook' &&
      <Box my={6}>
        
      
      
        <Heading as="h2" size="md" pb={3}>
          Facebook account
        </Heading>
        <Text>Please visit Facebook to update your account</Text>
        <Button
          leftIcon={<FaFacebook />}
          color="facebook"
          my={4}
          mr={4}
          as={Link}
          to="https://facebook.com"
          target="_blank"
        >
          Go to Facebook
        </Button>

        </Box>
        }
          <Box my={6}>
        <Heading as="h2" size="md" pb={3}>
          Google account
        </Heading>
        <Text>Please visit Google to update your account</Text>
        <Button
          leftIcon={<FaGoogle />}
          colorScheme="red"
          my={4}
          mr={4}
          as={Link}
          to="https://google.com"
          target="_blank"
        >
          Go to Google
        </Button>
      </Box>
    </Container>
  );
};

export default AccountProfile;
