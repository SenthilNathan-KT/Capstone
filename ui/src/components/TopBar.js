import React,{useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import InputBase from '@mui/material/InputBase';
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';

const TopBar = () => {
    //const theme=useTheme();
    const [userName, setUserName] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false); 

    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem('accessToken');
        delete axios.defaults.headers.common['Authorization'];
        console.log(axios.defaults.headers.common.Authorization);
        navigate('/login');
      }

    const handlePersonIconClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    

    return (
        <Box display='flex' justifyContent='space-between' p={2} position="relative">
            <Box display='flex' borderRadius='3px'>
                <InputBase sx={{ ml:2, flex:1, color:'#03609C' }} placeholder='Search' />
                <IconButton type='button' sx={{ p:1, color:'#03609C' }}>
                    <SearchIcon />
                </IconButton>
            </Box>
            <Box display='flex'>
                <IconButton type='button' sx={{ p:1, color:'#03609C' }}>
                    <NotificationsOutlinedIcon />
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
            </Box>
        </Box>
    );
};

export default TopBar;