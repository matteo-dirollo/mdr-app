import React from 'react';
import { useField } from 'formik';
import { FiFile } from 'react-icons/fi';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Icon,
} from '@chakra-ui/react';

export default function FileUploadInput({
  isValid,
  setFieldValue,
  label,
  ...props
}) {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={isValid} isRequired>
      <FormLabel
        marginTop="12px"
        color={useColorModeValue('gray.700', 'gray.100')}
      >
        {label}
      </FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FiFile} />
        </InputLeftElement>
        <Input
          {...field}
          {...props}

          type="file"
          sx={{
            '::file-selector-button': {
              height: 10,
              padding: 0,
              mr: 4,
              background: 'none',
              border: 'none',
              fontWeight: 'bold',
            },
          }}
        />
      </InputGroup>
      {meta.error ? <FormErrorMessage>{meta.error}</FormErrorMessage> : null}
    </FormControl>
  );
}
