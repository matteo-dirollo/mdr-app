import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../auth/MyTextInput';
import { Button, Stack, Text } from '@chakra-ui/react';
import TextareaInput from './TextareaInput';

export default function SimpleForm() {
  const initialValues = {
    name: '',
    email: '',
    message: '',
  };
  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Too short!').required('Required'),
    email: Yup.string()
      .min(3, 'Too short!')
      .required('Required')
      .email('Invalid email'),
    message: Yup.string().min(10, 'Too short!').required('Required'),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log(values);
      }}
    >
      {({ isSubmitting, isValid, dirty, errors }) => (
        <Form>
          <MyTextInput
            label="Name"
            name="name"
          />
          <MyTextInput
            label="Email"
            name="email"
            placeholder="example@xzy.com"
          />
          <TextareaInput label="Message" name="message" />

          {errors.auth && (
            <Text color="red.300" fontSize="sm">
              {errors.auth}
            </Text>
          )}
          <br />

          <Stack>
            <Button
              isLoading={isSubmitting}
              disable={!isValid || !dirty || isSubmitting}
              type="submit"
              colorScheme="teal"
            >
              Sign In
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
