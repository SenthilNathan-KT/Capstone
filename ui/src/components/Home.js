import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src="/assets/images/dark theme logo.png" alt="Logo" />
          </Link>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Sign Up</Link>
          </li>
        </ul>
        {/* <div className="navbar-language">
          <select>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div> */}
      </nav>
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
            <img src="/assets/images/casual-life-3d-boy-studying-remotely-with-tutor.png" alt="block1" />
          </div>
        </div>
        <div className="block2">
          <div className="block2_1">
            <img src="/assets/images/casual-life-3d-young-woman-studying-magical-pink-gemstone.png" alt="Logo" />
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
      <footer class="footer">
      <div class="footer-container">
        <div class="footer-inner-container">
          <div class="footer-logo">
            <img src="/assets/images/light theme logo.png" alt="Logo" />
          </div>
          <div class="footer-social">
            <a href="#" target="_blank"><i class="fab fa-facebook-f"></i></a>
            <a href="#" target="_blank"><i class="fab fa-twitter"></i></a>
            <a href="#" target="_blank"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div class="footer-links-bottom">
          <div class="footer-links">
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2023 intopic. All rights reserved.</p>
      </div>
      </footer>
    </div>
  );
};

export default HomePage;
