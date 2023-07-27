import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
//import Footer from './Footer';
import TopBar from './TopBar';
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, IconButton,Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SideBar from './SideBar';
import axios from 'axios';
import MoreVertIcon from '@mui/icons-material/MoreVert';
//import NavHeader from './NavHeader';

const Dashboard = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [editedTitle, setEditedTitle] = useState('');
  // const [editedDescription, setEditedDescription] = useState('');

  const handleJwtExpirationError = (error, navigate) => {
    if (error.response && error.response.status === 403) {
      localStorage.removeItem("accessToken");
      navigate('/login');
    } else {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    // Set the authorization header with the token from localStorage
    const authToken = localStorage.getItem('accessToken');
    if (!authToken) {
      // Token not available yet, handle this case (e.g., redirect to login page)
      navigate('/login'); // Or handle it based on your application's requirements
      return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    console.log('Sending GET request to /topics');
    // Fetch topics data from the server using axios
    axios.get('http://localhost:3001/topics') // Include withCredentials to send cookies (authentication)
      .then(response => {
        console.log('Response from /topics:', response.data);
        setTopics(response.data.allTopics);
      })
      .catch(error => {
        handleJwtExpirationError(error);
        //console.error('Error fetching topics:', error);
        // if (error.response.status === 403) {
        //   navigate('/login');
        // }
      });
  }, []);

  const handleEditTopic = (topic) => {
    setSelectedTopic(topic);
    navigate(`/createtopic/${topic._id}`, { state: topic });
  };

  const handleDeleteTopic = (topic) => {
    setSelectedTopic(topic);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteTopic = () => {
    axios.delete(`http://localhost:3001/topic/${selectedTopic._id}`)
      .then(() => {
        // Remove the deleted topic from the topics list
        setTopics((prevTopics) => prevTopics.filter((t) => t._id !== selectedTopic._id));
        setIsDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error('Error deleting topic:', error);
      });
  };


  const cancelDeleteTopic = () => {
    setSelectedTopic(null);
    setIsDeleteModalOpen(false);
  };
  
  const handleCreateTopic = () => {
    navigate('/createtopic');
  };

  const handleClickTopic = (topicId) => {
    navigate(`/topics/${topicId}`);
  };

  // const handleClickQuiz = () => {
  //   navigate('/createquiz');
  // };

  return (
    <Box display="flex">
      {isNonMobile ? <SideBar /> : null} {/* Sidebar component displayed only on non-mobile devices */}
      <Box flex="1" display="flex" flexDirection="column" height="100vh">
        <TopBar />
        <Box m="20px" backgroundColor="white" overflowY="auto" flex="1">
          <Box style={{ padding: "20px", textAlign: "center" }} marginBottom="20px">
            <IconButton type="button" sx={{ p: 1 }} onClick={handleCreateTopic}>
              <BorderColorOutlinedIcon />
            </IconButton>

            {/* <IconButton type="button" sx={{ p: 1 }} onClick={handleClickQuiz}>
              <EditNoteOutlinedIcon />
            </IconButton> */}
            {topics.map(topic => (
              <div key={topic._id} style={{ cursor: 'pointer' }} onClick={() => handleClickTopic(topic._id)}>
                <Paper key={topic._id} style={{ display: 'flex', alignItems: 'center', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '20px' }}>
                  <img src={topic.image} alt={topic.title} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
                  <Box style={{ display: 'flex', flexDirection: 'column', alignItems:'flex-start' }}>
                    <Typography variant="h6" style={{ marginLeft: '40px' }}>{topic.title}</Typography>
                    <Typography variant="body2" style={{ marginLeft: '40px' }}>No. of Quizzes: {topic.noOfQuizzesAvailable}</Typography>
                  </Box>
                  <IconButton type="button" sx={{ p: 1, marginLeft: 'auto' }} onClick={() => handleEditTopic(topic)}>
                    <BorderColorOutlinedIcon />
                  </IconButton>
                  <IconButton type="button" sx={{ p: 1 }} onClick={() => handleDeleteTopic(topic)}>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </Paper>
              </div>
            ))}
          </Box>
        </Box>
      </Box>
      <Dialog open={isDeleteModalOpen} onClose={cancelDeleteTopic}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          {selectedTopic && (
            <Typography>
              Are you sure you want to delete the topic "{selectedTopic.title}"?
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteTopic}>Cancel</Button>
          <Button onClick={confirmDeleteTopic} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
