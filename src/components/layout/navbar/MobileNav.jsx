import React from 'react';
import { navItems } from './NavItem';
import MobileNavItem from './MobileNavItem'
import { Stack } from '@chakra-ui/react';

const MobileNav = () => {
    const MobileItems = navItems.map((navItem)=>{
        return <MobileNavItem key={navItem.label} {...navItem} />
    })
    return (
        <Stack>
            {MobileItems}
        </Stack>
    );
}

export default MobileNav;
