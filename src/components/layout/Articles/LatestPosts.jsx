import {
    Box,
    Flex,
    Heading,
    Text,
    useColorModeValue
  } from '@chakra-ui/react';
  import React, { useEffect, useState } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { Link } from 'react-router-dom';
  import { fetchPosts, getPostsStatus, selectAllPosts } from './posts/postsSlice';
  import _ from 'lodash';
  
  const LatestPosts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostsStatus);
    const textColor = useColorModeValue('gray.700', 'gray.100');
    const [latestPosts, setLatestPosts] = useState([]);
  
    useEffect(() => {
      if (postsStatus === 'idle') {
        dispatch(fetchPosts());
      }
    }, [postsStatus, dispatch]);
  
    useEffect(() => {
      const sortedPosts = posts.slice().sort((a, b) => b.date - a.date);
      const latestPosts = sortedPosts.slice(0, 3);
      setLatestPosts(latestPosts);
    }, [posts]);
  
    const renderLatestPosts = latestPosts.map(post => (
      <Box maxW="250px" m="5px" as="article" key={post.date}>
        <Link
          to={`/blog/${post.id}`}
          sx={{
            'a:hover': { textDecoration: 'none', color: 'green' },
          }}
        >
          <Text
            as="b"
            fontSize="sm"
            color="purple.600"
            _hover={{ textDecoration: 'none', color: 'green' }}
          >
            {_.first(post.category)}
          </Text>
          <Heading fontSize="xl" color={textColor} as="h2" size="sm">
            {post.title}
          </Heading>
          <Text colorScheme={textColor} fontSize="xs">
            {new Date(
              post.date.seconds * 1000 + post.date.nanoseconds / 1000000
            ).toLocaleDateString()}
          </Text>
          <Box
            w="250px"
            h="250px"
            backgroundImage={`url(${post.imageUrl})`}
            backgroundPosition="center"
            backgroundSize="cover"
            my={5}
          />
        </Link>
      </Box>
    ));
  
    return (
      <Box w="80%" marginX="auto" my={10} as="section">
        <Heading my={10} color={textColor}>
          Latest Posts
        </Heading>
        <Flex
          maxW="intrinsic"
          mx="auto"
          flexWrap="wrap"
          justifyContent="center"
        >
          {renderLatestPosts}
        </Flex>
      </Box>
    );
  };
  
  export default LatestPosts;
  