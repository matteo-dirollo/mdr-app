import React from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../../store/actions/authActions';

const SignOut = ({ setAuthenticated }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <Button 
            colorScheme='teal'  
            onClick={ ()=> {
                dispatch(signOutUser());
                navigate('/');
            }}
        >
            Sign Out
        </Button>
    );
}

export default SignOut;
