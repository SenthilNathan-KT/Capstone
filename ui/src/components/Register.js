//import logo from './logo.svg';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    console.log('Handle Register function called.');
    // Prepare the registration data
    const registrationData = {
      userName,
      email,
      password,
      reEnterPassword
    };

    try {
      // Send the registration data to the server
      const response = await axios.post('http://localhost:3001/auth/register', registrationData);
      console.log('Registration successful:', response.data);
        
      // Reset the form fields
      setUserName('');
      setEmail('');
      setPassword('');
      setReEnterPassword('');

      //success toast with message from backend
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER
      });

      //navigate to login page after successful registration
      // setTimeout(() => {
      //   navigate('/login');
      // }, 2000);
      
      
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle the registration error
      
      if (error.response.data.message === "Password doesn't match") {
        setErrorMessage("Password doesn't match");
      }
    }
  };

  return (
    
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src="/assets/images/dark theme logo.png" alt="Logo" />
          </Link>
        </div>
        <div className='image-column-level'>
          <div className="image-column">
            <img src='/assets/images/folks-online-presentation.png' alt="Folks Online Presentation" />
          </div>
          <div className="form-column">
            <h1>Sign Up</h1>
            <form className="register-form" onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Username"
                className="register-input"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                className="register-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="register-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Re-Enter Password"
                className="register-input"
                value={reEnterPassword}
                onChange={(e) => setReEnterPassword(e.target.value)}
              />
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              <div className='buttons'>
                <button type="submit" className="register-button">Sign Up</button>
                <button type="submit" className="cancel-button">Cancel</button>
              </div>
              <div className="login-link">
                Already have an account? <Link to='/login'>Login</Link>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
  );
};


export default Register;
