import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import '../App.css';
import NavHeader from './NavHeader'; 
import Footer from './Footer'; 

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
      
      <Footer />
    </div>
  );
};

export default HomePage;
