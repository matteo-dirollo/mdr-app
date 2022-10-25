import React from 'react';
import { Field, useField } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react';

export default function MyTextInput({ errors, label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <FormLabel marginTop="12px" color={useColorModeValue('gray.700', 'gray.100')}>
        {label}
      </FormLabel>
      <Field type='checkbox' {...field} {...props} />
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
}
