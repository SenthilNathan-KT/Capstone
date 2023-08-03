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

const TopicDetails = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { topicId } = useParams();

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
      })
      .catch(error => {
        handleJwtExpirationError(error);
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

  return (
    <Box display="flex">
      {isNonMobile ? <SideBar /> : null} 
      <Box flex="1" display="flex" flexDirection="column" height="100vh">
        <TopBar />
        <Box m="20px" backgroundColor="white" overflowY="auto" flex="1">
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
            {quizzes.length === 0 ? (
              <Typography variant="body1">No quizzes to show.</Typography>
            ) : (
              quizzes.map(quiz => (
                <Paper key={quiz._id} style={{ display: 'flex', alignItems: 'center', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '20px' }}>
                  <img src={quiz.image} alt={quiz.title} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
                  <Box style={{ display: 'flex', flexDirection: 'column', alignItems:'flex-start' }}>
                    <Typography variant="h6" style={{ marginLeft: '40px' }}>{quiz.title}</Typography>
                    <Typography variant="body2" style={{ marginLeft: '40px' }}>No. of Questions: {quiz.totalQuestions}</Typography>
                  </Box>
                  <IconButton type="button" sx={{ p: 1, marginLeft: 'auto' }} onClick={() => handleEditQuiz(quiz)} disabled>
                    <BorderColorOutlinedIcon />
                  </IconButton>
                  <IconButton type="button" sx={{ p: 1 }} onClick={() => handleDeleteQuiz(quiz)}>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </Paper>
              ))
            )}
          </Box>
        </Box>
      </Box>
      <Dialog open={isDeleteModalOpen} onClose={cancelDeleteQuiz}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          {selectedQuiz && (
            <Typography>
              Are you sure you want to delete the Quiz "{selectedQuiz.title}"?
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteQuiz}>Cancel</Button>
          <Button onClick={confirmDeleteQuiz} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TopicDetails;
