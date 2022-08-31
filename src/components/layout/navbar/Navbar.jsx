import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
    Breadcrumb,
    BreadcrumbLink,
    BreadcrumbItem,
  } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import SignOut from '../../auth/SignOut';
import ModalComponent from '../modal/ModalComponent';
import LoginForm from '../../auth/LoginForm';

const Navbar = () => {
    const { authenticated } = useSelector(state => state.auth)
    return (
        <Breadcrumb separator=''>
            <BreadcrumbItem>
                <BreadcrumbLink as={ReactRouterLink} to="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <BreadcrumbLink as={ReactRouterLink} to="/work">Work</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <BreadcrumbLink as={ReactRouterLink} to="/contact">Contact</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
            { authenticated ? (<SignOut />) : (<ModalComponent name='Login' />)}
            </BreadcrumbItem>
            <BreadcrumbItem>
                <ModalComponent />
            </BreadcrumbItem>
        </Breadcrumb>
    );
}

export default Navbar;
