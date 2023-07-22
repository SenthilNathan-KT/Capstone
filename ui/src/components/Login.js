import { Box, Button, TextField, Container, Paper, FormHelperText } from "@mui/material";
import { Formik } from "formik";
import {object, string} from "yup";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState(""); // State for error message

  const handleLogin = async (values, { setFieldError }) => {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", values);
      //const { success, message } = response.data;
      console.log('Login successful:', response.data);
      //axios.defaults.headers.common.Authorization = `Bearer ${response.data.userObj.token}`;
      localStorage.setItem('accessToken', response.data.userObj.token);
      values.email = "";
      values.password = "";
      navigate('/dashboard');
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response.data.message === "Kindly enter a valid password") {
        setFieldError("password", "Invalid password");
        setErrorMessage("Invalid password"); // Set error message state
      } else if (error.response.data.message === "Kindly enter a valid email address") {
        setFieldError("email", "Invalid email address");
        setErrorMessage("Invalid email address"); // Set error message state
      } else {
        // Handle other error cases, e.g., display a generic error message on the form
        setErrorMessage("Login failed: " + error.response.data.message); // Set error message state
      }
    }
  };
  

  const initialValues = {
    email: "",
    password: "",
  };

  const checkoutSchema = object().shape({
    email: 
      string()
      .email("Invalid Email Format")
      .required("Email is required"),
    password: string().required("Password is required"),
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
        <Paper elevation={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: "50%",
              height: "100%",
              borderRadius: '0 12px 12px 0',
              overflow: 'hidden',
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
            }}
          >
            <h2
            style={{
              color: "#03609C",
              marginBottom: "20px",
            }}
            >Login</h2>
            <Formik
              onSubmit={handleLogin}
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
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ marginBottom: "20px", borderRadius: '8px' }}
                  />
                  
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ marginBottom: "20px", borderRadius: '8px' }}
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
                      Login
                    </Button>
                    <Box mt={2} color="#03609C">
                      Don't have an account? {' '}
                      <Link 
                        to="/register" 
                        style={{ 
                          color: '#03609C', 
                          textDecoration: 'underline', 
                          fontWeight: 'bold'}}>
                        Signup
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

export default Login;
