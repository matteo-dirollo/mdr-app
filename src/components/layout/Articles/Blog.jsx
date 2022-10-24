import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllPosts } from './postsSlice';

const Blog = () => {
  const posts = useSelector(selectAllPosts);

  const renderedPosts = posts.map(post => (
    <Box as="article" key={post.id}>
      <Text as="h3" fontSize="md">
        {post.title}
      </Text>
      <Text as="p">{post.content.substring(0, 100)}</Text>
    </Box>
  ));
  return (
    <Box>
        <Box as='section'>
            <Text as='b' fontSize='2xl'>Posts</Text>
            {renderedPosts}
        </Box>
      <Text as='h3' fontSize='xl'>Featured Posts</Text>
      <Text as='h3' fontSize='xl'>Category</Text>
    </Box>
  );
};

export default Blog;
