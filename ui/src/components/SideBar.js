import React from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import { ProSidebar } from "react-pro-sidebar";
import { useState } from "react";
// import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { grey } from "@mui/material/colors";

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: 'grey',
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };

const SideBar = () => {
    const theme=useTheme();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('Dashboard');
    return (
        <Box 
            sx={{
                "& .pro-sidebar-inner": {
                    background: "#03609C !important"
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important"
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important"
                },
                "& .pro-inner-item:hover": {
                    color: '#868dfb !important' 
                },
                "& .pro-menu-item:active": {
                    color: '#6870fa !important' 
                }
            }}>
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    <MenuItem
                    onClick={()=> setIsCollapsed(!isCollapsed)}
                    icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                    style={{
                        margin:"10px 0 20px 0",
                        color: grey,
                    }}
                    >
                        {!isCollapsed && (
                            <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            ml="15px"
                            >
                                <Typography variant="h3" color='grey'>intopic</Typography>
                                <IconButton onClick={()=>setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                    <Box mb="25px">
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <img
                            alt="profile-user"
                            width="100px"
                            height="100px"
                            src={`../../assets/user.png`}
                            style={{ cursor: "pointer", borderRadius: "50%" }}
                            />
                        </Box>
                        <Box textAlign="center">
                            <Typography
                            variant="h2"
                            color='grey'
                            fontWeight="bold"
                            sx={{ m: "10px 0 0 0" }}
                            >
                            Ed Roh
                            </Typography>
                            
                        </Box>
                    </Box>
                )}

                <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                    <Item
                        title="Dashboard"
                        to="/dashboard"
                        icon={<HomeOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="SharedFolder"
                        to="/sharedfolder"
                        icon={<HomeOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Dashboard"
                        to="/createtopic"
                        icon={<HomeOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default SideBar;