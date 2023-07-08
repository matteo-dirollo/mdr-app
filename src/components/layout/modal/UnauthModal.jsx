import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from './modalSlice';

export default function UnauthModal() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const {prevLocation } = useSelector((state)=> state.auth)
  
  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  }

  return (
    <Modal isOpen={open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Please either login or register to see this content
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Button
              mx={3}
              colorScheme="teal"
              onClick={() => {
                dispatch(openModal({ modalType: 'SignIn' }));
              }}
            >
              Sign In
            </Button>{' '}
            or{' '}
            <Button
              mx={3}
              colorScheme="pink"
              onClick={() => {
                dispatch(
                  openModal({
                    modalType: 'SignUp',
                  })
                );
              }}
            >
              Sign Up
            </Button>
          </Center>
        </ModalBody>
        <ModalFooter>
          {/* <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              onClose()
              dispatch(closeModal({ modalType: 'PleaseLogin' }));
            }}
          >
            Close
          </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
