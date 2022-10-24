import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import MyTextInput from '../../auth/MyTextInput';
import TextareaInput from './../forms/TextareaInput';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import { postAdded } from './postsSlice';

const AddPostForm = () => {
  const toast = useToast();
  const dispatch = useDispatch();

  const tastSuccess = () => {
    toast({
      title: 'Post added.',
      description: 'Your message has been sent',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const initialValues = {
    title: '',
    img: null,
    content: '',
    categories: [],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    img: Yup.mixed().required('Required'),
    email: Yup.string()
      .min(3, 'Too short!')
      .required('Required')
      .email('Invalid email'),
    message: Yup.string().min(10, 'Too short!').required('Required'),
  });

  const handleSubmit = () => {
        dispatch(postAdded());
   
  };

  return (
    <Flex maxW="full" overflow="hidden">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form>
            <MyTextInput label="Title" name="title" />
            <TextareaInput label="Content" name="content" />
            <Box>
              <Text>Image</Text>
              <Input type="file" />
            </Box>
            <Checkbox>Design</Checkbox>
            <Checkbox>Art</Checkbox>
            <Checkbox>Video</Checkbox>
            <Checkbox>Web</Checkbox>
            <Checkbox>Digital Art</Checkbox>
            <Checkbox>NFT</Checkbox>
            <Checkbox>Architecture</Checkbox>
            {errors.auth && (
              <Text color="red.300" fontSize="sm">
                {errors.auth}
              </Text>
            )}
            <Stack>
              <Button
                isLoading={isSubmitting}
                disable={!isValid || !dirty || isSubmitting}
                type="submit"
                colorScheme="teal"
              >
                Add
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default AddPostForm;
