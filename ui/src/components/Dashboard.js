import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, IconButton,Typography,Card, CardContent, Fab,Paper,Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import SideBar from './SideBar';
import axios from 'axios';


const Dashboard = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [totalTopics, setTotalTopics] = useState(0);

  const handleJwtExpirationError = (error, navigate) => {
    if (error.response && error.response.status === 403) {
      sessionStorage.removeItem("accessToken");
      navigate('/login');
    } else {
      console.error("API Error:", error);
    }
  };

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
        handleJwtExpirationError(error);
      });
  }, []);

  useEffect(() => {
    setTotalTopics(topics.length);
  }, [topics]);

  const handleEditTopic = (topic) => {
    setSelectedTopic(topic);
    navigate(`/updatetopic/${topic._id}`, { state: topic });
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
          <Card variant="outlined" 
            style={{  
              color:'#03609C',
              margin: '20px', 
              textAlign: 'center', 
              width:'350px',
              height:'200px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}>
            <CardContent>
              <Typography variant="h5" style={{ fontWeight:'bold', marginTop:'60px' }}>{totalTopics}</Typography>
              <Typography variant="subtitle1" style={{ marginTop:'50px' }}>Total Topics</Typography>
            </CardContent>
          </Card>
          <Box style={{ padding: "20px", textAlign: "center" }} marginBottom="20px">
          <Tooltip title="Create Topic" placement="top"
            sx={{
              backgroundColor: "none",
              color: "#03609C",
              fontSize: "14px",
              fontWeight: "bold",
            }}>
            <Fab
                backgroundColor='#03609C'
                color="white"
                aria-label="add"
                style={{
                  position: "fixed",
                  bottom: "20px",
                  right: "20px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
                onClick={handleCreateTopic}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
            {/* <IconButton type="button" sx={{ p: 1 }} onClick={handleClickQuiz}>
              <EditNoteOutlinedIcon />
            </IconButton> */}
            {topics.map(topic => (
              <div key={topic._id} style={{ cursor: 'pointer' }}>
                <Paper key={topic._id} style={{ display: 'flex', alignItems: 'center', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '20px' }}>
                  <img src={topic.image} alt={topic.title} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
                  <Box style={{ display: 'flex', flexDirection: 'column', alignItems:'flex-start' }} onClick={() => handleClickTopic(topic._id)}>
                    <Typography variant="h6" style={{ marginLeft: '40px', color:'#03609C', }}>{topic.title}</Typography>
                    <Typography variant="body2" style={{ marginLeft: '40px', color:'grey', }}>No. of Quizzes: {topic.noOfQuizzesAvailable}</Typography>
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
