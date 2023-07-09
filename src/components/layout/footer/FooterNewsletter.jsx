/* eslint-disable react/jsx-no-target-blank */
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
import { Link as ReactRouterLink } from 'react-router-dom';
import { FaMastodon } from 'react-icons/fa';
import { BsGithub } from 'react-icons/bs';

const FooterNewsletter = () => {
  const toast = useToast();
  const buttonColor = useColorModeValue('teal.500', 'teal.300');
  const buttonHoverColor = useColorModeValue('teal.600', 'teal.400');

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

            {/* <Box>
              <Text fontSize="lg" fontWeight="bold">
                Let's work together
              </Text>
              <Text fontSize={'xs'}>
                Are you looking for a graphic designer and creative for your
                project? Whether it's designing a logo, creating stunning
                visuals, or developing a website, I'm here to help. Let's
                discuss your requirements and bring your ideas to life. I'm also
                open to collaborations and new opportunities. Contact me today!
              </Text>
            </Box> */}

            <Text fontSize={'sm'}>© 2022 All rights reserved</Text>
            <Stack direction={'row'} spacing={6}>
              <IconButton
                aria-label="github"
                variant="ghost"
                size="sm"
                isRound={true}
                color={buttonColor}
                _hover={{ color: `${buttonHoverColor}` }}
                icon={<BsGithub size="28px" />}
              />
              <a
                rel="me"
                href="https://masto.ai/@matteodirollo"
                target="_blank"
              >
                <IconButton
                  aria-label="Mastodon"
                  variant="ghost"
                  size="sm"
                  isRound={true}
                  color={buttonColor}
                  _hover={{ color: `${buttonHoverColor}` }}
                  icon={<FaMastodon size="28px" />}
                />
              </a>
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
            <Link
              as={ReactRouterLink}
              fontSize={'0.8em'}
              to="/terms-and-conditions"
            >
              Terms of Service
            </Link>
            <Link fontSize={'0.8em'} href={'#'}>
              Legal
            </Link>
            <Link as={ReactRouterLink} fontSize={'0.8em'} to="/privacy-policy">
              Privacy Policy
            </Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Text>Get some news</Text>
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
