import React from 'react';
import { useSelector } from 'react-redux';
import SignIn from '../../auth/SignIn'
import SignUp from '../../auth/SignUp'

export default function ModalManager() {
    const modalLookup = {
      SignIn,
      SignUp,
      
    };
    const currentModal = useSelector((state) => state.modals);
    let renderedModal;
    if (currentModal) {
      const { modalType, modalProps } = currentModal;
      const ModalComponent = modalLookup[modalType];
      renderedModal = <ModalComponent {...modalProps} />;
    }
  
    return <span>{renderedModal}</span>;
  }