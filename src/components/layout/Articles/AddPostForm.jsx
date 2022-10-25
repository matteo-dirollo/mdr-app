import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { CheckboxContainer, CheckboxControl } from 'formik-chakra-ui';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import MyTextInput from '../../auth/MyTextInput';
import RichTextEditor from '../forms/RichTextEditor';
import { useDispatch } from 'react-redux';
import { EditorState } from 'draft-js';
import { nanoid } from '@reduxjs/toolkit';

import { postAdded } from './postsSlice';
import FileUploadInput from '../forms/FileUploadInput';

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
    img: [],
    editorState: EditorState.createEmpty(),
    tags: [],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    // img: Yup.mixed().required('Required'),
    tags: Yup.array().min(1),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // dispatch(postAdded());
    console.log(values);
    resetForm();
    setSubmitting(false);
  };

  return (
    <Flex maxW="full" overflow="hidden">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          isSubmitting,
          isValid,
          dirty,
          setFieldValue,
          handleBlur,
          handleReset,
          errors,
        }) => (
          <Form>
            <MyTextInput label="Title" name="title" />

            <Text fontSize="md">Text</Text>

            <RichTextEditor
              editorState={values.editorState}
              onChange={setFieldValue}
              onBlur={handleBlur}
            />

            <FileUploadInput setFieldValue={setFieldValue} name="img" label="Image" />

            <CheckboxContainer name="tags" label="Tags">
              <CheckboxControl name="tags" value="Design">Design</CheckboxControl>
              <CheckboxControl name="tags" value="Art">Art</CheckboxControl>
              <CheckboxControl name="tags" value="Video">Video</CheckboxControl>
              <CheckboxControl name="tags" value="Web">Web</CheckboxControl>
              <CheckboxControl name="tags" value="Digital Art">Digital Art</CheckboxControl>
              <CheckboxControl name="tags" value="3D">3D</CheckboxControl>
              <CheckboxControl name="tags" value="Architecture">Architecture</CheckboxControl>
              <CheckboxControl name="tags" value="Product Design">Product Design</CheckboxControl>
            </CheckboxContainer>

            <Stack>
              <Button onClick={handleReset} colorScheme="gray">
                Reset
              </Button>
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
