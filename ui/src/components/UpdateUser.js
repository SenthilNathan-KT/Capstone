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

const UpdateUser = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleJwtExpirationError = (error, navigate) => {
    if (error.response && error.response.status === 403) {
      sessionStorage.removeItem("accessToken");
      navigate('/login');
    } else {
      console.error("API Error:", error);
    }
  };
  
  const handleFormSubmit = async (values) => {
    console.log('handleFormSubmit called with values:', values);

    try {
      const authToken = sessionStorage.getItem('accessToken');

      if (!authToken) {
        navigate('/login');
        return;
      }

      const requestData = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };

      console.log('Sending request data:', requestData);

      const response = await axios.put('http://localhost:3001/settings', requestData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      
      console.log('Password updated successfully:', response.data);
      setShowSaveDialog(true);
      values.oldPassword = "";
      values.newPassword = "";
      values.confirmPassword = "";
    } catch (error) {
      handleJwtExpirationError(error);
      if (error.response && error.response.status === 403) {
        sessionStorage.removeItem('accessToken');
        navigate('/login');
      } else {
        console.error('Error updating password:', error);
      }
    }
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
        'http://localhost:3001/settings',
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const { userName, email } = response.data;
      setUserName(userName);
      setEmail(email);
    } catch (error) {
      handleJwtExpirationError(error);
      console.error('Error fetching user settings:', error);
    }
  };
  
  

  const handleSave = () => {
    setShowSaveDialog(true);
  };

  const handleCloseSaveDialog = (saveChanges) => {
    if (saveChanges) {
      // Perform actions to save changes here, if needed
      console.log("Saving changes...");
      
    }
    setShowSaveDialog(false);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleBack = () => {
    navigate(-1); 
    //navigate('/dashboard');
  };

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  const checkoutSchema = object().shape({
    oldPassword: string().required('Old password is required'),
    newPassword: string()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: string()
      .required('Confirm password is required')
      .oneOf([ref('newPassword'), null], 'Passwords must match'),
  });
  

  // const triggerNotification = (message) => {
  //   const newNotification = { message, seen: false };
  //   setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
  //   setSearchQuery("");
  //   updateNotificationCount((prevCount) => prevCount + 1);
  // };

  return (
    <Box display="flex">
      <Box position="fixed" top={0} left={0} bottom={0} bgcolor="#f5f5f5" zIndex={10}>
        <SideBar />
      </Box> {/* Sidebar component displayed only on non-mobile devices */}
      <Box flex="1" display="flex" flexDirection="column" height="100vh">
        <Box
          position="fixed"
          top={0}
          left={isNonMobile ? 340 : 0} // Apply left position based on isNonMobile
          right={30}
          zIndex={100}
          bgcolor="#fff"
          boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
        >
          <TopBar
            setSearchQuery={setSearchQuery}
            // notifications={notifications} // Pass the notifications state here
            // triggerNotification={triggerNotification}
            // updateNotificationCount={updateNotificationCount}
            // notificationCount={notificationCount}
          />
        </Box>
        <Box m="10px" mt="80px" ml={isNonMobile ? 40 : 0} backgroundColor="white" overflowY="auto" flex="1">
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
                    //alignItems: 'center', // Center align horizontally
                    //justifyContent: 'center', // Center align vertically
                    //padding: '20px',
                    //textAlign: 'center',
                    maxWidth: '400px',
                    //width: '100%',
                    margin: '0 auto', // Center align horizontally
                  }}
                >
              <Typography variant="h4" style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: '20px' }}>
                Settings
              </Typography>
              <Typography variant="h6" style={{ marginBottom: '10px'}}>Username: {userName}</Typography>
              <Typography variant="h6" style={{ marginBottom: '40px'}}>Email: {email}</Typography>
              <Formik
                initialValues={initialValues}
                validationSchema={checkoutSchema} // Add this line
                onSubmit={handleFormSubmit}
                // onSubmit={(values, { setSubmitting }) => {
                //   console.log('Formik handleSubmit called with values:', values);
                //   // Rest of the handleSubmit code
                // }}
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
                      onClick={handleSave}
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
            </Box>
        </Box>
      </Box>
      <Dialog open={showSaveDialog} onClose={() => handleCloseSaveDialog(false)}>
        <DialogTitle>Save Changes</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to save the changes?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseSaveDialog(false)} color="primary">
            No
          </Button>
          <Button onClick={() => handleCloseSaveDialog(true)} color="primary" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UpdateUser;
