import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  Button,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import SignOut from '../../auth/SignOut';
import { openModal } from '../modal/modalSlice';


const BreadCrumbNavbar = () => {
  const { authenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();


  return (
    <React.Fragment>
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
        {authenticated && (
          <BreadcrumbItem>
            <BreadcrumbLink as={ReactRouterLink} to="/account">
              Account
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
        <BreadcrumbItem>
          <BreadcrumbLink as={ReactRouterLink} to="/sandbox">
            Sandobox
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
                dispatch(openModal({ modalType: 'SignIn' }));
              }}
            >
              Sign In
            </Button>
          </BreadcrumbItem>
        )}

        {authenticated ? null : (
          <BreadcrumbItem>
            <Button
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
          </BreadcrumbItem>
        )}
      </Breadcrumb>
      
    </React.Fragment>
  );
};

export default BreadCrumbNavbar;
