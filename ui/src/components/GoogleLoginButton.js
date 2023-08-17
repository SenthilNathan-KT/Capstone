import React from 'react';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import {signInWithPopup} from "firebase/auth";

const GoogleLoginButton = ({ auth, provider, handleLogin }) => {
    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                handleLogin({
                    email: user.email,
                    password: user.uid,
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
            Login with Google
        </Button>
    );
};
export default GoogleLoginButton;
