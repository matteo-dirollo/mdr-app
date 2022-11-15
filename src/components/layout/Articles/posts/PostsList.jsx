import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPosts,
//   getPostsError,
  getPostsStatus,
  selectAllPosts,
} from './postsSlice';

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
//   const error = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  console.log(posts)

  const renderPosts = posts.map(post => (
    <Box as="article" key={post.id}>
      <Heading>{post.title}</Heading>
      <Text as="p">{post.body}</Text>
    </Box>
  ));
  return (
    <Box as="section">
      <Heading>Posts</Heading>
      {renderPosts}
    </Box>
  );
};

export default PostsList;
