import React from 'react';
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  useColorModeValue,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../auth/MyTextInput';
import TextareaInput from './TextareaInput';
import { MdEmail, MdFacebook } from 'react-icons/md';
import { BsGithub, BsDiscord } from 'react-icons/bs';
import { db } from '../../../apis/firestore/firebase-config';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

const ContactForm = () => {
  const toast = useToast();
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const tastSuccess = () => {
    toast({
      title: 'Messsage sent.',
      description: 'Your message has been sent',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  const initialValues = {
    name: '',
    surname: '',
    email: '',
    message: '',
  };

  const collectData = async values => {
    const contactsPageCollectionRef = collection(db, 'Contact_Form');
    await addDoc(contactsPageCollectionRef, {
      name: values.name,
      surname: values.surname,
      email: values.email,
      message: values.message,
      time: Timestamp.now(),
    });
  };
  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Too short!').required('Required'),
    surname: Yup.string().min(3, 'Too short!').required('Required'),
    email: Yup.string()
      .min(3, 'Too short!')
      .required('Required')
      .email('Invalid email'),
    message: Yup.string().min(10, 'Too short!').required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await collectData(values);
      resetForm();
      tastSuccess();
    } catch (error) {
      toast({
        title: 'An Error occurred.',
        description: 'Something went wrong, try later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      throw error;
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Container maxW="full" mt={0} centerContent overflow="hidden">
      <Flex>
        <Box
          bg={useColorModeValue('gray.100', 'gray.700')}
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading color={textColor}>Contact</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color={textColor}>
                    Send a message here or email me
                    <br />
                    if you have a request for a new project.
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack pl={0} spacing={3} alignItems="flex-start">
                      <Button
                        size="md"
                        height="48px"
                        width="full"
                        variant="ghost"
                        color={textColor}
                        _hover={{ border: '2px solid teal' }}
                        leftIcon={<MdEmail color="teal" size="20px" />}
                      >
                        matteo.dirollo@icloud.com
                      </Button>
                    </VStack>
                  </Box>
                  <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={5}
                    px={5}
                    alignItems="flex-start"
                  >
                    <IconButton
                      aria-label="facebook"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ border: '2px solid teal' }}
                      icon={<MdFacebook color="teal" size="28px" />}
                    />
                    <IconButton
                      aria-label="github"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ border: '2px solid teal' }}
                      icon={<BsGithub color="teal" size="28px" />}
                    />
                    <IconButton
                      aria-label="discord"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ border: '2px solid teal' }}
                      icon={<BsDiscord color="teal" size="28px" />}
                    />
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg={useColorModeValue('gray.100', 'gray.700')} borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                      >
                        {({ isSubmitting, isValid, dirty, errors }) => (
                          <Form>
                            <MyTextInput label="Name" name="name" />
                            <MyTextInput label="Last Name" name="surname" />
                            <MyTextInput
                              label="Email"
                              name="email"
                              placeholder="example@xzy.com"
                            />
                            <TextareaInput label="Message" name="message" />

                            {errors.auth && (
                              <Text color="red.300" fontSize="sm">
                                {errors.auth}
                              </Text>
                            )}
                            <br />

                            <Stack>
                              <Button
                                isLoading={isSubmitting}
                                disable={!isValid || !dirty || isSubmitting}
                                type="submit"
                                colorScheme="teal"
                              >
                                Send
                              </Button>
                            </Stack>
                          </Form>
                        )}
                      </Formik>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default ContactForm;
