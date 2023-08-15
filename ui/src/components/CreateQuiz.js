//import { useState } from "react";
import { Box, Button, IconButton, TextField,Avatar,Dialog,DialogTitle, DialogContent, DialogActions, Typography, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Formik } from "formik";
import {object, string} from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from '@mui/material/styles';
import config from '../config';
import CircularProgress from '@mui/material/CircularProgress';


const Form = () => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [searchQuery, setSearchQuery] = useState('');
  const { topicId } = useParams();
  const theme = useTheme();
  const isSidebarCollapsed = useMediaQuery("(max-width: 1215px)");
  const [isLoading, setIsLoading] = useState(false);


  const handleJwtExpirationError = (error) => {
    if (error.response && error.response.status === 403) {
      sessionStorage.removeItem("accessToken");
      navigate('/login');
    } else {
      console.error("API Error:", error);
    }
  };
  
  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    console.log("Form submitted:", sessionStorage.getItem("accessToken"));
    const authToken = sessionStorage.getItem("accessToken");
    console.log("Auth Token:", authToken);

    if (authToken) {
      if (!isImageUploaded) {
        values.image = "/assets/images/default.png";
      } else {
        values.image = base64Image;
      }
      try {
        const configAuth = {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        };
        

        const selectedTopic = topicId;
        const response = await axios.post(`${config.apiUrl}topics/${topicId}/quiz`, values, configAuth);
        //const { topicId: createdTopicId } = response.data;
        // const response = await axios.post("http://localhost:3001/quiz", values);
        console.log("Quiz created:", response.data);
        
        values.title= "";
        values.description= "";
        values.numQuestions= "";
        setBase64Image("");
        setIsImageUploaded(false);
        setIsLoading(false);
        navigate(`/topics/${selectedTopic}`);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } catch (error) {
        handleJwtExpirationError(error);
        setIsLoading(false);
        toast.error(error.response.data.message[0], {
          position: toast.POSITION.TOP_CENTER,
        });
        console.error("Error creating quiz:", error);
      }
    } else {
      // Handle the case when the authToken is not valid or doesn't exist
      console.error("Invalid or missing authToken. Please log in again.");
    }
  };

  const [base64Image, setBase64Image] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const handleImageChange = (event) => {
    //setSelectedImage(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // The 'result' property contains the base64-encoded image
        const base64String = reader.result;
        setBase64Image(base64String);
        setIsImageUploaded(true);
      };

      // Read the file as a data URL, which will trigger the 'onloadend' event
      reader.readAsDataURL(file);
    }
  };

  const [wordCount, setWordCount] = useState(0);

  const getWordCount = (text) => {
    const words = text.trim().split(/\s+/);
    return words.length;
  };
  
  const handleCancel = () => {
    navigate(-1);
    // navigate("/dashboard");
  };

  const handleBack = () => {
    navigate(-1);
  }

  const initialValues = {
    title: "",
    description: "",
    numQuestions: "",
  };

  const checkoutSchema = object().shape({
    title: string().required("Quiz name is required"),
    description: string()
    .required("Quiz text is required")
    .test("minWords", "Quiz text must have at least 100 words", (value) => getWordCount(value) >= 100)
    .test("maxWords", "Quiz text exceeds more than 500 words", (value) => getWordCount(value) <= 500),
    numQuestions: 
      string()
      .required("Invalid number of questions")
  });

 

  return (
    <Box display="flex">
      <Box position="fixed" top={0} left={0} bottom={0} bgcolor="#f5f5f5" zIndex={10}>
        <SideBar />
      </Box> 
      <Box flex="1">
        
        <Box ml={isSidebarCollapsed ? 10 : 0}>
        <Box 
          m="10px"
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
          <Box style={{ padding: "20px", textAlign: "center" }} marginBottom="20px">
            <h2>CREATE QUIZ</h2>
            <label htmlFor="image-upload">
              <Avatar
                src={isImageUploaded ? base64Image : "/assets/images/default.png"}
                alt="User Profile"
                sx={{ width: 100, height: 100, marginTop: 10, cursor: "pointer" }}
              />
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>
          </Box>

          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Quiz Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    name="title"
                    error={!!touched.title && !!errors.title}
                    helperText={touched.title && errors.title}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <Box gridColumn="span 4">
                    <FormControl fullWidth variant="filled" sx={{ flexDirection: "row" }}>
                      <InputLabel htmlFor="quiz-text" shrink>
                        Quiz Text
                      </InputLabel>
                      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                        <TextField
                          fullWidth
                          multiline
                          rows={6}
                          variant="filled"
                          id="quiz-text"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                            setWordCount(getWordCount(e.target.value));
                          }}
                          value={values.description}
                          name="description"
                          error={
                            !!touched.description &&
                            (!!errors.description || getWordCount(values.description) > 500)
                          }
                          helperText={touched.description && errors.description}
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="caption" sx={{ textAlign: "right" }}>
                          Min 100, Max 500 words. Current {wordCount} words
                        </Typography>
                      </Box>
                    </FormControl>
                  </Box>
                  
                  <Box display="flex" gap="20px" sx={{ gridColumn: "span 4" }}>
                  <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
                    <InputLabel id="num-questions-label">Number of Questions</InputLabel>
                    <Select
                      labelId="num-questions-label"
                      id="num-questions"
                      value={values.numQuestions || ''}
                      name="numQuestions"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.numQuestions && !!errors.numQuestions}
                    >
                      <MenuItem value="">Select Number</MenuItem>
                      <MenuItem value="5">5</MenuItem>
                      <MenuItem value="10">10</MenuItem>
                      <MenuItem value="15">15</MenuItem>
                    </Select>
                  </FormControl>
                  
                  </Box>
                  
                </Box>
                <Box display="flex" justifyContent="space-between" mt="20px">
                      <Button type="button" 
                        sx={{ 
                          bgcolor: "#f1f1f1", 
                          color:'#03609C',
                          "&:hover": {
                            bgcolor: "#AFDBF5",
                            color:"#03609C"
                          }, 
                        }} 
                          variant="contained" onClick={handleCancel}>
                        Cancel
                      </Button>
                      {isLoading ? (
                      <CircularProgress size={24} /> // Show spinner while loading
                    ) : (
                      <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Creating Quiz...' : 'Create Quiz'}
                      </Button>
                    )}
                    </Box>
              </form>
            )}
          </Formik>
          
        </Box>
        </Box>
      </Box>
      <ToastContainer position="top-center" autoClose={3000} />
    </Box>
  );
};

export default Form;
