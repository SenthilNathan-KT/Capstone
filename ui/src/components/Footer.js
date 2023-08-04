import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

const Footer = () => {
  return (
    <Box sx={styles.footer}>
      <div className="footer-container" sx={styles.footerContainer}>
        <div className="footer-inner-container" sx={styles.footerColumn}>
          <div className="footer-logo" sx={styles.footerLogo}>
            <img src="/assets/images/light theme logo.png" alt="Logo" />
          </div>
          <div className="footer-social" sx={styles.footerSocial}>
            <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div className="footer-links-bottom" sx={styles.footerColumn}>
          <div>
            <ul sx={styles.footerLinks}>
              <li sx={styles.footerLink}><Link to="/">Home</Link></li>
              <li sx={styles.footerLink}><Link to="/about">About</Link></li>
              <li sx={styles.footerLink}><Link to="/services">Services</Link></li>
              <li sx={styles.footerLink}><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom" sx={styles.footerBottom}>
        <p>&copy; 2023 intopic. All rights reserved.</p>
      </div>
    </Box>
  );
};

const styles = {
  footer: {
    backgroundColor: '#03609C',
    color: '#9AC9DC',
    padding: '20px',
    textAlign: 'center',
  },
  // footerContainer: {
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   flexWrap: 'wrap', // Allow items to wrap to the next line
  //   maxWidth: '1200px',
  //   margin: '0 auto',
  // },
  // footerColumn: {
  //   width: '50%', // Each column takes 50% width in two-column layout
  // },
  // footerLogo: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   '& img': {
  //     width: '180px',
  //     height: '40px',
  //     marginRight: '10px',
  //   },
  // },
  // footerSocial: {
  //   '& a': {
  //     color: '#9AC9DC',
  //     textDecoration: 'none', 
  //     fontSize: '24px',
  //     margin: '0 10px',
  //   },
  // },
  // footerBottom: {
  //   marginTop: '20px',
  //   borderTop: '1px solid #9AC9DC',
  //   paddingTop: '10px',
  //   fontSize: '14px',
  // },
  // footerLinks: {
  //   listStyle: 'none',
  //   padding: 0,
  //   margin: 0,
  //   display: 'flex', 
  // },
  // footerLink: {
  //   margin: '0 10px',
  //   '& a': {
  //     color: '#9AC9DC', 
  //     textDecoration: 'none', 
  //     fontSize: '20px',
  //     textTransform: 'uppercase',
  //     fontFamily: 'Roboto Mono, monospace',
  //     padding: '10px', 
  //   },
  // },
};

export default Footer;
