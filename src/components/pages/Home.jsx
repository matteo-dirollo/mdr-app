import { Box } from '@chakra-ui/react';
import React from 'react';
import LocalBgVideo from '../layout/videos/LocalBgVideo'
// import HeroSection from '../layout/hero/HeroSection';

import {TabTitle} from '../layout/routing/TabTitle'
// import BackgroundVideo from '../layout/videos/BackgroundVideo';

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
