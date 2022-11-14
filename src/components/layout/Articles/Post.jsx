import {
  Box,
  Container,
  Divider,
  Heading,
  HStack,
  IconButton,
  Image,
  Spacer,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { MdFacebook } from 'react-icons/md';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { FaInstagramSquare } from 'react-icons/fa';
// import { useDispatch } from 'react-redux';



const Post = () => {

  // const dispatch = useDispatch();
  // React.useEffect(() => {
    
  // }, [dispatch]);


  return (
    <Container my={10} align="stretch" maxW={800}>
      <Text fontSize="xs">Home/Blog/PostTitle </Text>
      <Box as='article'>
        <Heading as="h1" size="2xl">
          Post Title
        </Heading>
        <Text fontSize="sm">Author | Category | a min ago</Text>
        <Box mt={5} mb={5}>
          <Image
            objectFit="cover"
            width="100%"
            height="400px"
            src={
              'https://images.unsplash.com/photo-1661783758573-e1fac356dba2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1658&q=80'
            }
          />
        </Box>
        <Text as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula
          nibh, interdum non enim sit amet, iaculis aliquet nunc. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Aliquam sit amet ipsum ac velit egestas ultrices.
          Vestibulum et neque id ex semper varius a sit amet metus. Vivamus
          congue dolor eget aliquam hendrerit. Etiam iaculis finibus egestas.
          Nam viverra urna quis odio efficitur malesuada. Maecenas rhoncus enim
          eu scelerisque rutrum. Pellentesque et mollis enim. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Curabitur sed commodo leo.
          Suspendisse potenti. Maecenas gravida ipsum placerat ligula posuere,
          ut rhoncus velit eleifend.
        </Text>
      </Box>
      <Divider my={10} />
      <HStack>
        <Box>
          <Text
            fontSize="md"
            as="b"
            color={useColorModeValue('gray.400', 'gray.400')}
          >
            Share this
          </Text>
        </Box>
        <Box>
          <IconButton
            aria-label="facebook"
            variant="ghost"
            size="lg"
            isRound={true}
            _hover={{ border: '2px solid teal' }}
            icon={<MdFacebook color="teal" size="28px" />}
          />
        </Box>
        <Box>
          <IconButton
            aria-label="facebook"
            variant="ghost"
            size="lg"
            isRound={true}
            _hover={{ border: '2px solid teal' }}
            icon={<AiFillTwitterCircle color="teal" size="28px" />}
          />
        </Box>
        <Box>
          <IconButton
            aria-label="facebook"
            variant="ghost"
            size="lg"
            isRound={true}
            _hover={{ border: '2px solid teal' }}
            icon={<FaInstagramSquare color="teal" size="28px" />}
          />
        </Box>
        <Spacer />
        <Tag>Web</Tag>
        <Tag>Design</Tag>
        <Tag>Art</Tag>
      </HStack>
      <br />
      <Heading mb={5} as="h2" size="md">
        More Posts
      </Heading>
      <HStack mb={5}>
        <Box>
          <Image
            objectFit="cover"
            width="100%"
            src={
              'https://images.unsplash.com/photo-1661783758573-e1fac356dba2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1658&q=80'
            }
          />
          <Text
            as="b"
            fontSize="md"
            color={useColorModeValue('gray.600', 'gray.300')}
          >
            Post Title
          </Text>
        </Box>
        <Spacer />
        <Box>
          <Image
            objectFit="cover"
            width="100%"
            src={
              'https://images.unsplash.com/photo-1661783758573-e1fac356dba2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1658&q=80'
            }
          />
          <Text
            as="b"
            fontSize="md"
            color={useColorModeValue('gray.600', 'gray.300')}
          >
            Post Title
          </Text>
        </Box>
        <Spacer />
        <Box>
          <Image
            objectFit="cover"
            width="100%"
            src={
              'https://images.unsplash.com/photo-1661783758573-e1fac356dba2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1658&q=80'
            }
          />
          <Text
            as="b"
            fontSize="md"
            color={useColorModeValue('gray.600', 'gray.300')}
          >
            Post Titlte
          </Text>
        </Box>
      </HStack>
      <Heading as="h2" size="md">
        Comments
      </Heading>
    </Container>
  );
};

export default Post;
