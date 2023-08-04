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
import { styled } from "@mui/material/styles";


const NotificationContainer = styled(Paper)(({ theme }) => ({
    position: "absolute",
    top: "100%",
    right: 0,
    p: 1,
    //marginTop: "10px",
    border: "2px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
    minWidth: "400px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 100,
  }));
  
  const NotificationList = styled("ul")(({ theme }) => ({
    listStyle: "none", // Remove the default list style
    paddingLeft: "16px",
    margin: 0,
    maxHeight: "200px",
    overflowY: "auto",
    padding: "8px",
  }));
  
  const NotificationItem = styled("li")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    marginBottom: "4px",
    paddingBottom: "4px",
    marginLeft: "12px", // Add left margin to the text
    borderBottom: "2px solid grey",
  }));
  
  const NotificationDot = styled("div")(({ theme }) => ({
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "grey", // Change the dot color to grey
    marginRight: "8px",
  }));
  
  
  

const TopBar = ({ setSearchQuery, notifications, triggerNotification,notificationCount, updateNotificationCount }) => {
    //const theme=useTheme();
    const [userName, setUserName] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false); 
    //const unseenNotifications = Array.isArray(notifications) ? notifications.filter((notification) => !notification.seen) : [];
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationsRef = useRef(null);
    const navigate = useNavigate();
    //const classes = useStyles();

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
        if (!showNotifications) {
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
            updateNotificationCount(notificationCount + unseenNotifications.length);
            }
        }
      };

        const [visibleNotifications, setVisibleNotifications] = useState(4);
        const [viewAllNotifications, setViewAllNotifications] = useState(false);


        const handleViewAllNotifications = () => {
            // When "View All Notifications" is clicked, set visibleNotifications to null
            setViewAllNotifications(null);
        };
        
        const notificationsToShow = viewAllNotifications === null
            ? notifications // Show all notifications if viewAllNotifications is true
            : notifications && notifications.slice(0, visibleNotifications); // Show only the first 4 notifications


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
                {/* <IconButton type='button' sx={{ p:1, color:'#03609C' }} onClick={toggleNotifications}>
                {notifications && (
                    <Badge badgeContent={showNotifications ? 0 : (notifications?.length || 0)} color='error'>
                        <NotificationsOutlinedIcon />
                    </Badge>
                )}
                </IconButton> */}
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
        <NotificationContainer>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: "8px", marginBottom: "8px", textAlign: "center" }}>
            Notifications
          </Typography>
          {notificationsToShow.length > 0 ? ( // Check if there are notifications to display
            <NotificationList>
              {notificationsToShow.map((notification, index) => (
                <NotificationItem key={index}>
                  <NotificationDot /> {/* Add the dot before each notification */}
                  {notification.message}
                </NotificationItem>
              ))}
            </NotificationList>
          ) : (
            <Typography variant="body1" sx={{ textAlign: "center", color: "#777" }}>
              No notifications available
            </Typography>
          )}
          {!viewAllNotifications && notifications.length > visibleNotifications && (
            <Box display="flex" justifyContent="center" mt={1} mb={1}>
                {/* "View All Notifications" text with onClick functionality */}
                <Typography
                variant="body1"
                sx={{ color: "#03609C", cursor: "pointer" }}
                onClick={handleViewAllNotifications}
                >
                View All Notifications
                </Typography>
            </Box>
          
          )}
        </NotificationContainer>
      )}

            </Box>
        </Box>
    );
};

export default TopBar;