import { Box, Image } from '@chakra-ui/react';
import React from 'react';
import { articles } from './articles';

const Articles = () => {
    const renderArticles = articles.map((item, index)=>{
        return (
            <Box>
                <Image src={item.src} />
            </Box>
        )
    })
  return <div>{renderArticles}</div>;
};

export default Articles;
