import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import SignOut from '../../auth/SignOut';
import SignIn from '../../auth/SignIn';
import SignUp from '../../auth/SignUp';
import { openModal } from '../../../store/reducers/modalReducer';
import ModalWindow from '../modal/ModalWindow';

const Navbar = () => {
  const { authenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const {
    isOpen: isSignInOpen,
    onOpen: onSignInOpen,
    onClose: onSignInClose,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onClose: onSignUpClose,
  } = useDisclosure();

  return (
    <Breadcrumb separator="">
      <BreadcrumbItem>
        <BreadcrumbLink as={ReactRouterLink} to="/">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={ReactRouterLink} to="/work">
          Work
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={ReactRouterLink} to="/contact">
          Contact
        </BreadcrumbLink>
      </BreadcrumbItem>
      {authenticated ? (
        <BreadcrumbItem>
          <SignOut />
        </BreadcrumbItem>
      ) : (
        <BreadcrumbItem>
          <Button
            colorScheme="teal"
            onClick={() => {
              onSignInOpen();
              dispatch(
                openModal({ modalType: 'SignIn', modalProps: {} })
              );
            }}
          >
            Sign In
          </Button>

          <ModalWindow
            isOpen={isSignInOpen}
            onOpen={onSignInOpen}
            onClose={onSignInClose}
          >
            <SignIn onOpen={onSignUpOpen} onClose={onSignInClose} />
          </ModalWindow>
        </BreadcrumbItem>
      )}

      {authenticated ? null : (
        <BreadcrumbItem>
          <Button
            colorScheme="pink"
            onClick={() => {
              onSignUpOpen();
              dispatch(
                openModal({
                  modalType: 'SignUp',
                  modalProps: {},
                })
              );
            }}
          >
            Sign Up
          </Button>
          <ModalWindow
            id="SignUp"
            name="SignUp"
            isOpen={isSignUpOpen}
            onOpen={onSignUpOpen}
            onClose={onSignUpClose}
          >
            <SignUp onOpen={onSignInOpen} onClose={onSignUpClose} />
          </ModalWindow>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
};

export default Navbar;
