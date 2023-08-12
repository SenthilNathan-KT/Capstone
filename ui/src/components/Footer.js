import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

const Footer = () => {
  return (
    <Paper sx={styles.footer}>
      <Container maxWidth="lg">
        <Box display="flex" flexDirection="column" alignItems="center" py={3}>
          <Box display="flex" alignItems="center">
            <img src="/assets/images/light theme logo.png" alt="Logo" sx={styles.logo} />
          </Box>
          <Box display="flex" alignItems="center" mt={2} sx={styles.socialIcons}>
            <IconButton href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </IconButton>
            <IconButton href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </IconButton>
            <IconButton href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </IconButton>
          </Box>
          
        </Box>
      </Container>
      <Box sx={styles.footerBottom}>
        <Typography variant="body2">&copy; 2023 intopic. All rights reserved.</Typography>
      </Box>
    </Paper>
  );
};

const styles = {
  footer: {
    backgroundColor: '#03609C',
    color: '#9AC9DC',
    textAlign: 'center',
  },
  logo: {
    width: '130px',
    height: '30px',
  },
  socialIcons: {
    '& .MuiIconButton-root': {
      color: '#9AC9DC',
      margin: '0 8px',
    },
  },
  footerBottom: {
    borderTop: '1px solid #9AC9DC',
    py: 2,
  },
};

export default Footer;
