import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../store/reducers/modalReducer';

const ModalWindow = ({ children, header, modalFooter, isOpen, onClose, setRegister }) => {
  
  const dispatch = useDispatch();
  // const {isOpen} = useDisclosure();

  return (
      <Modal 
        isCentered 
        isOpen={isOpen}
        onClose={()=>{
          onClose();
          setRegister();
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
  );
};

export default ModalWindow;
