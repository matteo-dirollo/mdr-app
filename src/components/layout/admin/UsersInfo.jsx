import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../../../store/asyncSlice';
import { db } from '../../../apis/firestore/firebase-config';
import { Box, Flex, List, ListItem, StackDivider, Text, VStack } from '@chakra-ui/react';
import { Divider } from 'semantic-ui-react';

const UsersInfo = () => {
  const [docs, setDocs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUserMsg() {
      dispatch(asyncActionStart());
      const data = [];
      await getDocs(collection(db, 'users'))
        .then(querySnpashot => {
          querySnpashot.forEach(doc => {
            // console.log(doc.id, '=>', doc.data());
            data.push(doc.data());
          });
          dispatch(asyncActionFinish());
        })
        .catch(error => {
          dispatch(asyncActionError(error));
          console.log('Error getting documents: ', error);
        });
      setDocs(data);
    }
    fetchUserMsg();
    const timeInterval = setTimeout(() => {
      fetchUserMsg();
    }, 300000);
    return () => {
      clearTimeout(timeInterval);
    };
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const displayUsers = docs.map((user, index) => {
    return (
      <React.Fragment key={index}>
        <ListItem>
          <Flex
            alignItems="start"
            flexWrap="wrap"
            flexDirection="horizontal"
            gap="6"
          >
            <Box p="5px" minW="max-content" minH="40px">
              <Text mt="8px" color="gray.400" fontSize="sm">
                {index + 1}
              </Text>
            </Box>
            <Box p="5px" minW="90px" minH="40px">
              <Text color="gray.400" fontSize="xs">
                Displayname
              </Text>
              <Text fontSize="md">{user.displayName}</Text>
            </Box>
            <Box p="5px" minW="90px" minH="40px">
              <Text color="gray.400" fontSize="xs">
                Email
              </Text>
              <Text fontSize="md">{user.email}</Text>
            </Box>
            <Box p="5px" minW="90px" minH="40px">
              <Text color="gray.400" fontSize="xs">
                Created on
              </Text>
              <Text fontSize="md">{user.createdOn}</Text>
            </Box>
            <Box p="5px" minW="90px" minH="40px">
              <Text color="gray.400" fontSize="xs">
                uid
              </Text>
              <Text fontSize="md">{user.userId}</Text>
            </Box>
          </Flex>
        </ListItem>
        <Divider />
      </React.Fragment>
    );
  });

  return (
    <>
    <Text fontSize='sm' as='b' color="gray.600" >All users</Text>
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      <List p={10}>{displayUsers}</List>
    </VStack>
    <Text fontSize='sm' as='b' color="gray.600" >Online</Text>
    </>
  );
};

export default UsersInfo;
