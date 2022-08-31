import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import LoginForm from '../../auth/LoginForm';
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from '../../../store/reducers/modalReducer';

const ModalComponent = ( props ) => {
    
    const OverlayOne = () => (
          <ModalOverlay
              bg='blackAlpha.300'
              backdropFilter='blur(10px) hue-rotate(90deg)'
          />
      )
  
      const { isOpen, onOpen, onClose } = useDisclosure()
      const [overlay, setOverlay] = React.useState(<OverlayOne />);
      const dispatch = useDispatch();
      
      return (
          <React.Fragment>
            <Button colorScheme='blue'
              onClick={() => {
                setOverlay(<OverlayOne />)
                dispatch(openModal({ modalType: 'LoginForm' }))
              }}
            >
              {props.name}
            </Button>
            
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
            {overlay}
            <ModalContent>
                
              <ModalCloseButton />
              <ModalBody bg={useColorModeValue('gray.50', 'gray.800')} borderTopRadius={6}>
                <LoginForm />
              </ModalBody>
              <ModalFooter bg={useColorModeValue('gray.50', 'gray.800')} borderBottomRadius={6}>
                
              </ModalFooter>
            </ModalContent>
           </Modal>
           </React.Fragment>
      );
  }
  
  export default ModalComponent;