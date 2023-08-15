import React from 'react';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import {signInWithPopup} from "firebase/auth";

const GoogleSignUpButton = ({ auth, provider, handleSignUp }) => {
    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                handleSignUp({
                    userName: user.displayName,
                    email: user.email,
                    password: user.uid,
                    reEnterPassword: user.uid,
                }, {
                    setFieldError: () => {}
                });
                // ...
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            fullWidth
            sx={{
                backgroundColor: '#03609C',
                marginTop: '1rem',
                color: '#fff',
                '&:hover': {
                    backgroundColor: '#024E7B',
                },
            }}
            onClick={handleGoogleLogin}
        >
            Register with Google
        </Button>
    );
};
export default GoogleSignUpButton;
