import { AbsoluteCenter, Box, Heading, Text } from '@chakra-ui/react';
import React, { useRef } from 'react';
import YoutubeBackground from 'react-youtube-background';

const BackgroundVideo = () => {
  const videoRef = useRef(null);
  const handleVideoEnd = event => {
    // Seek to the beginning of the video when it ends
    if (event.data === window.YT.PlayerState.ENDED) {
      event.target.seekTo(0);
    }
    console.log(event.data);
  };
  return (
    <Box
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
      w="100%"
      minHeight="100vh"
      marginTop="0"
    >
      <YoutubeBackground
        videoId="ZwZVB8GPkG8"
        playerOptions={'loop=1'}
        onReady={player => {
          player.mute();
          player.playVideo();
        }}
        onEnd={handleVideoEnd}
        ref={videoRef}
      >
        <Box w="100%" minHeight="100vh" marginTop="0">
          <AbsoluteCenter borderRadius="12px" backgroundColor="#623cea">
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
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
              <Text as={'span'} color={'teal.400'}>
                Graphic Designer & Creative
              </Text>
            </Heading>
          </AbsoluteCenter>
        </Box>
      </YoutubeBackground>
    </Box>
  );
};

export default BackgroundVideo;
