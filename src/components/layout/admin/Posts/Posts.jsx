import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React from 'react';
import AddPostForm from '../../articles/posts/AddPostForm';
import EditPostList from './EditPostList';

const Posts = () => {
  return (
    <div>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Add new post</Tab>
          <Tab>Posts list</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AddPostForm />
          </TabPanel>
          <TabPanel>
            <EditPostList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Posts;
