//import logo from './logo.svg';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import '../App.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailErrorMessage('');
    setPasswordErrorMessage('');
    console.log('Handle Login function called.');
    // Prepare the registration data
    const loginData = {
      email,
      password
    };

    try {
      // Send the registration data to the server
      const response = await axios.post('http://localhost:3001/auth/login', loginData);
      console.log('Login successful:', response.data);
      axios.defaults.headers.common.Authorization = `bearer ${response.data.userObj.token}`;
        
      // Reset the form fields
      setEmail('');
      setPassword('');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during login:', error);
      // Handle the registration error
      const errorMessage = error.response.data.message;
      if (errorMessage === 'Kindly enter a valid email address') {
        setEmailErrorMessage(errorMessage);
      } else if (errorMessage === 'Kindly enter a valid password') {
        setPasswordErrorMessage(errorMessage);
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
            <h1>Login</h1>
            <form className="register-form" onSubmit={handleLogin}>
              
              <input
                type="text"
                placeholder="Email"
                className="register-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailErrorMessage && <div className='error-message'>{emailErrorMessage}</div>}
              <input
                type="password"
                placeholder="Password"
                className="register-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordErrorMessage && <div className='error-message'>{passwordErrorMessage}</div>}
              <div className='buttons'>
                <button type="submit" className="register-button">Login</button>
                <button type="submit" className="cancel-button">Cancel</button>
              </div>
              <div className="login-link">
                Don't have an account? <a href='/register'>Sign Up</a>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
  

};


export default Login;
