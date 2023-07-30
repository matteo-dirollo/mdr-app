import { Box, VStack } from '@chakra-ui/react';
import React from 'react';
import LocalBgVideo from '../layout/videos/LocalBgVideo';
import { TabTitle } from '../layout/routing/TabTitle';
import Services from '../layout/services/Services';
import { Helmet } from 'react-helmet';

const Home = () => {
  const description =
    "Welcome to my page! I'm a freelance graphic designer specializing in creating captivating graphics, stunning illustrations, and mesmerizing animations. Let's bring your ideas to life with unique and eye-catching visual designs.";
  return (
    <Box>
      <TabTitle title="Home" />
      <Helmet>
        <meta
          name="description"
          content="Welcome to my page! I'm a freelance graphic designer specializing in creating captivating graphics, stunning illustrations, and mesmerizing animations. Let's bring your ideas to life with unique and eye-catching visual designs."
        />

        <meta property="og:title" content="Matteo Di Rollo" />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/matteo-dirollo-com.appspot.com/o/Articles%20Images%2Flosange.00_00_00_00.Still001.jpg?alt=media&token=f03a0a50-0462-47f8-8f70-b634c2927177"
        />
        <meta property="og:url" content="https://matteo-dirollo.com/" />
        <meta property="og:site_name" content="MDR" />
        <meta
          name="keywords"
          content="graphic design, illustrations, animations, freelancer, article, 3d, blender, seamless loop, design, web design, advertising, wired"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home" />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://firebasestorage.googleapis.com/v0/b/matteo-dirollo-com.appspot.com/o/Articles%20Images%2Flosange.00_00_00_00.Still001.jpg?alt=media&token=f03a0a50-0462-47f8-8f70-b634c2927177"
        />
      </Helmet>
      <VStack justifyContent="center" alignItems="center">
        <LocalBgVideo />
        <Services />
        {/* <LatestPosts /> */}
      </VStack>
    </Box>
  );
};

export default Home;
