import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../store/reducers/modalReducer';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button, 
    useDisclosure
  } from '@chakra-ui/react';

export default function ModalWrapper({children, size, header}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
  return (
    <>
    <Button onClick={onOpen}>Open Modal</Button>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={()=>{dispatch(closeModal())}}>
            Close
          </Button>
          <Button variant='ghost'>Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
}
