import React from "react";
import { useState, useEffect } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, IconButton, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import config from '../config';

const Item = ({ title, to, icon, selected, setSelected,onClick, isCollapsed }) => {
  const isActive = selected === title && !isCollapsed;
  //const isActiveCollapsed = selected === title && isCollapsed; // Determine active state for collapsed mode
  const activeColor = '#fe8825';
  const defaultColor = '#f2f5f7';
  const backgroundColor = isActive ? '#03609C' : 'transparent';
  const textColor = isActive ? activeColor : defaultColor;
  const navigate = useNavigate();

  const handleClick = () => {
    if (selected !== title) {
      setSelected(title);
      navigate(to);
    }
    
    if (onClick) {
      onClick(); // Call the onClick prop when the item is clicked
    }
  };

  const baseStyles = {
    color: textColor,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: isCollapsed ? '5px' : '5px 35px 5px 20px',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const hoverStyles = {
    backgroundColor: isActive ? '#03609C' : 'transparent',
    color: isActive ? activeColor : defaultColor,
  };

    return (
        // <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div
        onClick={handleClick}
        style={{
          ...baseStyles,
          ...(isCollapsed ? {} : hoverStyles), // Apply hover styles only when not collapsed
          '&:active': hoverStyles, // Apply active styles
        }}
      >
          {isCollapsed ? (
              // Display only the icon when the sidebar is collapsed
              icon
          ) : (
              // Display the icon and title when the sidebar is not collapsed
              <>
              {React.cloneElement(icon, { style: { color: textColor, marginRight: '10px' } })}
              <Typography fontSize="20px">{title}</Typography>
              </>
          )}
          {/* <Link to={to} /> */}
      </div>
        
    );
  };

const SideBar = () => {
    //const theme=useTheme();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('Dashboard');
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const handleClick = (title, to) => {
      setSelected(title);
      navigate(to);
    };

    useEffect(() => {
      const storedUsername = sessionStorage.getItem("userName");
      if (storedUsername) {
        setUserData({ userName: storedUsername });
      }
      const storedCollapsed = sessionStorage.getItem("sidebarCollapsed");
      if (storedCollapsed !== null) {
        setIsCollapsed(storedCollapsed === "true");
      }
    }, []);

    useEffect(() => {
      const handleWindowResize = () => {
          const screenWidth = window.innerWidth;
          setIsCollapsed(screenWidth <= 960 || screenWidth <= 1215 && screenWidth >= 960);
          // Adjust the breakpoints as needed
      };

      handleWindowResize();
      window.addEventListener("resize", handleWindowResize);

      return () => {
          window.removeEventListener("resize", handleWindowResize);
      };
  }, []);

    useEffect(() => {
      // Store the collapsed state in local storage
      sessionStorage.setItem("sidebarCollapsed", isCollapsed);
    }, [isCollapsed]);

    

    const handleSignOut = () => {
      setUserData(null);
      sessionStorage.removeItem('accessToken');
      delete axios.defaults.headers.common['Authorization'];
      console.log(axios.defaults.headers.common.Authorization);
      navigate('/login');
    }

    const toggleSidebar = () => {
      setIsCollapsed(!isCollapsed);
    };

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gridArea: 'sidebar',
          backgroundColor: '#03609C',
          color: 'white',
          p: isCollapsed ? 2 : 6,
          height: "100vh",
          overflowY: "auto",
          width: isCollapsed ? "70px" : "300px", // Adjusted width based on isCollapsed
          transition: "width 0.3s",
        }}
      >
          <div
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              //margin: '10px 0 20px 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start', // Align items to the top
              cursor: 'pointer',
            }}
          >
            {isCollapsed ? (
              <IconButton onClick={toggleSidebar}>
                <MenuOutlinedIcon style={{ color: 'white' }} />
              </IconButton>
            ) : (
              <>
                <img
                  alt="Logo"
                  src="/assets/images/light theme.png"
                  style={{ width: '140px', height: '100px', cursor: 'pointer' }}
                />
                <IconButton onClick={toggleSidebar}>
                  <MenuOutlinedIcon style={{ color: 'white' }} />
                </IconButton>
              </>
            )}
          </div>

    
        <Box display="flex" flexDirection="column" justifyContent="center" marginTop="70px" alignItems="center">
          <Box mt="50px">
            <Item
                title="Dashboard"
                to="/dashboard"
                icon={<DashboardIcon style={{ color: 'white' }} />}
                selected={selected}
                setSelected={handleClick}
                isCollapsed={isCollapsed}
            />
          </Box>
          
          <Box mt="20px">
            <Item
              title="Topics"
              to="/topics"
              icon={<SubjectOutlinedIcon style={{ color: 'white' }} />}
              selected={selected}
              setSelected={handleClick}
              isCollapsed={isCollapsed}
            />
          </Box>

          <Box mt="20px">
            <Item
              title="Create Topic"
              to="/createtopic"
              icon={<CreateNewFolderIcon style={{ color: 'white' }} />}
              selected={selected}
              setSelected={handleClick}
              isCollapsed={isCollapsed}
            />
          </Box>

          {!isCollapsed && (
            <Box mt="200px">
              
              <Box textAlign="center">
                {userData ? (
                <Typography variant="h5" color="white" fontWeight="bold" sx={{ m: '10px 0 0 0' }}>
                  {userData.userName}
                </Typography>
              ) : (
                <Typography variant="h5" color="white" fontWeight="bold" sx={{ m: '10px 0 0 0' }}>
                  Loading...
                </Typography>
              )}
              </Box>
            </Box>
          )}
          <Box mt="20px">
            <Item
              title="Settings"
              to="/settings"
              icon={<SettingsOutlinedIcon style={{ color: 'white' }} />}
              selected={selected}
              setSelected={handleClick}
              isCollapsed={isCollapsed}
            />
          </Box>
          
          <Box mt="20px">
            <Item
              title="Log Out"
              to="/login"
              icon={
                  <LogoutIcon />
              }
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
              onClick={handleSignOut}
            />
          </Box>
      </Box>
      </Box>
  );
};

export default SideBar; 