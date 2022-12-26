import React from "react";
import {
  TextField,
  Grid,
  Container,
  Typography,
  Checkbox,
  Box,
  Button,
  Input,
} from "@mui/material/";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import AdjustIcon from "@mui/icons-material/Adjust";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useFormik } from "formik";
import { basicSchema } from "../Schemas";
import "../Styles/newcustomer.css";
import Alert from "@mui/material/Alert";

const onSubmit = () => {
  console.log("submited");
};

function NewCustomer() {
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
      },
      validationSchema: basicSchema,
      onSubmit,
    });

  console.log(errors);

  return (
    <div className="newcustomer-container">
      <Container maxWidth="xl">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={8} sx={{ padding: "10px" }}>
            <Grid item md={6}>
              <Input
                required
                fullWidth
                value={values.firstName}
                id="firstName"
                label="First Name"
                type="firstName"
                placeholder="First Name"
                multiline
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.firstName && touched.firstName ? "input-error" : ""
                }
              />
              {errors.firstName && touched.firstName && (
                <Alert className="alertDiv" severity="error">
                  {errors.firstName}
                </Alert>
              )}
            </Grid>
            <Grid item md={6}>
              <Input
                required
                fullWidth
                value={values.lastName}
                id="lastName"
                label="Last Name"
                type="lastName"
                placeholder=" Last Name"
                multiline
                onChange={handleChange}
                variant="standard"
                onBlur={handleBlur}
                className={
                  errors.lastName && touched.lastName ? "input-error" : ""
                }
              />
              {errors.lastName && touched.lastName && (
                <Alert className="alertDiv" severity="error">
                  {errors.lastName}
                </Alert>
              )}
            </Grid>
            <Grid item md={6}>
              <Input
                required
                fullWidth
                value={values.email}
                id="email"
                label="Email"
                type="email"
                placeholder=" Email"
                multiline
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email && touched.email ? "input-error" : ""}
              />
              {errors.email && touched.email && (
                <Alert className="alertDiv" severity="error">
                  {errors.email}
                </Alert>
              )}
            </Grid>
            <Grid item md={6}>
              <Input
                required
                fullWidth
                value={values.phone}
                id="phone"
                label="Phone"
                type="phone"
                placeholder=" Phone"
                multiline
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.phone && touched.phone ? "input-error" : ""}
              />
              {errors.phone && touched.phone && (
                <Alert className="alertDiv" severity="error">
                  {errors.phone}
                </Alert>
              )}
            </Grid>
          </Grid>
          <Box sx={{ padding: "20px 0px" }}>
            <Typography
              sx={{ fontFamily: "ITC Avant Garde Gothic Std Demi Condensed" }}
            >
              Shipping Address
            </Typography>
          </Box>
          <Grid container spacing={8}>
            <Grid item md={6}>
              <Input
                required
                fullWidth
                value={values.address}
                id="address"
                label="Address Line 1"
                type="address"
                placeholder=" Address"
                multiline
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.address && touched.address ? "input-error" : ""
                }
              />
              {errors.address && touched.address && (
                <Alert className="alertDiv" severity="error">
                  {errors.address}
                </Alert>
              )}
            </Grid>
            <Grid item md={6}>
              <Input
                Multiline
                onChange={handleChange}
                fullWidth
                id="address2"
                type="address2"
                label="Address Line 2"
                placeholder=" Address 2 (Optional)"
                multiline
                variant="standard"
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item md={3}>
              <InputLabel variant="h5">City</InputLabel>
              <Input
                required
                onChange={handleChange}
                value={values.city}
                id="city"
                label="City"
                placeholder=" City"
                type="city"
                multiline
                variant="standard"
                onBlur={handleBlur}
                className={errors.city && touched.city ? "input-error" : ""}
              />
              {errors.city && touched.city && (
                <Alert className="alertDiv" severity="error">
                  {errors.city}
                </Alert>
              )}
            </Grid>
            <Grid item md={3}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel fullWidth id="demo-simple-select-standard-label">
                  State
                </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={3}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel fullWidth id="demo-simple-select-standard-label">
                  Country
                </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={3}>
              <InputLabel variant="h5">ZIP Code</InputLabel>
              <Input
                required
                fullWidth
                id="zip"
                label="ZIP"
                placeholder="ZIP Code"
                type="zip"
                multiline
                variant="standard"
              />
              {errors.zip && touched.zip && (
                <Alert className="alertDiv" severity="error">
                  {errors.zip}
                </Alert>
              )}
            </Grid>
          </Grid>
          <Box sx={{ float: "left" }}>
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              sx={{
                borderRadius: "15px",
                padding: "5px 15px",
                textTransform: "capitalize",
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
}

export default NewCustomer;
