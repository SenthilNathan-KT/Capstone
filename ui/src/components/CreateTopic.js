import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import { object, string } from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import NavHeader from "./NavHeader";
// import SideBar from "./SideBar";
import axios from "axios";

const Form = () => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    console.log("Form values:", values);
    //try {

    const authToken = localStorage.getItem("accessToken");
    console.log("Auth Token:", authToken);

    // Verify if the authToken meets certain criteria to be considered valid
    if (authToken) {
      values.image = base64Image;
      try {
        const config = {
          headers: {
            authorization: `Bearer ${authToken}`,
            // "Content-Type": "multipart/form-data", // Add the necessary headers for FormData
          },
        };
        const response = await axios.post(
          "http://localhost:3001/topic",
          values,
          config
        );

        console.log("Topic created:", response.data);

        // Clear form values
        // setSelectedImage(null);
        // values.title = "";
        // values.description = "";
        // navigate('/dashboard');
      } catch (error) {
        console.error("Error creating topic:", error);
      }
    } else {
      // Handle the case when the authToken is not valid or doesn't exist
      console.error("Invalid or missing authToken. Please log in again.");
    }
  };
  const [base64Image, setBase64Image] = useState("");
  const handleImageChange = (event) => {
    //setSelectedImage(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // The 'result' property contains the base64-encoded image
        const base64String = reader.result;
        setBase64Image(base64String);
      };

      // Read the file as a data URL, which will trigger the 'onloadend' event
      reader.readAsDataURL(file);
    }
  };

  const initialValues = {
    title: "",
    description: "",
  };

  const checkoutSchema = object().shape({
    title: string().required("Topic name is required"),
    description: string().required("Topic description is required"),
  });

  return (
    <Box m="20px" backgroundColor="white">
      {/* <NavHeader /> */}
      {/* <SideBar /> */}
      <TopBar />
      <Box style={{ padding: "20px", textAlign: "center" }} marginBottom="20px">
        <h2>CREATE TOPIC</h2>
        <label htmlFor="image-upload">
          <Avatar
            src={base64Image ? base64Image : "/path/to/default-profile-image.png"}
            alt="User Profile"
            sx={{ width: 100, height: 100, marginTop: 10, cursor: "pointer" }}
          />
          {/* {base64Image && (
            <div>
              <img
                src={base64Image}
                alt="Selected Image"
                style={{ width: 200, height: 200 }}
              />
            </div>
          )} */}
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
                Create Topic
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
