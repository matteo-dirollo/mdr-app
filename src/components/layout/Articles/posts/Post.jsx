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
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchComments,
  fetchPosts,
  getPostsStatus,
  selectAllPosts,
} from './postsSlice';
import { GoShare } from 'react-icons/go';
import PlainEditor from '../../lexicalEditor/PlainEditor';
import { Link, useParams } from 'react-router-dom';
import _ from 'lodash';
import Comments from './Comments';
import { openModal } from '../../modal/modalSlice';

const Post = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const textColor = useColorModeValue('gray.700', 'gray.100');

  const { articleId } = useParams();
  const article = _.find(posts, { id: articleId });
  const comments = article?.comments ? Object.values(article.comments) : [];

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
    if (article) {
      dispatch(fetchComments(article.id));
    }
  }, [postsStatus, dispatch, article]);

  const renderPosts = _.slice(cards, 0, 3).map(card => (
    <React.Fragment key={card.id}>
      <VStack justify="start">
        <Link
          to={`/blog/${card.id}`}
          sx={{ 'a:hover': { textDecoration: 'none' } }}
        >
          <Text
            mb="8px"
            color={textColor}
            fontSize="14px"
            sx={{ lineHeight: '1.5 !important', fontWeight: 'bold' }}
          >
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
    const renderCategories = categories.map((category, index) => (
      <Tag key={index}>{category}</Tag>
    ));
    return <React.Fragment key={index}>{renderCategories}</React.Fragment>;
  });

  if (article) {
    return (
      <Container my={10} align="stretch" maxW={[600,800]}>
        <Box as="article" key={article.id} maxW={['60%','100%']}>
          <Heading my={2} color={textColor} as="h1" size="2xl">
            {article.title}
          </Heading>
          <Text color={textColor} fontSize="xs">
            {article.author} | {_.first(article.category)} |{' '}
            {new Date(
              article.date.seconds * 1000 + article.date.nanoseconds / 1000000
            ).toLocaleDateString()}
          </Text>
          <Box
            w='100%'
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
        <HStack mb={50}>
          <IconButton
            aria-label=''
            borderRadius={'50%'}
            fontSize={'1.3em'}
            color={'white'}
            bg={'teal.400'}
            size='lg'
            icon={<GoShare />}
            onClick={() => {
              dispatch(openModal({ modalType: 'ShareOnSocials' }));
            }}
            _hover={{
              bg: 'yellow.300',
            }}
          />

          <Spacer />
          {renderTags}
        </HStack>

        <Comments articleId={article.id} comments={comments} />
        <br />

        {cards.length > 0 && (
          <Box>
            <Heading mb={5} as="h2" size="md">
              More Posts
            </Heading>
            <HStack mb={5}>{renderPosts}</HStack>
          </Box>
        )}
      </Container>
    );
  } else {
    return null;
  }
};

export default Post;
