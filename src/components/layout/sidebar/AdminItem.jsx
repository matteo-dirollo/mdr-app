import { Box, Flex, Link } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import React from 'react';
import { Icon } from 'semantic-ui-react';

const AdminItem = ({ icon, children, link, onClose, ...rest }) => {
  return (
    <Link
      to={link}
      as={ReactRouterLink}
      style={{ textDecoration: 'none' }}
      onClick={onClose}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Box  mr="4">
            <Icon
             
              fontSize="16"
              _grouphover={{
                color: 'white',
              }}
              as={icon}
            />
          </Box>
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default AdminItem;
