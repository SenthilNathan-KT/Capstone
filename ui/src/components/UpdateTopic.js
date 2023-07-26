import { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import { object, string } from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatar from "@mui/material/Avatar";
import { useNavigate, useLocation } from "react-router-dom";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import axios from "axios";

const UpdateTopic = () => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const location = useLocation();
  const selectedTopic = location.state;

  const handleFormSubmit = async (values) => {
    const authToken = localStorage.getItem("accessToken");

    // Verify if the authToken meets certain criteria to be considered valid
    if (authToken) {
      if (!isImageUploaded) {
        // Set default image URL if no image is uploaded
        values.image = "/assets/images/casual-life-3d-lamp-books-and-objects-for-studying.png";
      } else {
        // If an image is uploaded, use the base64 encoded image
        values.image = base64Image;
      }

      try {
        const config = {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        };

        const response = await axios.put(`http://localhost:3001/topic/${selectedTopic._id}`, values, config);

        console.log("Topic updated:", response.data);

        // Clear form values
        values.title = "";
        values.description = "";
        setBase64Image("");
        setIsImageUploaded(false);
        navigate('/dashboard');
      } catch (error) {
        console.error("Error updating topic:", error);
        if (error.response && error.response.status === 403) {
          navigate('/login');
        }
      }
    } else {
      // Handle the case when the authToken is not valid or doesn't exist
      console.error("Invalid or missing authToken. Please log in again.");
    }
  };

  const [base64Image, setBase64Image] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const handleImageChange = (event) => {
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
    } else {
      // If the user does not select a new image, keep the existing image
      if (selectedTopic && selectedTopic.image) {
        setBase64Image(selectedTopic.image);
        setIsImageUploaded(true);
      }
    }
  };

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    // If a selected topic is available, set the initial form values with its details
    if (selectedTopic) {
      setInitialValues({
        title: selectedTopic.title,
        description: selectedTopic.description,
      });
      // Set the initial image URL if a topic has an image
      if (selectedTopic.image) {
        setBase64Image(selectedTopic.image);
        setIsImageUploaded(true);
      }
    }
  }, [selectedTopic]);

  const checkoutSchema = object().shape({
    title: string().required("Topic name is required"),
    description: string().required("Topic description is required"),
  });

  return (
    <Box display="flex">
      {isNonMobile ? <SideBar /> : null}
      <Box flex="1">
        <TopBar />
        <Box m="20px" backgroundColor="white" overflowY="auto">
          <Box style={{ padding: "20px", textAlign: "center" }} marginBottom="20px">
            <h2>EDIT TOPIC</h2>
            <label htmlFor="image-upload">
              <Avatar
                src={isImageUploaded ? base64Image : "/assets/images/casual-life-3d-lamp-books-and-objects-for-studying.png"}
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
          {initialValues.title && initialValues.description ? (
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
                    label="Topic Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    name="title" // Make sure the name is set as "title"
                    error={!!touched.title && !!errors.title}
                    helperText={touched.title && errors.title}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Topic Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name="description" // Make sure the name is set as "description"
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                    sx={{ gridColumn: "span 4" }}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                  Update Topic
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          ) : (
            <div>Loading...</div>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateTopic;
