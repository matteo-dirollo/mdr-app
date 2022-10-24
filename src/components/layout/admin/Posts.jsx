import { Heading } from '@chakra-ui/react';
import React from 'react';
import AddPostForm from '../articles/AddPostForm';

const Posts = () => {
    return (
        <div>
            <Heading size='md'>Add new post</Heading>
            <AddPostForm/>
        </div>
    );
}

export default Posts;
