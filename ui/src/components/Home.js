import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import NavHeader from './NavHeader';  

const HomePage = () => {
  
  return (
    <div className="home-page">
      <NavHeader />
      <div className="content">
        <div className="block1">
          <div className="block1_1">
            <h2>Explore and Create Personalized Quizzes!</h2>
            <p>Challenge your mind, broaden your horizons, and dive into a world of interactive quizzes. From history buffs to pop culture enthusiasts, our quiz generator empowers you to test your knowledge, discover new insights, and share the excitement with friends.</p>
            <button type="submit" className="link-button">
              <Link to='/register' className="link-button">Get Started</Link>
            </button>
          </div>
          <div className="block1_2">
            <img src="/assets/images/3d-casual-life-time-management (1).png" alt="block1" />
          </div>
        </div>
        <div className="block2">
          <div className="block2_1">
            <img src="/assets/images/casual-life-3d-girl-sitting-on-floor-with-laptop-and-studying.png" alt="Logo" />
          </div>
          <div className="block2_2">
            <h2>Choose a topic, ignite your curiosity, and start quizzing!</h2>
            <p>Challenge your mind, broaden your horizons, and dive into a world of interactive quizzes. From history buffs to pop culture enthusiasts, our quiz generator empowers you to test your knowledge, discover new insights, and share the excitement with friends.</p>
            <button type="submit" className="link-button">
              <Link to='/register' className="link-button">Explore More</Link>
            </button>
          </div>
        </div>
      </div>
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

export default HomePage;
