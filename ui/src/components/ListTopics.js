import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Typography, Paper, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
//import AddIcon from '@mui/icons-material/Add';
import TopBar from './TopBar';
import SideBar from './SideBar';
import axios from 'axios';

const ListTopics = ({ setNotificationCount }) => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const authToken = sessionStorage.getItem('accessToken');
    if (!authToken) {
      navigate('/login');
      return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    console.log('Sending GET request to /topics');
    axios.get('http://localhost:3001/topics')
      .then(response => {
        console.log('Response from /topics:', response.data);
        setTopics(response.data.allTopics);
      })
      .catch(error => {
        console.error('API Error:', error);
      });
  }, []);

  const handleEditTopic = (topic) => {
    setSelectedTopic(topic);
    navigate(`/updatetopic/${topic._id}`, { state: topic });
    triggerNotification();
  };

  const handleDeleteTopic = (topic) => {
    setSelectedTopic(topic);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteTopic = () => {
    axios.delete(`http://localhost:3001/topics/${selectedTopic._id}`)
      .then(() => {
        // Remove the deleted topic from the topics list
        setTopics((prevTopics) => prevTopics.filter((t) => t._id !== selectedTopic._id));
        setIsDeleteModalOpen(false);
        triggerNotification(`Topic "${selectedTopic.title}" has been deleted successfully.`);
      })
      .catch((error) => {
        console.error('Error deleting topic:', error);
      });
  };

  const cancelDeleteTopic = () => {
    setSelectedTopic(null);
    setIsDeleteModalOpen(false);
  };

  const triggerNotification = (message) => {
    const newNotification = { message, seen: false };
    setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    setNotificationCount((prevCount) => prevCount + 1);
  };

  return (
    <Box display="flex">
      <SideBar />
      <Box flex="1" display="flex" flexDirection="column" height="100vh">
        <TopBar notifications={notifications} setNotificationCount={setNotificationCount} />
        <Box m="20px" backgroundColor="white" overflowY="auto" flex="1">
          <Box style={{ padding: "20px", textAlign: "center" }} marginBottom="20px">
            {topics.map(topic => (
              <div key={topic._id} style={{ cursor: 'pointer' }}>
                <Paper key={topic._id} style={{ display: 'flex', alignItems: 'center', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '20px' }}>
                  <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography variant="h6" style={{ marginLeft: '40px', color: '#03609C', }}>{topic.title}</Typography>
                    <Typography variant="body2" style={{ marginLeft: '40px', color: 'grey', }}>No. of Quizzes: {topic.noOfQuizzesAvailable}</Typography>
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

export default ListTopics;
