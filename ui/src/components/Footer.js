import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import '../App.css'; 

const Footer = () => {
  
  return (
    <div className="home-page">
      <footer className="footer">
      <div className="footer-container">
        <div className="footer-inner-container">
          <div className="footer-logo">
            <img src="/assets/images/light theme logo.png" alt="Logo" />
          </div>
          <div className="footer-social">
            <a href="#" target="_blank"><i className="fab fa-facebook-f"></i></a>
            <a href="#" target="_blank"><i className="fab fa-twitter"></i></a>
            <a href="#" target="_blank"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div className="footer-links-bottom">
          <div className="footer-links">
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 intopic. All rights reserved.</p>
      </div>
      </footer>
    </div>
  );
};

export default Footer;
