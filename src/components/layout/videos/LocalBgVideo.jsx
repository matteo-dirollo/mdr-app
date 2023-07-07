import { AbsoluteCenter, Box, Flex, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

const BackgroundVideo = () => {
    const videoUrl = 'https://firebasestorage.googleapis.com/v0/b/matteo-dirollo-com.appspot.com/o/Videos%2Flosange.mp4?alt=media&token=9f972aec-d7ca-4a07-b946-c12f7fd54cb1'
  return (
    <Box
      pos="relative"
      top={0}
      left={0}
      width="100%"
      height="100%"
      zIndex={-1}
      overflow="hidden"
      sx={{
        width: '100%',
        height: '100%',
        zIndex: '-1',
        transition: 'opacity 0.2s ease',
        '.youtube-background': { opacity: '5' },
        '.youtube-background.fade-out': { opacity: '0' },
        '.youtube-background.fade-out .player': {
          pointerEvents: 'none',
        },
      }}
      minHeight="100vh"
      marginTop="0"
    >

      <motion.video
        autoPlay
        loop
        muted
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        w="100%"
        h="100%"
        objectFit="cover"
      >
        <source
          src={videoUrl}
          type="video/mp4"
        />
        
      </motion.video>
      <Flex
        pos="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        justify="center"
        align="center"
        zIndex={1}
      >
         <Box w="100%" minHeight="100vh" marginTop="0">
          <AbsoluteCenter borderRadius="12px" >
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '8xl' }}
              color={'white'}
              p={8}
            >
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: '30%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'teal.400',
                  zIndex: -1,
                }}
              >
                Freelance
              </Text>
              <br />
              <Text as={'span'} color={'white'}>
                Graphic Designer & Creative
              </Text>
            </Heading>
          </AbsoluteCenter>
        </Box>
      </Flex>
    </Box>
  );
};

export default BackgroundVideo;
