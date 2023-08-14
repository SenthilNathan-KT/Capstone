import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, IconButton, Typography,Card,Fab, CardContent, Paper, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import TopBar from './TopBar';
import SideBar from './SideBar';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import config from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ListTopics = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isSidebarCollapsed = useMediaQuery("(max-width: 1215px)");
  const [topicCount, setTopicCount] = useState(0);

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
    axios.get(`${config.apiUrl}topics`)
      .then(response => {
        console.log('Response from /topics:', response.data);
        setTopics(response.data.allTopics);
        //setTopicCount(response.data.allTopics.length);
        //showTopicCreatedToast();
      })
      .catch(error => {
        handleJwtExpirationError(error);
        console.error('API Error:', error);
      });
  }, []);

  // const showTopicCreatedToast = () => {
  //   toast.success("Topic created successfully!", {
  //     position: toast.POSITION.TOP_CENTER,
  //     autoClose: 3000, // Close after 3 seconds
  //   });
  // };

  const handleEditTopic = (topic) => {
    setSelectedTopic(topic);
    navigate(`/updatetopic/${topic._id}`, { state: topic });
  };

  const handleDeleteTopic = (topic) => {
    setSelectedTopic(topic);
    setIsDeleteModalOpen(true);
  };

  const handleCreateTopic = () => {
    navigate('/createtopic');
    
  };

  const handleBack = () => {
    navigate(-1);
  }

  const confirmDeleteTopic = () => {
    axios.delete(`${config.apiUrl}topics/${selectedTopic._id}`)
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

  const handleClickTopic = (topicId) => {
    navigate(`/topics/${topicId}`);
  };

  return (
    <Box display="flex">
      <Box position="fixed" top={0} left={0} bottom={0} bgcolor="#f5f5f5" zIndex={10}>
        <SideBar />
      </Box>
      <Box flex="1" display="flex" flexDirection="column">
        <Box
          ml={isSidebarCollapsed ? 10 : (isNonMobile ? 40 : 0)}
          flexGrow={1}
          bgcolor="background.default"
          p={isNonMobile ? 1 : 0}
          transition="margin-left 0.3s"
        >
          <TopBar
            setSearchQuery={setSearchQuery}
          />
        </Box>
        <Box ml={isSidebarCollapsed ? 10 : 0}>
          <Box
            //m="10px"
            //mt="30px"
            ml={isSidebarCollapsed ? 0 : (isNonMobile ? 40 : 0)}
            width={isSidebarCollapsed ? '100%' : 'auto'}
            backgroundColor="white"
            overflowY="auto"
            flex="1"
            p={isNonMobile ? 1 : 0}
            transition="margin-left 0.3s, width 0.3s"
            zIndex={1} 
          >
            <IconButton
            type="button"
            sx={{
              p: 1,
              color: "#03609C",
              mr: "10px",
            }}
              onClick={handleBack}
            >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='h4' style={{ textAlign:'center', fontWeight:'bold', marginTop:'20px', marginBottom:'20px', color:'#03609C' }}>Topics</Typography>
          <Box display="flex" flexWrap="wrap" justifyContent="center">
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
            {topics.length === 0 ? (
              <Box
                height="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="h6" color="textSecondary" paddingTop="240px">
                  No topics to show.
                </Typography>
              </Box>
            ) : (
              <>
            {topics.map((topic) => (
              <Card 
                key={topic._id} 
                style={{ 
                  margin: '5px',
                  border: '1px solid #cccccc',
                  borderRadius: '15px',
                  marginBottom: isNonMobile ? '20px' : 0,
                  width: isNonMobile ? 'calc(33.33% - 10px)' : '100%', // Display 3 topics per row above 1012px
                  flexBasis: isNonMobile ? '50%' : '100%', // Display 2 topics per row between 650px and 1012px
                  //flexGrow: 1,
                  maxWidth: isNonMobile ? '350px' : '100%',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', }}>
                <CardContent 
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    //justifyContent: "space-between",
                    padding: "20px", // Add padding for spacing
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Box display="flex" width="120px">
                      <img src={topic.image} alt={topic.title} 
                        style={{ 
                          maxWidth: '100%',
                              height: 'auto',
                              borderRadius: '50%',
                              //paddingRight: '20px',
                              //width: '130px', // Set a fixed width for the image
                              flexShrink: 0, 

                          }} 
                      />
                    </Box>
                    <Box 
                      display="flex" 
                      flexDirection="column"  
                      justifyContent="space-between" 
                      flexGrow={1}
                      marginLeft="20px"
                      >
                      <Box style={{ 
                        display: 'flex',
                        cursor: 'pointer', 
                        flexDirection: 'column', 
                        //justifyContent:'flex-start',
                        //width:"80px" 
                        }} 
                        onClick={() => handleClickTopic(topic._id)}>
                        <Typography 
                          variant="h6"
                          style={{
                            color: "#03609C",
                            textAlign:"center",
                            flex:"1",
                            wordWrap: "break-word",
                            fontSize: topic.title.length > 15 ? "12px" : "inherit",
                          }}
                        >
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
            {/* </Box>
            </Box> */}
            </>
            )}
          </Box>
          
          </Box>
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
      <ToastContainer position="top-center" autoClose={3000} />
    </Box>
  );
};

export default ListTopics;
