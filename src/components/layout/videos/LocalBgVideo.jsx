import { Box, Center, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchObject, clearStorage } from '../../../apis/storageSlice';
import {
  appLoaded,
  asyncActionFinish,
  asyncActionStart,
} from '../../../store/asyncSlice';

const LocalBgVideo = () => {
  const dispatch = useDispatch();
  const desiredObjectName = 'Videos/losange-derniere.mp4';
  const [isVideoLoaded, setVideoLoaded] = useState(false);
  const videoUrl = useSelector(state => {
    const desiredObject = state.storage.objectData[desiredObjectName];
    return desiredObject ? desiredObject : null;
  });

  useEffect(() => {
    
    // Fetch objects using the fetchObjects action from the storageSlice
    const fetchObjectsFromStorage = async () => {
      dispatch(appLoaded());
      try {
        dispatch(asyncActionStart());
        dispatch(clearStorage());
        dispatch(fetchObject(desiredObjectName));

        dispatch(asyncActionFinish());
        

      } catch (error) {
        console.log(error);
      } 
    };

    fetchObjectsFromStorage();
  }, [dispatch]);

  useEffect(() => {
    if (videoUrl) {
      setVideoLoaded(true);
    }
  }, [videoUrl]);

  return (
    <Box
      pos="relative"
      width="100%"
      minHeight={['20vh', '40vh', '60vh', '80vh']}
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        pos="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={-1}
      >
                {isVideoLoaded ? (
          <motion.video
            autoPlay
            loop
            muted
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            width="100%"
            height="100%"
            objectFit="cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </motion.video>
        ) : (
          <div>Loading video...</div>
        )}
      </Box>
      <Center zIndex={1}>
        <Box maxW={['300', '450', '600px']}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '8xl' }}
            color="white"
          >
            <Text
              as="span"
              position="relative"
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
            <Text as="span" color="white">
              Graphic Designer & Creative
            </Text>
          </Heading>
        </Box>
      </Center>
    </Box>
  );
};

export default LocalBgVideo;
