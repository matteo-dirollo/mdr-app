import { Box } from '@chakra-ui/react';
import React from 'react';
// import HeroSection from '../layout/hero/HeroSection';

import {TabTitle} from '../layout/routing/TabTitle'
import BackgroundVideo from '../layout/videos/BackgroundVideo';

const Home = () => {
    return (
        <Box>
            <TabTitle title='Home' />
            {/* <HeroSection/> */}
            <BackgroundVideo />
          
        </Box>
    );
}

export default Home;
