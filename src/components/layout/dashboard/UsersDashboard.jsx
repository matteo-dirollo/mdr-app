import React, { useEffect, useState } from 'react';
import { db } from '../../../apis/firestore/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import {
  List,
  ListItem,
  Divider,
  Box,
  VStack,
  StackDivider,
  Text,
  Flex,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../../../store/reducers/asyncReducer';
// import Placeholder from '../Loader/Placeholder';

const UsersDashboard = () => {
  const [docs, setDocs] = useState([]);
  const dispatch = useDispatch();
  

  useEffect(() => {
    async function fetchUserMsg() {
      dispatch(asyncActionStart());
      const data = [];
      await getDocs(collection(db, 'ContactsPage'))
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
      //   dispatch(asyncActionFinish());
    }
    fetchUserMsg();
    const timeInterval = setTimeout(() => {
      fetchUserMsg();
    }, 300000);
    return () => {
      clearTimeout(timeInterval);
    };
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderUserMessages = docs.map((userMessage, index) => {
    return (
      <React.Fragment key={index}>
        <ListItem>
          <Flex
            minWidth="max-content"
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
                Name
              </Text>
              <Text>{userMessage.name}</Text>
            </Box>
            <Box p="5px" minW="120px">
              <Text color="gray.400" fontSize="xs">
                Last Name
              </Text>
              <Text>{userMessage.surname}</Text>
            </Box>
            <Box p="5px" minW="300px">
              <Text color="gray.400" fontSize="xs">
                Email
              </Text>
              <Text>{userMessage.email}</Text>
            </Box>
            <Box p="5px" minW="180px">
              <Text color="gray.400" fontSize="xs">
                Message
              </Text>
              <Text>{userMessage.message}</Text>
            </Box>
          </Flex>
        </ListItem>
        <Divider />
      </React.Fragment>
    );
  });

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      <List p={10}>{renderUserMessages}</List>
    </VStack>
  );
};

export default UsersDashboard;
