import React from 'react';
import { useField } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react';

export default function TextareaInput({ errors, label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <FormLabel marginTop="12px">{label}</FormLabel>
      <Textarea
        borderColor="gray.300"
        _hover={{
          borderRadius: 'gray.300',
        }}
        placeholder="message"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
}
