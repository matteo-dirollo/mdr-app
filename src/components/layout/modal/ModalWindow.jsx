import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from '../../../store/reducers/modalReducer';

const ModalWindow = ({ children, header, modalFooter, name }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Button 
        colorScheme="teal" 
        onClick={()=>{
            onOpen();
            dispatch(openModal({ modalType: {name}, modalProps: {} }))
        }}
        >
        {name}
      </Button>
      <Modal 
        isCentered 
        isOpen={isOpen} 
        onClose={()=>{
            onClose();
            dispatch(closeModal());
        }}
        >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          {header && <ModalHeader>{header}</ModalHeader>}
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>{modalFooter}</ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default ModalWindow;
