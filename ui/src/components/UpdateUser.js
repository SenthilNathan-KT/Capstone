import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import { object, string, ref } from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import { Box, Typography, IconButton,TextField, Button, DialogTitle, DialogContent,DialogActions, Dialog } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SideBar from './SideBar';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config';

const UpdateUser = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [activeForm, setActiveForm] = useState('');
  const theme = useTheme();
  const isSidebarCollapsed = useMediaQuery("(max-width: 1215px)"); 

  const handleJwtExpirationError = (error) => {
    if (error.response && error.response.status === 403) {
      sessionStorage.removeItem("accessToken");
      navigate('/login');
    } else {
      console.error("API Error:", error);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  
  const handleFormSubmit = async (values, {setFieldError}) => {
    console.log('handleFormSubmit called with values:', values);

    try {
      const authToken = sessionStorage.getItem('accessToken');

      if (!authToken) {
        navigate('/login');
        return;
      }

      if (activeForm === 'password') {
        console.log('password clicked');
        // For password change
        const requestData = {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        };

        console.log('Sending password change request data:', requestData);

        const response = await axios.put(`${config.apiUrl}settings`, requestData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        console.log('Password updated successfully:', response.data);

        values.oldPassword = '';
        values.newPassword = '';
        values.confirmPassword = '';
      
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else if (activeForm === 'username') {
        console.log('username clicked');
        // For username change
        const requestData = {
          userName: values.userName, // Send the new username to the backend
        };

        console.log('Sending username change request data:', requestData);
        const response = await axios.put(`${config.apiUrl}settings`, requestData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        values.userName = '';
        console.log('Username updated successfully:', response.data);
        sessionStorage.setItem('userName', response.data.userName);
        setUserName(response.data.userName); // Update the local state with the new username
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });

        // setTimeout(() => {
        //   window.location.reload();
        // }, 100);
      }
    } catch (error) {
      handleJwtExpirationError(error);
      if (error.response && error.response.status === 400 && error.response.data.message === 'Kindly enter the valid old password') {
        // Set an error for the oldPassword field
        setFieldError('oldPassword', 'Invalid old password');
      } else 
      if (error.response && error.response.status === 403) {
        sessionStorage.removeItem('accessToken');
        navigate('/login');
      } else {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  const handleFormChange = (formType) => {
    setActiveForm(formType);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const authToken = sessionStorage.getItem('accessToken');
      if (!authToken) {
        navigate('/login');
        return;
      }

      const response = await axios.get(
        `${config.apiUrl}settings`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const { userName, email } = response.data;
      setUserName(userName);
      setEmail(email);

      sessionStorage.setItem('userName', userName);

    } catch (error) {
      handleJwtExpirationError(error);
      console.error('Error fetching user settings:', error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleBack = () => {
    navigate(-1); 
  };

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  const checkoutSchema = object().shape({
    oldPassword: string()
      .required('Old password is required'),
    newPassword: string()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: string()
      .required('Confirm password is required')
      .oneOf([ref('newPassword'), null], 'Passwords must match'),
  });
  
  const validateSchema = object().shape({
    userName: string()
      .required('New username is required')
      .min(6, 'Username must be at least 6 characters'),
  });

  return (
    <Box display="flex">
      <Box position="fixed" top={0} left={0} bottom={0} bgcolor="#f5f5f5" zIndex={10}>
        <SideBar userName={userName} />
      </Box> 
      <Box flex="1" display="flex" flexDirection="column" height="100vh">
        
      <Box ml={isSidebarCollapsed ? 10 : 0}>
        <Box 
          m="10px"
          //mt="30px"
          ml={isSidebarCollapsed ? 0 : (isNonMobile ? 40 : 0)}
          width={isSidebarCollapsed ? '100%' : 'auto'}
          backgroundColor="white"
          overflowY="auto"
          flex="1"
          p={isNonMobile ? 1 : 0}
          transition="margin-left 0.3s, width 0.3s"
          zIndex={1} 
        >
            <IconButton
                type="button"
                sx={{
                p: 1,
                color: "#03609C",
                mr: "10px",
                }}
                onClick={handleBack}
                >
                <ArrowBackIcon />
            </IconButton>
            <Box 
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '400px',
                    margin: '0 auto',
                  }}
                >
              <Typography variant="h4" style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: '20px' }}>
                Settings
              </Typography>
              <Typography variant="h6" style={{ marginBottom: '10px'}}>Username: {userName}</Typography>
              <Typography variant="h6" style={{ marginBottom: '40px'}}>Email: {email}</Typography>
              <Box style={{ marginBottom: '60px' }}>
                <Button
                  onClick={() => handleFormChange('username')}
                  variant="outlined"
                  color={activeForm === 'username' ? 'secondary' : 'primary'} // Change color when active
                  style={{ marginRight: '10px' }}
                >
                  Change Username
                </Button>
                <Button
                  onClick={() => handleFormChange('password')}
                  variant="outlined"
                  color={activeForm === 'password' ? 'secondary' : 'primary'} // Change color when active
                >
                  Change Password
                </Button>
              </Box>
              {activeForm === 'username' && (
                <Formik
                initialValues={{
                  userName: '',
                }}
                validationSchema={validateSchema} 
                onSubmit={handleFormSubmit}
                >
                  {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid }) => (
                    <form onSubmit={handleSubmit}>
                      {/* <Box>
                        <TextField
                          label="Old Username"
                          variant="outlined"
                          disabled
                          value={userName}
                          style={{ marginBottom: '20px', width: '100%' }}
                        />
                      </Box> */}
                      <Box>
                        <TextField
                          label="New Username"
                          variant="outlined"
                          type="text"
                          name="userName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.userName}
                          error={touched.userName && errors.userName}
                          helperText={touched.userName && errors.userName}
                          style={{ marginBottom: '20px', width: '100%' }}
                        />
                      </Box>
                      <Box display="flex" justifyContent="center">
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          style={{ marginRight: '10px' }}
                          disabled={!isValid}
                        >
                          Save
                        </Button>
                        <Button variant="outlined" color="primary" onClick={handleCancel}>
                          Cancel
                        </Button>
                      </Box>
                    </form>
                  )}
                </Formik>
              )}
              {activeForm === 'password' && (
              <Formik
                initialValues={initialValues}
                validationSchema={checkoutSchema} 
                onSubmit={handleFormSubmit}
                >
                {({ 
                  values, 
                  errors,
                  touched, 
                  handleChange,
                  handleBlur, 
                  handleSubmit, 
                  isValid,
                  submitForm
                }) => (
                <form onSubmit={handleSubmit}>
                  <Box>
                  <TextField
                    label="Old Password"
                    variant="outlined"
                    type="password"
                    name="oldPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.oldPassword}
                    error={!!touched.oldPassword && !!errors.oldPassword}
                    helperText={touched.oldPassword && errors.oldPassword}
                    style={{ marginBottom: '20px', width: '100%' }}
                  />
                  </Box>
                  <Box>
                    <TextField
                    label="New Password"
                    variant="outlined"
                    type="password"
                    name="newPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.newPassword}
                    error={!!touched.newPassword && !!errors.newPassword}
                    helperText={touched.newPassword && errors.newPassword}
                    style={{ marginBottom: '20px', width: '100%' }}
                    />
                  </Box>
                  <Box>
                    <TextField
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    name="confirmPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confirmPassword}
                    error={touched.confirmPassword && errors.confirmPassword}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    style={{ marginBottom: '20px', width: '100%' }}
                    />
                  </Box>
                  <Box display="flex" justifyContent="center">
                    <Button 
                      type="submit"
                      variant="contained" 
                      color="primary" 
                      style={{ marginRight: '10px' }} 
                      disabled={!isValid}
                      //onClick={() => handleCloseSaveDialog(true)}
                      onClick={() => setShowSaveDialog(true)}
                       >
                      Save
                    </Button>
                    <Button variant="outlined" color="primary" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </Box>
                </form>
              )}
              </Formik>
              )}
            </Box>
        </Box>
      </Box>
      </Box>
      <ToastContainer position="top-center" autoClose={3000} />
    </Box>
  );
};

export default UpdateUser;
