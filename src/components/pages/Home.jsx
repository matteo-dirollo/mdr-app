import { Box } from '@chakra-ui/react';
import React from 'react';
import HeroSection from '../layout/hero/HeroSection';
import {TabTitle} from '../layout/routing/TabTitle'

const Home = () => {
    return (
        <Box>
            <TabTitle title='Home' />
            <HeroSection/>
        </Box>
    );
}

export default Home;
