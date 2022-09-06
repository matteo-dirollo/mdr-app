import React from 'react';
import { Divider, Grid, GridItem } from '@chakra-ui/react';
import {
  Avatar,
  Heading,
  Text,
  Box,
  Flex,
} from '@chakra-ui/react';

export default function ProfileHeader() {
  return (
   
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem w="100%" bg="gray.700">
          <Flex>
            <Box>
              <Avatar
                size="lg"
                name="Ryan Florence"
                src="https://bit.ly/ryan-florence"
              />
            </Box>
            <Box>
              <Heading fontSize={'2xl'} fontWeight={500}>
                Display Name
              </Heading>
              <Text color={'gray.500'}>Subheader</Text>
              <Divider mt='10px' />
            </Box>
          </Flex>
        </GridItem>
        <GridItem w="100%" bg="gray.700">
          Hello
        </GridItem>
      </Grid>
  );
}
