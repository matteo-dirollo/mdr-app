import {
  Box,
  Container,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlainEditor from '../../lexicalEditor/PlainEditor';
import {
  fetchPosts,
  getPostsStatus,
  selectAllPosts,
} from './postsSlice';

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const textColor = useColorModeValue('gray.700', 'gray.100');
    

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  console.log(posts);
  const renderPosts = posts.map(post => (
    <Box my="10px" as="article" key={post.date}>
      <Heading color={textColor} as="h3" size="lg">
        {post.title}
      </Heading>
      <Box
        w="100%"
        minH={400}
        sx={{
          backgroundImage: `url(${post.imageUrl})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        my={5}
      />
      <PlainEditor stateInstance={post.body} />
    </Box>
  ));

  return (
    <Container as="section">
      <Heading color={textColor}>Posts</Heading>
      {renderPosts}
    </Container>
  );
};

export default PostsList;
