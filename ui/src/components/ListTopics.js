import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, IconButton, Typography,Card, CardContent, Paper, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
//import AddIcon from '@mui/icons-material/Add';
import TopBar from './TopBar';
import SideBar from './SideBar';
import axios from 'axios';

const ListTopics = ({ setNotificationCount }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleClickTopic = (topicId) => {
    navigate(`/topics/${topicId}`);
  };

  const triggerNotification = (message) => {
    const newNotification = { message, seen: false };
    setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    setNotificationCount((prevCount) => prevCount + 1);
  };

  return (
    <Box display="flex">
      <Box position="fixed" top={0} left={0} bottom={0} bgcolor="#f5f5f5" zIndex={10}>
        <SideBar />
      </Box>
      <Box flex="1" display="flex" flexDirection="column" height="100vh">
      <Box
          position="fixed"
          top={0}
          left={isNonMobile ? 340 : 0} // Apply left position based on isNonMobile
          right={30}
          zIndex={100}
          bgcolor="#fff"
          boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
        >
          <TopBar
            setSearchQuery={setSearchQuery}
            // notifications={notifications} // Pass the notifications state here
            // triggerNotification={triggerNotification}
            // updateNotificationCount={updateNotificationCount}
            // notificationCount={notificationCount}
          />
        </Box>
        {/* <TopBar notifications={notifications} setNotificationCount={setNotificationCount} /> */}
        <Box m="10px" mt="80px" ml={isNonMobile ? 40 : 0} backgroundColor="white" overflowY="auto" flex="1">
          <Typography variant='h4' style={{ textAlign:'center', fontWeight:'bold', marginTop:'20px', marginBottom:'20px', color:'#03609C' }}>Topics</Typography>
          <Box display="flex" flexWrap="wrap" justifyContent="flex-start">
            {topics.map((topic) => (
              <Card key={topic._id} style={{ margin:'20px', border: "1px solid #cccccc", borderRadius:"15px", marginBottom: isNonMobile ? '20px' : 0, width: isNonMobile ? '30%' : '100%', flexBasis: isNonMobile ? '30%' : '100%', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <CardContent >
                  <Box display="flex" alignItems="center">
                    <Box display="flex" alignItems="center">
                      <img src={topic.image} alt={topic.title} style={{ width: "150px", height: "150px", borderRadius: "50%", marginRight: "10px" }} />
                    </Box>
                    <Box display="flex" flexDirection="column" marginLeft="10px" justifyContent="space-between">
                      <Box style={{ display: 'flex',cursor: 'pointer', flexDirection: 'column', alignItems:'flex-start' }} onClick={() => handleClickTopic(topic._id)}>
                        <Typography variant="h6" style={{ color: "#03609C" }}>
                          {topic.title}
                        </Typography>
                        <Typography variant="body2" style={{ color: "grey", textAlign: "center"  }}>
                          No. of Quizzes: {topic.noOfQuizzesAvailable}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="center" marginTop="20px" alignItems="center">
                        <IconButton type="button" sx={{ p: 1 }} onClick={() => handleEditTopic(topic)}>
                          <BorderColorOutlinedIcon />
                        </IconButton>
                        <IconButton type="button" sx={{ p: 1, color:'#CD5C5C' }} onClick={() => handleDeleteTopic(topic)}>
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </Box>
                    </Box>
                </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
          {/* <Box style={{ padding: "20px", textAlign: "center" }} marginBottom="20px">
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
          </Box> */}
        </Box>
      </Box>
      <Dialog
        open={isDeleteModalOpen}
        onClose={cancelDeleteTopic}
        PaperProps={{
          style: {
            width: '400px',
            height: '260px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            borderRadius: '8px',
          },
        }}
      >

        <DialogContent>
          <Box display="flex" alignItems="center" flexDirection="column">
            <img
              src="/assets/images/indigo-recycling-symbol.png"
              alt="Recycling Symbol"
              style={{ width: '80px', height: '80px', marginBottom: '20px' }}
            />
            {selectedTopic && (
              <Typography variant="body1" style={{ textAlign: 'center' }}>
                Are you sure you want to delete the Topic and related Quizzes in{" "}
                <Typography variant="h6" component="span" style={{ fontWeight: 'bold' }}>
                  {selectedTopic.title}
                </Typography>
                ?
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Box display="flex" justifyContent="center" width="100%" marginBottom={'10px'}>
            <Button onClick={cancelDeleteTopic} variant="outlined" color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDeleteTopic} variant="contained" color="error" style={{ marginLeft: '10px' }}>
              Delete
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListTopics;
