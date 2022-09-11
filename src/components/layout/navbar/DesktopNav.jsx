import {
  Box,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { navItems } from './NavItem';
import { Link as ReactRouterLink } from 'react-router-dom';
import DesktopSubNav from './DesktopSubNav';

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  const MenuItem = navItems.map(navItem => {
    const child = navItems.children;
    return (
      <Box key={navItem.label}>
        <Popover trigger={'hover'} placement={'bottom-start'}>
          <PopoverTrigger>
            <Link
              p={2}
              as={ReactRouterLink}
              to={navItem.href ?? '#'}
              fontSize={'sm'}
              fontWeight={500}
              color={linkColor}
              _hover={{
                textDecoration: 'none',
                color: linkHoverColor,
              }}
            >
              {navItem.label}
            </Link>
          </PopoverTrigger>

          {navItem.children && (
            <PopoverContent
              border={0}
              boxShadow={'xl'}
              bg={popoverContentBgColor}
              p={4}
              rounded={'xl'}
              minW={'sm'}
            >
              <Stack>
              <DesktopSubNav key={child.label} {...child} />;
              </Stack>
            </PopoverContent>
          )}
        </Popover>
      </Box>
    );
  });



  return (
    <Stack direction={'row'} spacing={4}>
      {MenuItem}
    </Stack>
  );
};

export default DesktopNav;
