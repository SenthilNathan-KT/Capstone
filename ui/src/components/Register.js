import { Box, Button, TextField, Container, Paper } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import React, {useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = !!sessionStorage.getItem('accessToken');
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleRegister = async (values) => {
    console.log('Handle Register function called.');

    try {
      // Sending the registration data to the server
      const response = await axios.post('http://localhost:3001/auth/register', values);
      console.log('Registration successful:', response.data);
      
      values.userName="";
      values.email="";
      values.password="";
      values.reEnterPassword="";

      //success toast with message from backend
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER
      });
      
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle the registration error
    }
  };

  const initialValues = {
    userName: "",
    email: "",
    password: "",
    reEnterPassword: "",
  };

  const checkoutSchema = yup.object().shape({
    userName: yup.string().required("User name is required"),
    email: yup
      .string()
      .email("Invalid Email Format")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
    reEnterPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], "Passwords doesn't match")
      .required("Please Re-enter the Password"),
  });

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      backgroundColor="#03609C"
    >
      <div>
      <Link to="/" style={{ position: 'absolute', top: 0, left: 0, margin: '30px' }}>
        <img src="/assets/images/light theme logo.png" 
          alt="Logo" 
          style={{ width: '200px', height: '40px' }}
        />
      </Link>
      <Container maxWidth="md">
        <Paper elevation={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row", // Apply column layout for small screens
          alignItems: "center", // Center content horizontally
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "12px",
          overflow: "hidden",
          mt: "20px",
          width: "100%", // Ensure full width in mobile view
          "@media (max-width: 650px)": {
            flexDirection: "column", // Apply column layout for small screens
            height:"650px",
            //width: "100%",
            margin: '0px auto', // Center horizontally
            padding: '0px',
          },
        }}
        >
        <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: "50%",
              height: "100%",
              borderRadius: '0 12px 12px 0',
              overflow: 'hidden',
              "@media (max-width: 650px)": {
                //width: "300px",
                marginTop: '10px',
                //height:"100%",
              },
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/casual-life-3d-girl-sitting-on-floor-with-laptop-and-studying.png`}
              alt="Presentation"
              style={{ width: '100%', height: '100%', margin: '90px 0px' }}
            />
          </Box>
          <Box
            sx={{
              backgroundColor: "white",
              padding: "20px",
              maxWidth: "500px",
              width: "50%",
              mt: "20px",
              "@media (max-width: 650px)": {
                width: "80%", // Decrease width for small screens
                  marginTop: "10px",
                  mt: "0px",
                  padding: "5px",
                //height:"100%",
              },
            }}
          >
            <h2
            style={{
              color: "#03609C",
              marginBottom: "20px",
            }}
            >Signup</h2>
            <Formik
              onSubmit={handleRegister}
              initialValues={initialValues}
              validationSchema={checkoutSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="UserName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.userName}
                    name="userName"
                    error={!!touched.userName && !!errors.userName}
                    helperText={touched.userName && errors.userName}
                    sx={{ marginBottom: "10px", borderRadius: '8px' }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ marginBottom: "10px", borderRadius: '8px' }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ marginBottom: "10px", borderRadius: '8px' }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="password"
                    label="Re-Enter Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.reEnterPassword}
                    name="reEnterPassword"
                    error={!!touched.reEnterPassword && !!errors.reEnterPassword}
                    helperText={touched.reEnterPassword && errors.reEnterPassword}
                    sx={{ marginBottom: "10px", borderRadius: '8px' }}
                  />
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    mt={2}
                  >
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      sx={{
                        width: "100%",
                        backgroundColor: "#03609C",
                        "&:hover": {
                          backgroundColor: "#024E7B",
                        },
                      }}
                    >
                      Register
                    </Button>
                    <Box mt={2} color="#03609C">
                      Already have an account? {' '}
                      <Link 
                        to="/login" 
                        style={{ 
                          color: '#03609C', 
                          textDecoration: 'underline', 
                          fontWeight: 'bold'}}>
                        Login
                      </Link>
                    </Box>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Paper>
      </Container>
      <ToastContainer />
      </div>
    </Box>
  );
};

export default Register;
