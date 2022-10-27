import React from 'react';
import { Box, Button, Flex, Stack, useToast } from '@chakra-ui/react';
import { CheckboxContainer, CheckboxControl } from 'formik-chakra-ui';
import { Form, Formik } from 'formik';

import * as Yup from 'yup';
import MyTextInput from '../../auth/MyTextInput';
import FileUploadInput from '../forms/FileUploadInput';
import SimpleEditor from '../forms/richText/SimpleEditor';

const AddPostForm = () => {
  const toast = useToast();

  const toastSuccess = () => {
    toast({
      title: 'Post added.',
      description: 'You can see it in the blog',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const initialValues = {
    title: '',
    img: [],
    editor: '',
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
    toastSuccess();
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
            <Box>
              <MyTextInput label="Title" name="title" />
            </Box>
            <Box>
              <SimpleEditor/>
            </Box>
            <Box>
              <FileUploadInput
                setFieldValue={setFieldValue}
                name="img"
                label="Image"
              />
            </Box>

            <CheckboxContainer name="tags" label="Tags">
              <CheckboxControl name="tags" value="Design">
                Design
              </CheckboxControl>
              <CheckboxControl name="tags" value="Art">
                Art
              </CheckboxControl>
              <CheckboxControl name="tags" value="Video">
                Video
              </CheckboxControl>
              <CheckboxControl name="tags" value="Web">
                Web
              </CheckboxControl>
              <CheckboxControl name="tags" value="Digital Art">
                Digital Art
              </CheckboxControl>
              <CheckboxControl name="tags" value="3D">
                3D
              </CheckboxControl>
              <CheckboxControl name="tags" value="Architecture">
                Architecture
              </CheckboxControl>
              <CheckboxControl name="tags" value="Product Design">
                Product Design
              </CheckboxControl>
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
