import React from 'react';
import { useField } from 'formik';
import { FormControl, 
         FormLabel, 
         Input, 
         FormErrorMessage  } from '@chakra-ui/react';

export default function MyTextInput({errors, label, ...props}) {
    const [field, meta] = useField(props);
    return (
            
            <FormControl isInvalid={meta.touched && !!meta.error}>
                <FormLabel marginTop='12px'>{label}</FormLabel>
                <Input {...field} {...props} />
                {meta.touched && meta.error ? (
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                ) : null}
                
            </FormControl>
            
       
    )
}