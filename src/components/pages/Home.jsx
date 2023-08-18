import { Box, VStack } from '@chakra-ui/react';
import React from 'react';
import LocalBgVideo from '../layout/videos/LocalBgVideo';
import { TabTitle } from '../layout/routing/TabTitle';
import Services from '../layout/services/Services';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <Box>
            <TabTitle title='Home' />
            {/* <HeroSection/> */}
            {/* <BackgroundVideo /> */}
            <LocalBgVideo />
          
        </Box>
    );
}

export default Home;
