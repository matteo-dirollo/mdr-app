import React from 'react';
import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { db } from '../../../apis/firestore/firebase-config';
import { addDoc, collection } from '@firebase/firestore';
import Logo from '../logo/Logo';
import { BiMailSend } from 'react-icons/bi';
import MyTextInput from '../../auth/MyTextInput';
import { Form, Formik } from 'formik';

const FooterNewsletter = () => {
  const initialValues = {
    email: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .min(3, 'Too short!')
      .required('Required')
      .email('Invalid email'),
  });
  const newsletter = collection(db, 'Newsletter');
  const collectData = async () => {
    await addDoc(newsletter, { email: values.email });
  };

  const handleSubmit = async (values, { isSubmitting }) => {
    try {
    } catch (error) {
    } finally {
    }
  };

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Logo width={30} color={useColorModeValue('gray.700', 'white')} />
            </Box>
            <Text fontSize={'sm'}>© 2022 All rights reserved</Text>
            <Stack direction={'row'} spacing={6}>
              {/* SOCIAL ICONS */}
            </Stack>
          </Stack>
          <Stack align={'flex-start'}>
            <Text>Company</Text>
            <Link fontSize={'0.8em'} href={'#'}>
              About us
            </Link>
            <Link fontSize={'0.8em'} href={'#'}>
              Blog
            </Link>
            <Link fontSize={'0.8em'} href={'#'}>
              Contact us
            </Link>
            <Link fontSize={'0.8em'} href={'#'}>
              Pricing
            </Link>
            <Link fontSize={'0.8em'} href={'#'}>
              Testimonials
            </Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Text>Support</Text>
            <Link fontSize={'0.8em'} href={'#'}>
              Help Center
            </Link>
            <Link fontSize={'0.8em'} href={'#'}>
              Terms of Service
            </Link>
            <Link fontSize={'0.8em'} href={'#'}>
              Legal
            </Link>
            <Link fontSize={'0.8em'} href={'#'}>
              Privacy Policy
            </Link>
            <Link fontSize={'0.8em'} href={'#'}>
              Satus
            </Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Text>Stay up to date</Text>
            <Formik>
                <Form>
                <Stack direction={'row'}>
              <MyTextInput
                name="email"
                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                border={0}
                _focus={{
                  bg: 'whiteAlpha.300',
                }}
              />
              {/* <Input
                  placeholder={'Your email address'}
                  bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                  border={0}
                  _focus={{
                    bg: 'whiteAlpha.300',
                  }}
                /> */}
              <IconButton
                bg={useColorModeValue('teal.400', 'teal.800')}
                color={useColorModeValue('white', 'gray.800')}
                _hover={{
                  bg: 'teal.600',
                }}
                aria-label="Subscribe"
                icon={<BiMailSend />}
              />
            </Stack>
                </Form>
            </Formik>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default FooterNewsletter;
