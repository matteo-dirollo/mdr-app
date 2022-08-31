import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flex, 
         Center, 
         Text, 
         Button } from '@chakra-ui/react';


function PageNotFound() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Flex width={"98vw"} height={"86vh"} alignContent={"center"} justifyContent={"center"} flexDirection='column' >
        <Center color='white'>
            <Text fontSize='3xl'>Ooops!
            <br/>
            The page you're looking for doesn't exist.
            </Text>
        </Center>
        
        <Center color='white'>
        <Button colorScheme='blue' marginTop='3em'>
              <Link to='/'>
                Go back to home
              </Link>
            </Button>
            </Center>
    </Flex>
  )
}

export default PageNotFound