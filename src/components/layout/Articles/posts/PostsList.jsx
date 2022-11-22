import { Box, Container, Heading } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlainEditor from '../../lexicalEditor/PlainEditor';
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

  const renderPosts = posts.map(post => (
    <Box my="10px" as="article" key={post.date}>
      <Heading as="h3" size="lg">
        {post.title}
      </Heading>
      {/* <Text>{post.body}</Text> */}
      <PlainEditor stateInstance={post.body} />
    </Box>
  ));

  return (
    <Container as="section">
      <Heading>Posts</Heading>
      {renderPosts}
    </Container>
  );
};

export default PostsList;
