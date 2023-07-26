import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import TopBar from './TopBar';
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, IconButton, useTheme } from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import SideBar from './SideBar';
import axios from 'axios';
import NavHeader from './NavHeader';

const Dashboard = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleClickTopic = () => {
    navigate('/createtopic');
  };

  const handleClickQuiz = () => {
    navigate('/createquiz');
  };

  return (
    <Box display="flex">
      {isNonMobile ? <SideBar /> : null} {/* Sidebar component displayed only on non-mobile devices */}
      <Box flex="1">
        <TopBar />
        <Box m="20px" backgroundColor="white" overflowY="auto">
          <Box style={{ padding: "20px", textAlign: "center" }} marginBottom="20px">
            <IconButton type="button" sx={{ p: 1 }} onClick={handleClickTopic}>
              <BorderColorOutlinedIcon />
            </IconButton>

            <IconButton type="button" sx={{ p: 1 }} onClick={handleClickQuiz}>
              <EditNoteOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
