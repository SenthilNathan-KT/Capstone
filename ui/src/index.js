import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Routes from './routes';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBSVyhKx1i-XbcWROLP0_ypckxYFP5AhEg",
    authDomain: "intopic-a2405.firebaseapp.com",
    projectId: "intopic-a2405",
    storageBucket: "intopic-a2405.appspot.com",
    messagingSenderId: "1007092711368",
    appId: "1:1007092711368:web:d1c2da0fa5fd16a6028afd",
    measurementId: "G-LR0F9L5H6Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
