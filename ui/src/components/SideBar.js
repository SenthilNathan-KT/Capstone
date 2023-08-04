import React from "react";
import { useState, useEffect } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, IconButton, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import TopicIcon from '@mui/icons-material/Topic';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';

const Item = ({ title, to, icon, selected, setSelected,onClick, isCollapsed }) => {
  const textColor = selected === title ? "#fe8825" : "#f2f5f7";
  const navigate = useNavigate();

  const handleClick = () => {
    setSelected(title);
    navigate(to);
    if (onClick) {
      onClick(); // Call the onClick prop when the item is clicked
    }
  };

    return (
        // <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div
                onClick={handleClick}
                style={{
                color: textColor,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '5px 35px 5px 20px',
                backgroundColor: selected === title ? '#03609C' : 'transparent',
                '&:hover': {
                    color: '#868dfb',
                },
                '&:active': {
                    color: '#6870fa',
                },
                }}
            >
                {isCollapsed ? (
                    // Display only the icon when the sidebar is collapsed
                    icon
                ) : (
                    // Display the icon and title when the sidebar is not collapsed
                    <>
                    {React.cloneElement(icon, { style: { color: textColor, marginRight: '10px' } })}
                    <Typography fontWeight="bold" fontSize="20px">{title}</Typography>
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

    useEffect(() => {
      const storedUsername = sessionStorage.getItem("userName");
      if (storedUsername) {
        setUserData({ userName: storedUsername });
      }
    }, []);

    const handleClick = (title, to) => {
      setSelected(title);
      navigate(to);
    };
  

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
              overflowy: "auto", 
              width: "300px",
                // margin:0,
            }}
        >
            
        <div
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
                margin: '10px 0 20px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
            }}
        >
        {isCollapsed ? (
          <>
            <IconButton onClick={toggleSidebar}>
              <MenuOutlinedIcon style={{ color: 'white' }} />
            </IconButton>
          </>
        ) : (
          <>
            <img
              alt="Logo"
              src="/assets/images/light theme.png"
              style={{ width: '140px', height: '100px', cursor: 'pointer', marginRight: '10px' }}
            />
            {/* <IconButton onClick={toggleSidebar}>
              <MenuOutlinedIcon style={{ color: 'white',marginLeft: '20px' }} />
            </IconButton> */}
          </>
        )}
      </div>

      
        <Box display="flex" flexDirection="column" justifyContent="center" marginTop="70px" alignItems="center">
            <Box mt="50px">
              <Item
                  title="Dashboard"
                  to="/dashboard"
                  icon={<DashboardIcon style={{ color: 'white', marginRight:'10px' }} />}
                  selected={selected}
                  setSelected={handleClick}
                  isCollapsed={isCollapsed}
              />
            </Box>
            
            <Box mt="20px">
              <Item
                title="Topics"
                to="/topics"
                icon={<SubjectOutlinedIcon style={{ color: 'white', marginRight:'10px' }} />}
                selected={selected}
                setSelected={handleClick}
                isCollapsed={isCollapsed}
              />
            </Box>

            <Box mt="20px">
              <Item
                title="Create Topic"
                to="/createtopic"
                icon={<SubjectOutlinedIcon style={{ color: 'white', marginRight:'10px' }} />}
                selected={selected}
                setSelected={handleClick}
                isCollapsed={isCollapsed}
              />
            </Box>

            {!isCollapsed && (
              <Box mt="250px">
                
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