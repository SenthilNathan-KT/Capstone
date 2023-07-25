import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import '../App.css';
import Footer from './Footer'; 
import TopBar from './TopBar';
import { Box, IconButton, useTheme } from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
//import SideBar from './SideBar';
import axios from 'axios';
import NavHeader from './NavHeader';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleClickTopic = () => {  
    navigate('/createtopic');
  };

  const handleClickQuiz = () => {
    navigate('/createquiz');
  };

  return (
    <div className="home-page">
      {/* <NavHeader /> */}
      
      <div className="content">
      <TopBar />
        <div className="block1">
        <IconButton type='button' sx={{ p:1 }} onClick={handleClickTopic}>
            <BorderColorOutlinedIcon  />
        </IconButton>

        <IconButton type='button' sx={{ p:1 }} onClick={handleClickQuiz}>
            <EditNoteOutlinedIcon  />
        </IconButton>
        </div>
        <div className="block2">
          <div className="block2_1">
            <img src="/assets/images/3d-casual-life-time-management (1).png" alt="Logo" />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
