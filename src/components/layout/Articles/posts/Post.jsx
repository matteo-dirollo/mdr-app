import {
  Box,
  Container,
  Divider,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Tag,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { MdFacebook } from 'react-icons/md';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { FaInstagramSquare } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, getPostsStatus, selectAllPosts } from './postsSlice';
import PlainEditor from '../../lexicalEditor/PlainEditor';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

const Post = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const buttonColor = useColorModeValue('teal.600', 'teal.500');
  const buttonHoverColor = useColorModeValue('teal.100', 'teal.700');
  const { articleId } = useParams();
  const article = posts.find(post => post.postId === articleId);

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);
  console.log(article);

  const renderCards = posts.slice(0, 2).map(post => (
    <React.Fragment>
      <VStack justify='start'>
        <Text as="b" fontSize="md" color={textColor}>
          {post.title}
        </Text>
        <Box
          boxSize="250px"
          sx={{
            backgroundImage: `url(${post.imageUrl})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
      </VStack>
    </React.Fragment>
  ));

  if (article) {
    return (
      <Container my={10} align="stretch" maxW={800}>
        <Box as="article" key={article.postId}>
          <Text color={textColor} fontSize="xs">
            Home/Blog/{article.postId}
          </Text>
          <Heading my={2} color={textColor} as="h1" size="2xl">
            {article.title}
          </Heading>
          <Text color={textColor} fontSize="xs">
            Author: {article.author} | {_.first(article.category)} |{' '}
            {new Date(
              article.date.seconds * 1000 + article.date.nanoseconds / 1000000
            ).toLocaleDateString()}
          </Text>
          <Box
            w="100%"
            minH={400}
            sx={{
              backgroundImage: `url(${article.imageUrl})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
            mt={5}
            mb={5}
          />

          <PlainEditor stateInstance={article.body} />
        </Box>
        <Divider my={10} />
        <HStack>
          <Box>
            <Text fontSize="md" as="b" color={textColor}>
              Share this
            </Text>
          </Box>
          <Box>
            <IconButton
              aria-label="facebook"
              variant="ghost"
              size="sm"
              isRound={true}
              color={buttonColor}
              _hover={{ color: `${buttonHoverColor}` }}
              icon={<MdFacebook size="28px" />}
            />
          </Box>
          <Box>
            <IconButton
              aria-label="twitter"
              variant="ghost"
              size="sm"
              isRound={true}
              color={buttonColor}
              _hover={{ color: `${buttonHoverColor}` }}
              icon={<AiFillTwitterCircle size="28px" />}
            />
          </Box>
          <Box>
            <IconButton
              aria-label="facebook"
              variant="ghost"
              size="sm"
              isRound={true}
              color={buttonColor}
              _hover={{ color: `${buttonHoverColor}` }}
              icon={<FaInstagramSquare size="28px" />}
            />
          </Box>
          <Spacer />
          <Tag>Web</Tag>
          <Tag>Design</Tag>
          <Tag>Art</Tag>
        </HStack>
        <br />
        <Heading mb={5} as="h2" size="md">
          More Posts
        </Heading>
        <HStack mb={5}>{renderCards}</HStack>
        <Spacer />
        {/* <Heading as="h2" size="md">
          Comments
        </Heading> */}
      </Container>
    );
  } else {
    return null;
  }
};

export default Post;
