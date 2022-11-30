import React, { useEffect } from 'react';
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
import { MdFacebook } from 'react-icons/md';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { FaInstagramSquare } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, getPostsStatus, selectAllPosts } from './postsSlice';
import PlainEditor from '../../lexicalEditor/PlainEditor';
import { Link, useParams } from 'react-router-dom';
import _ from 'lodash';

const Post = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const buttonColor = useColorModeValue('teal.500', 'teal.300');
  const buttonHoverColor = useColorModeValue('teal.600', 'teal.400');
  const { articleId } = useParams();
  const article = _.find(posts, { id: articleId });
  const tags = _.filter(posts, function (post) {
    return post === article;
  });
  const cards = _.filter(posts, function (post) {
    return post !== article;
  });

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  const renderPosts = _.slice(cards, 0, 3).map(card => (
    <React.Fragment key={card.id}>
      <VStack justify="start">
        <Link
          to={`/blog/${card.id}`}
          sx={{ 'a:hover': { textDecoration: 'none' } }}
        >
          <Text mb='8px' color={textColor} fontSize='14px' sx={{lineHeight:'1.5 !important', fontWeight:'bold'}}>
            {card.title}
          </Text>
          <Box
            boxSize="250px"
            sx={{
              backgroundImage: `url(${card.imageUrl})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          />
        </Link>
      </VStack>
    </React.Fragment>
  ));
  const renderTags = tags.map((tag, index) => {
    const categories = tag.category;
    const renderCategories = categories.map((category, index) => <Tag key={index}>{category}</Tag>);
    return <React.Fragment key={index}>{renderCategories}</React.Fragment>;
  });

  if (article) {
    return (
      <Container my={10} align="stretch" maxW={800}>
        <Box as="article" key={article.id}>
          <Text color={textColor} fontSize="xs">
            Home/Blog/{article.id}
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
          {renderTags}
        </HStack>
        <br />
        <Heading mb={5} as="h2" size="md">
          More Posts
        </Heading>
        <HStack mb={5}>{renderPosts}</HStack>
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
