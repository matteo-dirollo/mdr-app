import { Button } from '@chakra-ui/react'
import React from 'react'

export default function ModalButton(props, { openModal }) {
  return (
    <Button
        colorScheme='teal'
        onClick={openModal}
    >{props.name}</Button>
  )
}
