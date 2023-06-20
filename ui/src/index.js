import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Register from './components/Register.js';
import reportWebVitals from './reportWebVitals';

const handleRegister = (registrationData) => {
  // Handle the registration logic here or pass the data to the appropriate function
  console.log(registrationData);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Register onRegister={handleRegister} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
