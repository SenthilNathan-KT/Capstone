//import logo from './logo.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import '../App.css';

const Register = ({ onRegister }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    
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
      const response = await axios.post('http://localhost:3001/register', registrationData);
      console.log('Registration successful:', response.data);
        
      // Reset the form fields
      setUserName('');
      setEmail('');
      setPassword('');
      setReEnterPassword('');
    } catch (error) {
      console.error('Error during registration:', error);
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
            <input
              type="password"
              placeholder="Re-Enter Password"
              className="register-input"
              value={reEnterPassword}
              onChange={(e) => setReEnterPassword(e.target.value)}
            />
            <button type="submit" className="register-button">Sign Up</button>
            <div className="login-link">
              Already have an account? <Link to='/login'>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  

};


export default Register;
