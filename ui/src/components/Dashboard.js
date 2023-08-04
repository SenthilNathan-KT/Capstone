import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, IconButton,Typography,Card, CardContent, Fab,Paper,Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import SideBar from './SideBar';
import axios from 'axios';


const Dashboard = ({ setNotificationCount }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  //const [totalTopics, setTotalTopics] = useState(0);
  const [topicsData, setTopicsData] = useState([]);
  const [topicCount, setTopicCount] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, updateNotificationCount] = useState(0);
  const [loading, setLoading] = useState(true);
  //const unseenNotificationsCount = notifications.filter((notification) => !notification.seen).length;

  const handleJwtExpirationError = (error) => {
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
    axios.get('http://localhost:3001/dashboard')
      .then(response => {
        console.log('Response from /dashboard:', response.data);
        setTopicsData(response.data.allTopics);
        setTopicCount(response.data.topicCount);
        setQuizCount(response.data.quizCount);
        setLoading(false);
      })
      .catch(error => {
        handleJwtExpirationError(error);
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   setTotalTopics(topics.length);
  // }, [topics]);

  const triggerNotification = (message) => {
    const newNotification = { message, seen: false };
    setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    setSearchQuery("");
    updateNotificationCount((prevCount) => prevCount + 1);
  };

  const handleEditTopic = (topic) => {
    setSelectedTopic(topic);
    navigate(`/updatetopic/${topic._id}`, { state: topic });
    triggerNotification();
  };

  const handleDeleteTopic = (topic) => {
    setSelectedTopic(topic);
    setIsDeleteModalOpen(true);
    //triggerNotification();
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
  
  const handleCreateTopic = () => {
    navigate('/createtopic');
    //triggerNotification();
  };

  const handleClickTopic = (topicId) => {
    navigate(`/topics/${topicId}`);
  };

  const filteredTopics = topicsData ? topicsData.filter((topic) => {
    return topic.title.toLowerCase().includes(searchQuery.toLowerCase());
  }) : [];

  

  // const handleClickQuiz = () => {
  //   navigate('/createquiz');
  // };

  return (
    <Box display="flex">
      <Box position="fixed" top={0} left={0} bottom={0} bgcolor="#f5f5f5" zIndex={10}>
        <SideBar />
      </Box>
      {loading ? (
      // Display a loading indicator or a placeholder while loading data
        <Typography>Loading...</Typography>
      ) : (
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
            notifications={notifications} // Pass the notifications state here
            triggerNotification={triggerNotification}
            updateNotificationCount={updateNotificationCount}
            notificationCount={notificationCount}
          />
        </Box>
        <Box m="10px" mt="80px" ml={isNonMobile ? 40 : 0} backgroundColor="white" overflowY="auto" flex="1">
        <Box display="flex" justifyContent="space-around">
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
              <Typography variant="h5" style={{ fontWeight:'bold', marginTop:'60px' }}>{topicCount}</Typography>
              <Typography variant="subtitle1" style={{ marginTop:'50px' }}>Total Topics</Typography>
            </CardContent>
          </Card>
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
              <Typography variant="h5" style={{ fontWeight:'bold', marginTop:'60px' }}>{quizCount}</Typography>
              <Typography variant="subtitle1" style={{ marginTop:'50px' }}>Total Quizzes</Typography>
            </CardContent>
          </Card>
          </Box>
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
            {filteredTopics.map(topic => (
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
      )}
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

export default Dashboard;
