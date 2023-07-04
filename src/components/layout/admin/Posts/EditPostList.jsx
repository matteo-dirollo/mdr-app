import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPosts,
  getPostsStatus,
  selectAllPosts,
} from '../../articles/posts/postsSlice';
import _ from 'lodash';
import {
  Box,
  Button,
  Divider,
  HStack,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const EditPostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  const renderPosts = posts.map((post, index) => (
    <Box key={index}>
      <ListItem>
        <HStack>
          <Box minW={5}>
            <Text fontSize="sm">{index + 1}</Text>
          </Box>
          <Box minW="250px">
            <Text fontSize="md">{_.truncate(post.title, { length: 25 })}</Text>
          </Box>
          <Box minW="150px">
            <Text mx="20px" fontSize="xs">
              {new Date(
                post.date.seconds * 1000 + post.date.nanoseconds / 1000000
              ).toLocaleDateString()}
            </Text>
          </Box>
          <Box>
            <Text fontSize="xs">{post.author}</Text>
          </Box>
        </HStack>
        <Box>
            <Button leftIcon={<EditIcon/>} colorScheme="blue" mx="3px" size="xs">
              Modify
            </Button>
            <Button leftIcon={<DeleteIcon/>} colorScheme="red" mx="3px" size="xs">
              Delete
            </Button>
          </Box>
      </ListItem>
      <Divider pt={3} />
    </Box>
  ));

  return <List spacing={3}>{renderPosts}</List>;
};

export default EditPostList;
