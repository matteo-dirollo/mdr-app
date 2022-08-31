import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
  } from '@chakra-ui/react'

const ModalWindow = ({children, header, modalFooter, modalButton}) => {
    const { isOpen, onClose } = useDisclosure();

    return (
        <React.Fragment>
            {modalButton}
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px) hue-rotate(90deg)'
                    />
                    <ModalContent>
                        {header && <ModalHeader>{header}</ModalHeader>}
                        <ModalCloseButton />
                     <ModalBody>
                        {children}
                    </ModalBody>  
                    <ModalFooter>{modalFooter}</ModalFooter> 
                    </ModalContent>
            </Modal>
        </React.Fragment>
    );
}

export default ModalWindow;
