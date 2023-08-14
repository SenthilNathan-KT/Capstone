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

const Item = ({ title, to, icon, selected, selectedItem, onClick, isCollapsed }) => {
  let isActive = selected === title && !isCollapsed;
  //const isActiveCollapsed = selected === title && isCollapsed; // Determine active state for collapsed mode
  const activeColor = '#fe8825';
  const defaultColor = '#f2f5f7';
  const backgroundColor = isActive ? '#03609C' : 'transparent';
  let textColor = isActive ? activeColor : defaultColor;
  const navigate = useNavigate();

  const [selectedNavItem, setSelectedNavItem] = useState('Dashboard');
  

  let hoverStyles = {
    color: isActive ? activeColor : defaultColor,
  };

  const handleClick = (e, selectedTitle) => {
    console.log(to, 'toooo')
    navigate(to);
    // isActive = selected === title && !isCollapsed;
    isActive = selectedTitle === title;
    sessionStorage.setItem('selectedTitle', selectedTitle);
    //console.log(sessionStorage.getItem('selectedTitle'), selectedTitle, title, 'selectedTitle === title')
    setSelectedNavItem(sessionStorage.getItem('selectedTitle'));
    // selectedItem(title);
    textColor = isActive ? activeColor : defaultColor;
    hoverStyles = {
      color: isActive ? activeColor : defaultColor,
    };
    if(to === '/login') {
      console.log('handleSignOut called');
      // setUserData(null);
      sessionStorage.removeItem('accessToken');
      delete axios.defaults.headers.common['Authorization'];
      console.log(axios.defaults.headers.common.Authorization);
      navigate('/login');
    }
    // if (onClick) {
    //   onClick(); // Call the onClick prop when the item is clicked
    // }
  };

  const baseStyles = {
    color: textColor,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: isCollapsed ? '5px' : '5px 35px 5px 20px',
    transition: 'background-color 0.3s, color 0.3s',
  };

  //console.log(sessionStorage.getItem('selectedTitle'), title, textColor, 'textColor')

    return (
        // <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div
        onClick={(e) => handleClick(e, title)}
        style={{
          ...baseStyles,
          ...(isCollapsed ? {} : hoverStyles), // Apply hover styles only when not collapsed
          '&:active': hoverStyles, // Apply active styles
        }}
      >
          {isCollapsed ? (
              // Display only the icon when the sidebar is collapsed
              <>
                {React.cloneElement(icon, { style: { color: sessionStorage.getItem('selectedTitle') === title ? activeColor : defaultColor, marginRight: '10px' } })}
              </>
          ) : (
              // Display the icon and title when the sidebar is not collapsed
              <>
              {React.cloneElement(icon, { style: { color: sessionStorage.getItem('selectedTitle') === title ? activeColor : defaultColor, marginRight: '10px' } })}
              <Typography fontSize="20px" style={{ color: sessionStorage.getItem('selectedTitle') === title ? activeColor : defaultColor }}>{title}</Typography>
              </>
          )}
          {/* <Link to={to} /> */}
      </div>
        
    );
  };

const SideBar = (props) => {
    //const theme=useTheme();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('');
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const storedUsername = sessionStorage.getItem("userName");
      if (storedUsername) {
        setUserData({ userName: storedUsername });
      }
      const storedCollapsed = sessionStorage.getItem("sidebarCollapsed");
      if (storedCollapsed !== null) {
        setIsCollapsed(storedCollapsed === "true");
      }
      setSelected('Dashboard');
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
    if(props.userName) {
      setUserData({ userName: props.userName });
    }
    console.log(sessionStorage.getItem("userName"), props.userName, 'sessionStorage.getItem("userName")')
  }, [props.userName])

    useEffect(() => {
      // Store the collapsed state in local storage
      sessionStorage.setItem("sidebarCollapsed", isCollapsed);
    }, [isCollapsed]);

    // const handleClick = (title, to) => {
    //   console.log(title, to, 'title, to')
    //   setSelected(title);
    //   navigate(to);
    // };

    const handleSignOut = () => {
      console.log('handleSignOut called');
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
                // selectedItem={handleClick}
                selectedItem={'Hello'}
                isCollapsed={isCollapsed}
            />
          </Box>
          
          <Box mt="20px">
            <Item
              title="Topics"
              to="/topics"
              icon={<SubjectOutlinedIcon style={{ color: 'white' }} />}
              selected={selected}
              // selectedItem={handleClick}
                selectedItem={'Hello'}
              isCollapsed={isCollapsed}
            />
          </Box>

          <Box mt="20px">
            <Item
              title="Create Topic"
              to="/createtopic"
              icon={<CreateNewFolderIcon style={{ color: 'white' }} />}
              selected={selected}
              // selectedItem={handleClick}
                selectedItem={'Hello'}
              isCollapsed={isCollapsed}
            />
          </Box>

          {!isCollapsed && (
            <Box mt="160px">
              
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
              // selectedItem={handleClick}
                selectedItem={'Hello'}
              isCollapsed={isCollapsed}
            />
          </Box>
          
          <Box mt="60px">
            <Item
              title="Log Out"
              to="/login"
              icon={
                  <LogoutIcon />
              }
              selected={selected}
              selectedItem={setSelected}
              isCollapsed={isCollapsed}
              onClick={handleSignOut}
            />
          </Box>
      </Box>
      </Box>
  );
};

export default SideBar; 