import React from 'react';
import { Stack, Skeleton } from '@chakra-ui/react';

export default function Placeholder() {
  return (
    <Stack>
      <Skeleton height="50px" />
      <Skeleton height="50px" />
      <Skeleton height="50px" />
      <Skeleton height="50px" />
      <Skeleton height="50px" />
      <Skeleton height="50px" />
    </Stack>
  );
}
