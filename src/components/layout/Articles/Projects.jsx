import { Box, Text, Badge, Flex } from '@chakra-ui/react';
import React from 'react';
import { articles } from './articles';

const Projects = () => {
  const renderArticles = articles.map((item, index) => {
    return (
      <Box margin="auto" key={index}>
        <Box my="0.6em">
          <Box
            boxSize={{
              base: '8em',
              lg: 'xs',
              xl: 'xs',
              md: '10em',
              sm: '8em',
            }}
            borderRadius="4px"
            sx={{
              backgroundImage: `url(${item.src})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          />

          <Badge
            fontSize={{ base: '12px', xl: '16px', md: '12px', sm: '12px' }}
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
      justify="space-evenly"
    >
      {renderArticles}
    </Flex>
  );
};

export default Projects;
