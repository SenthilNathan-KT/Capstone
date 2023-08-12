import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, IconButton,Typography,Tooltip,Fab, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import SideBar from './SideBar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const TopicDetails = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { topicId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const theme = useTheme();
  const isSidebarCollapsed = useMediaQuery("(max-width: 1215px)");


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
    console.log('Sending GET request to /topics/:topicId');
    axios.get(`http://localhost:3001/topics/${topicId}`)
      .then(response => {
        console.log('Response from /topics/:topicId:', response.data);
        setQuizzes(response.data.quizzes);
        setSelectedTopic(response.data.topic[0]);
        setLoading(false);
        setShowToast(true);
      })
      .catch(error => {
        handleJwtExpirationError(error);
        setLoading(false);
        console.error('Error fetching quizzes:', error);
      });
  }, [topicId, navigate]);

  const handleEditQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    navigate(`/createquiz/${quiz._id}`, { state: quiz });
  };

  const handleDeleteQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteQuiz = () => {
    axios.delete(`http://localhost:3001/topics/${topicId}/quizzes/${selectedQuiz._id}`)
      .then(() => {
        setQuizzes((prevQuizzes) => prevQuizzes.filter((q) => q._id !== selectedQuiz._id));
        setIsDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error('Error deleting Quiz:', error);
      });
  };

  const handleBack = () => {
    //navigate(-1); // This will navigate back to the previous page
    navigate('/dashboard');
  };

  const cancelDeleteQuiz = () => {
    setSelectedQuiz(null);
    setIsDeleteModalOpen(false);
  };

  const handleCreateQuiz = () => {
    navigate(`/topics/${topicId}/quiz`);
  };

  const filteredQuizzes = quizzes
  ? quizzes.filter((quiz) => {
      return quiz.title && quiz.title.toLowerCase().includes(searchQuery.toLowerCase());
    })
  : [];

  return (
    <Box display="flex">
      <Box position='fixed' top={0} left={0} bottom={0} bgcolor="#f5f5f5" zIndex={10}>
        <SideBar />
      </Box>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
      <Box flex="1" display="flex" flexDirection="column" height="100vh">
      <Box
          left={isNonMobile ? 340 : 0}
          bgcolor="#fff"
          ml={isSidebarCollapsed ? 10 : (isNonMobile ? 40 : 0)}
          flexGrow={1}
          p={isNonMobile ? 3 : 0}
          transition="margin-left 0.3s"
        >
          <TopBar
            setSearchQuery={setSearchQuery}
          />
        </Box>
        <Box ml={isSidebarCollapsed ? 10 : 0}>
        <Box 
          m="10px"
          top={0}
          ml={isSidebarCollapsed ? 0 : (isNonMobile ? 40 : 0)}
          width={isSidebarCollapsed ? '100%' : 'auto'}
          backgroundColor="white"
          overflowY="auto"
          flex="1"
          p={isNonMobile ? 3 : 0}
          transition="margin-left 0.3s, width 0.3s"
          zIndex={1} 
        >
          <Box style={{ padding: "20px", textAlign: "center" }} marginBottom="20px">
            <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
              <IconButton type="button" sx={{ p: 1, color:'#03609C' }} onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
              <Tooltip title="Create Quiz" placement="top"
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
                  onClick={handleCreateQuiz}
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
            </Box>
              {selectedTopic && (
                <Box mb="20px">
                  <Typography variant='h5' style={{ marginBottom: '30px', fontWeight:'bold', color:'#03609C' }}>Topic Details</Typography>
                  <img src={selectedTopic.image} alt={selectedTopic.title} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                  <Typography variant="h5" style={{ marginTop: '30px' }}>{selectedTopic.title}</Typography>
                  <Typography variant="body2" style={{ marginTop: '20px' }}>{selectedTopic.description}</Typography>
                </Box>
              )}
              <Typography variant='h5' style={{ textAlign:'left', fontWeight:'bold', marginBottom:'20px', color:'#03609C' }}>Quizzes</Typography>
            {filteredQuizzes.length === 0 ? (
              <Box border="1px solid grey" borderRadius="8px" p="10px" marginTop="40px">
              <Typography variant="body1">No quizzes to show.</Typography>
              </Box>
            ) : (
              filteredQuizzes.map(quiz => (
                <Paper key={quiz._id} style={{ display: 'flex', alignItems: 'center', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '20px' }}>
                  <img src={quiz.image} alt={quiz.title} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
                  <Box style={{ display: 'flex', flexDirection: 'column', alignItems:'flex-start' }}>
                    <Typography variant="h6" style={{ marginLeft: '40px' }}>{quiz.title}</Typography>
                    <Typography variant="body2" style={{ marginLeft: '40px' }}>No. of Questions: {quiz.totalQuestions}</Typography>
                  </Box>
                  <IconButton type="button" sx={{ p: 1, marginLeft: 'auto' }} onClick={() => handleEditQuiz(quiz)} disabled>
                    <BorderColorOutlinedIcon />
                  </IconButton>
                  <IconButton type="button" sx={{ p: 1,color:'#CD5C5C' }} onClick={() => handleDeleteQuiz(quiz)}>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </Paper>
              ))
            )}
          </Box>
          <Snackbar
            open={showToast}
            autoHideDuration={5000} // Adjust the duration as needed
            onClose={() => setShowToast(false)} // Close the toast when it's clicked or auto-hide duration is reached
            message="Quiz created successfully! Download the app to take the quiz."
            // You can customize the appearance of the Snackbar here
          />
        </Box>
        </Box>
      </Box>
      )}
      <Dialog
        open={isDeleteModalOpen}
        onClose={cancelDeleteQuiz}
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
            {selectedQuiz && (
              <Typography variant="body1" style={{ textAlign: 'center' }}>
                Are you sure you want to delete the Quiz {" "}
                <Typography variant="h6" component="span" style={{ fontWeight: 'bold' }}>
                  {selectedQuiz.title}
                </Typography>
                ?
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Box display="flex" justifyContent="center" width="100%" marginBottom={'10px'}>
            <Button onClick={cancelDeleteQuiz} variant="outlined" color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDeleteQuiz} variant="contained" color="error" style={{ marginLeft: '10px' }}>
              Delete
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TopicDetails;
