//import logo from './logo.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import '../App.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    console.log('Handle Login function called.');
    // Prepare the registration data
    const loginData = {
      email,
      password
    };

    try {
      // Send the registration data to the server
      const response = await axios.post('http://localhost:3001/login', loginData);
      console.log('Login successful:', response.data);
        
      // Reset the form fields
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error during login:', error);
      // Handle the registration error
    }
  };

  return (
    <div className="home-page">
      <nav className="navbar-register">
        <div className="navbar-logo">
          <Link to="/">
            <img src="/assets/images/light theme logo.png" alt="Logo" />
          </Link>
        </div>
      </nav>
      <div className="container">
        <div className="image-column">
          <img src='/assets/images/folks-online-presentation.png' alt="Folks Online Presentation" />
        </div>
        <div className="form-column">
          <h1>Login</h1>
          <form className="register-form" onSubmit={handleLogin}>
            
            <input
              type="email"
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
            
            <button type="submit" className="register-button">Login</button>
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
