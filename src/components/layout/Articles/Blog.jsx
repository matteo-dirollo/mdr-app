import { Box, Image, Text, Badge, Flex } from '@chakra-ui/react';
import React from 'react';
import { articles } from './articles';

const Blog = () => {
  const renderArticles = articles.map((item, index) => {
    return (
      <Box margin="auto" key={index}>
        <Box>
          <Box
            boxSize={{
              base: '8em',
              lg: 'xs',
              xl: 'xs',
              md: '10em',
              sm: '8em',
            }}
          >
            <Image borderRadius="4px" src={item.src} />
          </Box>
          <Badge
            fontSize={{ base: '8px', xl: '12px', md: '8px', sm: '8px' }}
            variant="outline"
            colorScheme="teal"
          >
            {item.label}
          </Badge>
          <Text
            maxWidth={{ base: '180px', xl: '350', md: '300px', sm: '180px' }}
            fontSize={{ base: '14px', xl: '18px', md: '18px', sm: '14px' }}
          >{`${item.title}, ${item.year}`}</Text>
        </Box>
      </Box>
    );
  });
  return (
    <Flex
      flexGrow="1"
      flexWrap="wrap"
      marginX="auto"
      spacing={{ base: '25px', '2xl': '25px', xl: '3', md: '3', sm: '3' }}
      justifySelf="stretch"
      justify='space-evenly'
    >
      {renderArticles}
    </Flex>
  );
};

export default Blog;
