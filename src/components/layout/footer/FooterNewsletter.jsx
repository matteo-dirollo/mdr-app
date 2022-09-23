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
  useToast,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { db } from '../../../apis/firestore/firebase-config';
import { setDoc, doc, Timestamp } from '@firebase/firestore';
import Logo from '../logo/Logo';
import { BiMailSend } from 'react-icons/bi';
import MyTextInput from '../../auth/MyTextInput';
import { Form, Formik } from 'formik';
import BuyMeCoffee from '../buttons/BuyMeCoffee';
import Expire from '../animations/Expire';

const FooterNewsletter = () => {
  const toast = useToast();

  const initialValues = {
    email: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .min(3, 'Too short!')
      .required('Required')
      .email('Invalid email'),
  });

  const collectData = async values => {
    const docId = values.email;
    const newsletter = doc(db, 'Newsletter', docId);
    await setDoc(newsletter, {
      email: values.email,
      time: Timestamp.now(),
    });
    // console.log('Document written with ID: ', docRef.id);
  };

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    try {
      await collectData(values);
      resetForm();
      toast({
        title: 'Thank you for registering ! ',
        description: 'You will receive an email soon.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      setErrors({ db: 'Already registered' });
    } finally {
      setSubmitting(false);
    }
  };

  const inputBg = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');
  const iconButtonbg = useColorModeValue('teal.600', 'teal.800');
  const iconButtonColor = useColorModeValue('white', 'gray.800');

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
            {/* <Text>Company</Text> */}
            {/* <Link fontSize={'0.8em'} href={'#'}>
              About
            </Link> */}
            <Link fontSize={'0.8em'} href={'#'}>
              Blog
            </Link>
            <Link fontSize={'0.8em'} href={'#'}>
              Contact
            </Link>
            {/* <Link fontSize={'0.8em'} href={'#'}>
              Pricing
            </Link> */}
            {/* <Link fontSize={'0.8em'} href={'#'}>
              Testimonials
            </Link> */}
          </Stack>
          <Stack align={'flex-start'}>
            {/* <Text>Support</Text> */}
            {/* <Link fontSize={'0.8em'} href={'#'}>
              Help Center
            </Link> */}
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
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, isValid, dirty, errors }) => (
                <Form>
                  <Stack
                    flexDirection={'row'}
                    gap={3}
                    display={'flex'}
                    align={'center'}
                  >
                    <MyTextInput
                      name="email"
                      bg={inputBg}
                      border={0}
                      _focus={{
                        bg: 'whiteAlpha.300',
                      }}
                    />

                    <IconButton
                      bg={'teal.400'}
                      color={iconButtonColor}
                      isLoading={isSubmitting}
                      disable={!isValid || !dirty || isSubmitting}
                      type="submit"
                      _hover={{ bg: iconButtonbg }}
                      aria-label="Subscribe"
                      icon={<BiMailSend />}
                    />
                  </Stack>
                  {errors.db && (
                    <Expire delay="3000">
                      <Text color={'red.300'} fontSize={'sm'}>
                        {errors.db}
                      </Text>
                    </Expire>
                  )}
                </Form>
              )}
            </Formik>
            <BuyMeCoffee />
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default FooterNewsletter;
