import React from 'react';
import { Divider, List, ListItem } from '@chakra-ui/react';

export default function ProfileContent() {
  const panes = [
    { menuItem: 'About' },
    { menuItem: 'Photos' },
    { menuItem: 'Followers' },
    { menuItem: 'Following' },
  ];
  return (
    <List>
      {panes.map((item, index) => (
        <React.Fragment key={index}>
          <ListItem>{item.menuItem}</ListItem>
          <Divider orientation="horizontal" />
        </React.Fragment>
      ))}
    </List>
  );
}
