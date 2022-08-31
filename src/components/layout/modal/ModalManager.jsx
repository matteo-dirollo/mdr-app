import React from 'react';
import { useSelector } from 'react-redux';
import SignIn from '../../auth/SignIn'

export default function ModalManager() {
    const modalLookup = {
      SignIn,
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