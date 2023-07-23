//import { useState } from "react";
import { Box, Button, TextField, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
//import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import TopBar from "./TopBar";
import NavHeader from "./NavHeader";
import axios from "axios";
import React, { useNavigate } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  const handleFormSubmit = async (values) => {
    console.log("Form submitted:", values);
    try {
        const response = await axios.post("http://localhost:3001/quiz", values);
        console.log("Quiz created:", response.data);
        navigate('/dashboard');
      } catch (error) {
        console.error("Error creating quiz:", error);
      }
  };

  const initialValues = {
    title: "",
    description: "",
    quizfile: null,
    numQuestions: "",
    questionType: "",
  };

  const checkoutSchema = yup.object().shape({
    title: yup.string().required("Quiz name is required"),
    description: yup.string().required("Quiz text is required"),
    numQuestions: yup
      .string()
      .required("Invalid number of questions"),
    questionType: yup.string().required("Question type is required"),
  });

  return (
    <Box m="20px" backgroundColor='white'>
        <NavHeader />
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
              <TextField
                fullWidth
                multiline
                rows={6}
                variant="filled"
                label="Quiz Text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
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
              {/* <FormControl fullWidth variant="filled">
                <InputLabel id="question-type-label">Question Type</InputLabel>
                <Select
                  labelId="question-type-label"
                  id="question-type"
                  value={values.questionType}
                  name="questionType"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.questionType && !!errors.questionType}
                >
                  <MenuItem value="">Select Type</MenuItem>
                  <MenuItem value="multipleChoice">Multiple Choice</MenuItem>
                  <MenuItem value="trueFalse">True/False</MenuItem>
                  <MenuItem value="fillInTheBlank">Fill in the Blank</MenuItem>
                </Select>
              </FormControl> */}
              </Box>
              {/* <label htmlFor="quizfile">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<UploadOutlinedIcon />}
                >
                  Upload File
                </Button>
                <input
                  id="quizfile"
                  type="file"
                  accept=".txt"
                  onChange={(event) =>
                    setFieldValue("quizfile", event.currentTarget.files[0])
                  }
                  style={{ display: "none" }}
                />
              </label> */}
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
