import { Box, VStack } from '@chakra-ui/react';
import React from 'react';
import LocalBgVideo from '../layout/videos/LocalBgVideo';
// import HeroSection from '../layout/hero/HeroSection';

import { TabTitle } from '../layout/routing/TabTitle';
import Services from '../layout/services/Services';
// import LatestPosts from '../layout/articles/LatestPosts';
// import BackgroundVideo from '../layout/videos/BackgroundVideo';

const Home = () => {
  return (
    <Box>
      <TabTitle title="Home" />
      <VStack justifyContent='center' alignItems='center'>
        <LocalBgVideo />
        <Services />
        {/* <LatestPosts /> */}
      </VStack>
    </Box>
  );
};

export default Home;
