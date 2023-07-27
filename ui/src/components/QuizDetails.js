import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, IconButton,Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SideBar from './SideBar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Dashboard = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedQuiz, setEditedQuiz] = useState('');
  const { topicId } = useParams();

//   const [editedDescription, setEditedDescription] = useState('');

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
    console.log('Sending GET request to /topics/:topicId/quiz/:quizId');
    // Fetch topics data from the server using axios
    axios.get(`http://localhost:3001/topics/${topicId}/quiz`) // Include withCredentials to send cookies (authentication)
      .then(response => {
        console.log('Response from /Quiz:', response.data);
        setQuizzes(response.data.quiz);
      })
      .catch(error => {
        handleJwtExpirationError(error);
        console.error('Error fetching quizzes:', error);
        //console.error('Error fetching topics:', error);
        // if (error.response.status === 403) {
        //   navigate('/login');
        // }
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
    axios.delete(`http://localhost:3001/topics/${topicId}/quiz/${selectedQuiz._id}`)
      .then(() => {
        // Remove the deleted topic from the topics list
        setQuizzes((prevQuizzes) => prevQuizzes.filter((q) => q._id !== selectedQuiz._id));
        setIsDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error('Error deleting Quiz:', error);
      });
  };


  const cancelDeleteQuiz = () => {
    setSelectedQuiz(null);
    setIsDeleteModalOpen(false);
  };

  const handleClickQuiz = () => {
    navigate('/createquiz');
  };

  return (
    <Box display="flex">
      {isNonMobile ? <SideBar /> : null} {/* Sidebar component displayed only on non-mobile devices */}
      <Box flex="1" display="flex" flexDirection="column" height="100vh">
        <TopBar />
        <Box m="20px" backgroundColor="white" overflowY="auto" flex="1">
          <Box style={{ padding: "20px", textAlign: "center" }} marginBottom="20px">
            <IconButton type="button" sx={{ p: 1 }} onClick={handleClickQuiz}>
              <EditNoteOutlinedIcon />
            </IconButton>
            {quizzes.map(quiz => (
              <Paper key={quiz._id} style={{ display: 'flex', alignItems: 'center', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '20px' }}>
                <img src={quiz.image} alt={quiz.title} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
                <Box style={{ display: 'flex', flexDirection: 'column', alignItems:'flex-start' }}>
                  <Typography variant="h6" style={{ marginLeft: '40px' }}>{quiz.title}</Typography>
                  <Typography variant="body2" style={{ marginLeft: '40px' }}>No. of Questions: {quiz.noOfQuestionsAvailable}</Typography>
                </Box>
                <IconButton type="button" sx={{ p: 1, marginLeft: 'auto' }} onClick={() => handleEditQuiz(quiz)}>
                  <BorderColorOutlinedIcon />
                </IconButton>
                <IconButton type="button" sx={{ p: 1 }} onClick={() => handleDeleteQuiz(quiz)}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </Paper>
            ))}
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

export default Dashboard;
