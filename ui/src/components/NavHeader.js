import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

const NavHeader = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };  
    
  return (
    <Box sx={styles.navHeader}>
      <Box sx={styles.navbar}>
        <Box component={Link} to="/" sx={styles.navbarLogo}>
          <img src="/assets/images/dark theme logo.png" alt="Logo" style={styles.logoImage} />
        </Box>
        <Box sx={styles.navbarLinks}>
            {/* <Box component="li" sx={styles.navbarItem}>
                <Link to="/about" style={styles.navLink}>About</Link>
            </Box> */}
            <Box component="li" sx={styles.navbarItem}>
                <button onClick={handleLogin} style={styles.loginButton}>Login</button>
            </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
    navHeader: {
        backgroundColor: 'white',
        padding: '20px',
        width: '100%',
        height: '80px',
        fontFamily: 'Roboto, sans-serif',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    navbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      //maxWidth: '1200px',
      margin: '0 40px',
    },
    navbarLogo: {
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
      },
      logoImage: {
        height: '40px',
        marginRight: '80px',
      },
    navbarLinks: {
      listStyle: 'none',
      display: 'flex',
      padding: 0,
      alignItems: 'center', // Center items vertically
      fontWeight: 'bold', // Make the items bold
    },
    navbarItem: {
      marginLeft: '20px',
      '&:first-of-type': { // Change to ":first-of-type"
        marginLeft: '0',
      },
    },
    navLink: {
      color: '#03609C', // Change text color to #03609C
      textDecoration: 'none',
    },
    loginButton: {
      color: '#fff',
      backgroundColor: '#03609C', // Change the background color of the button
      border: 'none',
      padding: '8px 15px',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

    export default NavHeader;
