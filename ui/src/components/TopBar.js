import React,{useState, useEffect, useRef} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Box, IconButton,Badge, Typography, Paper } from '@mui/material';
import InputBase from '@mui/material/InputBase';
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';

const TopBar = ({ setSearchQuery, notifications, triggerNotification }) => {
    //const theme=useTheme();
    const [userName, setUserName] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false); 
    //const unseenNotifications = Array.isArray(notifications) ? notifications.filter((notification) => !notification.seen) : [];
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationsRef = useRef(null);
    const navigate = useNavigate();

    const handleSearchInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
      };

    const handleLogout = () => {
        sessionStorage.removeItem('accessToken');
        delete axios.defaults.headers.common['Authorization'];
        console.log(axios.defaults.headers.common.Authorization);
        navigate('/login');
      }

    const handlePersonIconClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const clearNotifications = () => {
        triggerNotification([]);
    };

    useEffect(() => {
        const handleDocumentClick = (event) => {
          // Close notifications when a click occurs outside the notifications area
          if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
            setShowNotifications(false);
          }
        };
        document.addEventListener("click", handleDocumentClick);
        return () => {
          document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    const toggleNotifications = () => {
        setShowNotifications((prev) => !prev);
        // Mark all unseen notifications as seen when displaying the notifications
        const unseenNotifications = notifications.filter((notification) => !notification.seen);
        if (unseenNotifications.length > 0) {
          const updatedNotifications = notifications.map((notification) => {
            return {
              ...notification,
              seen: true,
            };
          });
          // Call the triggerNotification function to update notifications state
          triggerNotification(updatedNotifications);
        }
      };

    return (
        <Box display='flex' justifyContent='space-between' p={2} position="relative">
            <Box display='flex' borderRadius='3px'>
                <InputBase 
                    sx={{ ml:2, flex:1, color:'#03609C' }} 
                    placeholder='Search' 
                    onChange={handleSearchInputChange} />
                <IconButton type='button' sx={{ p:1, color:'#03609C' }}>
                    <SearchIcon />
                </IconButton>
            </Box>
            <Box display='flex' ref={notificationsRef}>
                <IconButton type='button' sx={{ p:1, color:'#03609C' }} onClick={toggleNotifications}>
                {notifications && (
                    <Badge badgeContent={showNotifications ? 0 : (notifications?.length || 0)} color='error'>
                        <NotificationsOutlinedIcon />
                    </Badge>
                )}
                </IconButton>
                <IconButton type='button' sx={{ p:1, color:'#03609C' }}>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton 
                    type='button' 
                    sx={{ p:1, color:'#03609C' }} 
                    onClick={handlePersonIconClick}
                    onMouseEnter={() => setIsHovered(true)} // Set isHovered to true when mouse enters the icon
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <PersonOutlinedIcon />
                </IconButton>
                {isDropdownOpen && (
                <Box
                    position='absolute'
                    top='100%'
                    right={0}
                    p={1}
                    mt={1}
                    border='1px solid #ccc'
                    borderRadius='4px'
                    backgroundColor='#fff'
                >
                    
                    <Box py={1} textAlign="center">
                        <Link 
                            to="/login" 
                            onClick={handleLogout} 
                            style={{ 
                                display: "flex", 
                                alignItems: "center", 
                                color:isHovered ? '#4682B4' : '#03609C',
                                fontWeight:'bold',
                                textDecoration:'none'
                                 }}
                                 onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                >
                            <LogoutIcon sx={{ mr: 1 }} /> Logout
                        </Link>
                    </Box>
                </Box>
                )}
                {showNotifications && (
                <Box
                    //ref={notificationsRef}
                    position="absolute"
                    top="100%"
                    right={0}
                    p={1}
                    mt={1}
                    border="1px solid #ccc"
                    borderRadius="4px"
                    backgroundColor="#fff"
                >
                    <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", marginBottom: "8px" }}
                    >
                    Notifications
                    </Typography>
                    <Paper
                    variant="outlined"
                    sx={{ maxHeight: "200px", overflowY: "auto", padding: "8px" }}
                    >
                    {notifications.map((notification, index) => (
                        <Typography key={index} variant="body1" sx={{ marginBottom: '4px' }}>
                        {notification.message}
                        </Typography>
                    ))}
                    </Paper>
                    <Box display="flex" justifyContent="center" mt={2}>
                    <Link
                        to="#"
                        onClick={clearNotifications}
                        style={{ textDecoration: "none", color: "#03609C" }}
                    >
                        Clear All
                    </Link>
                    </Box>
                </Box>
                )}
            </Box>
        </Box>
    );
};

export default TopBar;