import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const outline = defineStyle({
  borderRadius: 0, // remove the border radius
  fontWeight: 'semibold', // change the font weight
})

export const buttonTheme = defineStyleConfig({
  variants: { outline },
})