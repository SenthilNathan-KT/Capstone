import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Routes from './routes';
import reportWebVitals from './reportWebVitals';

const handleRegister = (registrationData) => {
  // Handle the registration logic here or pass the data to the appropriate function
  console.log(registrationData);
};
const handleLogin = (loginData) => {
  // Handle the registration logic here or pass the data to the appropriate function
  console.log(loginData);
};

// const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
