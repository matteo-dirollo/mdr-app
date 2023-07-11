import { Box, Center, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchObjects, selectObjectData } from '../../../apis/storageSlice';

const LocalBgVideo = () => {
  const videoUrl = 'https://firebasestorage.googleapis.com/v0/b/matteo-dirollo-com.appspot.com/o/Videos%2Flosange-derniere.mp4?alt=media&token=0314676b-851b-404f-a5d8-97109ebf33cc'
  const dispatch = useDispatch();
  const objectData = useSelector(selectObjectData);
  useEffect(() => {
    dispatch(fetchObjects());
  }, [dispatch]);

  console.log(objectData)
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
      </Box>
      <Center zIndex={1}>
        <Box maxW={['300','450','600px']}>
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
