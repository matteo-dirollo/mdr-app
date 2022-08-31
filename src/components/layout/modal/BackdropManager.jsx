import React from 'react';
import { useSelector } from 'react-redux';
import LoginForm from '../../auth/LoginForm';


export default function BackdropManager() {
  const modalLookup = {
      LoginForm,
  };
  const currentModal = useSelector((state) => state.modals);
  let renderedModal;
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const Modal = modalLookup[modalType];
    renderedModal = <Modal {...modalProps} />;
  }

  return <span>{renderedModal}</span>;
}
