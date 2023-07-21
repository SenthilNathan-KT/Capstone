import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import '../App.css';
// import NavHeader from './NavHeader'; 
import Footer from './Footer'; 
import TopBar from './TopBar';
import { Box, IconButton, useTheme } from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
//import SideBar from './SideBar';
import axios from 'axios';
//import SharedFolder from './SharedFolder';
//import CreateTopic from './CreateTopic';
import NavHeader from './NavHeader';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const handleClickTopic = () => {
    // Handle the click event here
    console.log('Icon clicked!');
    navigate('/createtopic');
  };

  const handleClickQuiz = () => {
    // Handle the click event here
    console.log('Icon clicked!');
    navigate('/createquiz');
  };

  return (
    <div className="home-page">
      <NavHeader />
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
          {/* <div className="block2_2">
            <h2>Choose a topic, ignite your curiosity, and start quizzing!</h2>
            <p>Challenge your mind, broaden your horizons, and dive into a world of interactive quizzes. From history buffs to pop culture enthusiasts, our quiz generator empowers you to test your knowledge, discover new insights, and share the excitement with friends.</p>
            <button type="submit" className="link-button">
              <Link to='/register' className="link-button">Explore More</Link>
            </button>
          </div> */}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
