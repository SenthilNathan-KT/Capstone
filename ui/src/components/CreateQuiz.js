//import { useState } from "react";
import { Box, Button, TextField,InputAdornment,Typography, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import { Formik } from "formik";
import {object, string} from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
//import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import TopBar from "./TopBar";
import NavHeader from "./NavHeader";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  const handleFormSubmit = async (values) => {
    console.log("Form submitted:", localStorage.getItem("accessToken"));
    try {
      const authToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          authorization: `Bearer ${authToken}`,
          //"Content-Type": "multipart/form-data", // Add the necessary headers for FormData
        },
      };
      const response = await axios.post("http://localhost:3001/quiz", values, config);
      
        // const response = await axios.post("http://localhost:3001/quiz", values);
        console.log("Quiz created:", response.data);
        navigate('/dashboard');
      } catch (error) {
        console.error("Error creating quiz:", error);
        // if (error.response.data.err?.message === "jwt expired") {
        //   navigate('/login');
        // }
      }
  };
  const [wordCount, setWordCount] = useState(0);

  const getWordCount = (text) => {
    const words = text.trim().split(/\s+/);
    return words.length;
  };
  
  // useEffect(() => {
  //   setWordCount(getWordCount(values.description));
  // }, [values.description]);

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
    <Box m="20px" backgroundColor='white'>
        {/* <NavHeader /> */}
        <TopBar />
        <Box
            style={{ padding: '20px', textAlign: 'center' }}
            marginBottom="20px"
        >
            <h2>CREATE QUIZ</h2>
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
                      // helperText={
                      //   touched.description
                      //     ? errors.description || 'Quiz text can have at most 500 words'
                      //     : ""
                      // }
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
                  value={values.numQuestions}
                  name="numQuestions"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.numQuestions && !!errors.numQuestions}
                >
                  <MenuItem value="">Select Number</MenuItem>
                  <MenuItem value="10">10</MenuItem>
                  <MenuItem value="15">15</MenuItem>
                  <MenuItem value="20">20</MenuItem>
                </Select>
              </FormControl>
              
              </Box>
              
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Quiz
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
