import React from 'react';
import { Box, Text, Center } from '@chakra-ui/react';
import SignIn from '../auth/SignIn';
// import ModalButton from '../layout/modal/ModalButton';

const Sandbox = () => {
    return (
        <Box>
        <Text textAlign='center'>
            Sandbox
        </Text>
        <Center>
                <SignIn />
        </Center>
    
        </Box>


    );
}

export default Sandbox;
