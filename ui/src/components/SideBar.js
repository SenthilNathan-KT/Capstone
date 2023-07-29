import React from "react";
import { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
//import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
//import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Item = ({ title, to, icon, selected, setSelected, isCollapsed }) => {
    const isActive = selected === title; // Check if the item is active
    const textColor = isActive ? "#fe8825" : "#f2f5f7";
    return (
        <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div
                onClick={() => setSelected(title)}
                style={{
                color: textColor,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '5px 35px 5px 20px',
                backgroundColor: isActive ? '#03609C' : 'transparent',
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
                    <Typography>{title}</Typography>
                    </>
                )}
                <Link to={to} />
            </div>
        </Link>
    );
  };

const SideBar = () => {
    //const theme=useTheme();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('Dashboard');

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
      };
    return (
        <Box 
            sx={{
                gridArea: 'sidebar',
                backgroundColor: '#03609C',
                color: 'white',
                p: isCollapsed ? 2 : 6,
                height: "100vh", // Set the height of the sidebar container to 100vh (100% viewport height)
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
              src="/assets/images/light theme logo.png"
              style={{ width: '130px', height: '40px', cursor: 'pointer', marginRight: '10px' }}
            />
            <IconButton onClick={toggleSidebar}>
              <MenuOutlinedIcon style={{ color: 'white',marginLeft: '20px' }} />
            </IconButton>
          </>
        )}
      </div>

      {!isCollapsed && (
        <Box mt="50px">
          <Box display="flex" justifyContent="center" alignItems="center">
            {/* Replace the img tag with AccountCircleIcon */}
            <AccountCircleIcon
              fontSize="large"
              style={{ color: 'white', cursor: 'pointer', borderRadius: '50%', width: '100px', height: '100px' }}
            />
          </Box>
          <Box textAlign="center">
            <Typography variant="h4" color="white" fontWeight="bold" sx={{ m: '10px 0 0 0' }}>
              Deepika Koti
            </Typography>
          </Box>
        </Box>
      )}
        <Box display="flex" flexDirection="column" justifyContent="center" marginTop="70px" alignItems="center">
            <Item
                title="Dashboard"
                to="/dashboard"
                icon={<HomeOutlinedIcon style={{ color: 'white', marginRight:'10px' }} />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={isCollapsed}
            />
            
            <Item
                title="Create Topic"
                to="/createtopic"
                icon={<SubjectOutlinedIcon style={{ color: 'white', marginRight:'10px' }} />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={isCollapsed}
            />
        </Box>
    </Box>
  );
};

export default SideBar;