import { Grid, GridItem, Box } from '@chakra-ui/react';
import React from 'react';
import ProfileContent from './ProfileContent';
import ProfileHeader from './ProfileHeader';

export default function UserProfile() {
  return (
    
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={4}
      >
        <GridItem colSpan={4}>
          <ProfileHeader />
        </GridItem>
        <GridItem colSpan={3}>
          <Box h="200px" bg="gray.400"></Box>
        </GridItem>
        <GridItem colStart={4} colEnd={6}>
          <ProfileContent />
        </GridItem>
      </Grid>
   
  );
}
