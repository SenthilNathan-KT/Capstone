import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import NavHeader from './NavHeader';
import Footer from './Footer';
import config from '../config';

const HomePage = () => {
  return (
    <Box className="home-page">
      <NavHeader />
      <Box sx={styles.content}>
        <Box sx={styles.block}>
          <Box sx={styles.blockContent}>
            <h2>Explore and Create Personalized Quizzes!</h2>
            <p>Challenge your mind, broaden your horizons, and dive into a world of interactive quizzes. From history buffs to pop culture enthusiasts, our quiz generator empowers you to test your knowledge, discover new insights, and share the excitement with friends.</p>
            <button type="submit" className="link-button">
              <Link to='/register' style={styles.linkButton}>Get Started</Link>
            </button>
          </Box>
          <Box sx={styles.blockImage}>
            <img src="/assets/images/3d-casual-life-time-management (1).png" alt="block1" />
          </Box>
        </Box>
        <Box sx={styles.block}>
          <Box sx={styles.blockImage}>
            <img src="/assets/images/casual-life-3d-girl-sitting-on-floor-with-laptop-and-studying.png" alt="Logo" />
          </Box>
          <Box sx={styles.blockContent}>
            <h2>Choose a topic, ignite your curiosity, and start quizzing!</h2>
            <p>Challenge your mind, broaden your horizons, and dive into a world of interactive quizzes. From history buffs to pop culture enthusiasts, our quiz generator empowers you to test your knowledge, discover new insights, and share the excitement with friends.</p>
            <button type="submit" className="link-button">
              <Link to='/register' style={styles.linkButton}>Explore More</Link>
            </button>
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

const styles = {
  body: {
    margin: '0px', // Add margin to the body
  },
  content: {
    //maxWidth: '1200px',
    margin: '80px',
  },
  block: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '40px 0 80px 0',
    '@media (max-width: 650px)': {
      flexDirection: 'column-reverse',
    },
  },
  blockContent: {
    flex: 1,
    textAlign: 'left',
    padding: '20px',
  },
  blockImage: {
    flex: 1,
    textAlign: 'center',
    marginBottom: '20px',
    img: {
      width: '450px',
      height: 'auto',
    },
    '@media (max-width: 1024px)': {
      textAlign: 'center',
      img: {
        width: '100%', // Adjust image width for smaller screens
      },
    },
  },
  linkButton: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#03609C', // Orange color for the button background
    color: '#fff', // White text color
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#e63c00', // Darker shade on hover
    },
  },
};


export default HomePage;
