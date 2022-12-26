import React , {useState} from "react";
import Layout from "../Layout/Layout";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import "../Styles/checkoutpage.css";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import AdjustIcon from "@mui/icons-material/Adjust";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import { useDispatch, useSelector } from "react-redux";
import NewCustomer from "./NewCustomer";



const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#408df6",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#408df6",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "white",
  width: 75,
  height: 75,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage: "#408df6",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#408df6",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PersonOutlineOutlinedIcon fontSize="large" sx={{ color: "black"  }} />,
    2: <LocalShippingOutlinedIcon fontSize="large" sx={{ color: "black" }} />,
    3: <ShoppingCartOutlinedIcon fontSize="large" sx={{ color: "black" }} />,
    4: <CreditScoreOutlinedIcon fontSize="large" sx={{ color: "black" }} />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default true
   */
  // active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ["Customer info ", "Shipping", "Cart", "Payment"];

function CheckoutPage() {

  const [Toggled , isToggled] = useState(false)
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Layout>
      <Container maxWidth>
        <Stack direction="column" maxWidth className="container-all">
          <div className="checkout-container">
            <Stack direction="row" className="checkout-header">
              <h4>Checkout</h4>
              <Button variant="contained" sx={{ textTransform: "capitalize" }}>
                <AddCircleRoundedIcon sx={{ padding: "0px 2px" }} />
                Add Items
              </Button>
            </Stack>
            <div>
              <Stack sx={{ width: "100%" }} >
                <Stepper
                  alternativeLabel
                  activeStep={1}
                  
                  connector={<ColorlibConnector sx={{ marginTop: "12px" }} />}
                >
                  {steps.map((label) => (
                    <Step key={label} >
                      <StepLabel StepIconComponent={ColorlibStepIcon}>
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Stack>
            </div>
          </div>
          <div className="customerinfo-header">
            <h5>Customer Info</h5>
            {/* <button> <AdjustIcon /><span>Subscribe To Newsletters</span></button> */}
            <div className="newsletter-div">
              <Typography
                sx={{
                  backgroundColor: "black",
                  float: "right",
                  fontSize: "20px",
                  color: "white",
                  margin: "20px",
                  marginTop: "20px",
                  borderRadius: "20px",
                  padding: "0px 7px",
                }}
              >
                <Checkbox
                  icon={
                    <RadioButtonUncheckedRoundedIcon sx={{ color: "white" }} />
                  }
                  checkedIcon={<AdjustIcon />}
                />
                Subscribe To Newsletters
              </Typography>
            </div>
          </div>
          <div className="customerinfo-container">
            <div>
              <Button  onClick={()=> {isToggled(!Toggled)}}>Existing Customer</Button>
              <Button onClick={()=> {isToggled(!Toggled)}}>New Customer</Button>
              
            </div>
            {Toggled ? <NewCustomer/> :
            <FormControl
              fullWidth
              sx={{ m: 5 }}
              variant="standard"
              className="form"
            >
              <Stack direction="row" className="customer-form" spacing={5}>
                <TextField
                  required
                 fullWidth
                  label="Email"
                  id="fullWidth"
                  variant="standard"
                />
                <TextField
                  required
                  fullWidth
                  label="Phone"
                  id="fullWidth"
                  variant="standard"
                />
              </Stack>
                  <Box sx={{marginTop:"50px" , width:"100%" }}>
              <Button
                type="submit"
                sx={{ float: "left", textTransform: "capitalize" }}
              >
                Continue
              </Button>
              </Box>
            </FormControl>
            }
          </div>
        </Stack>
      </Container>
    </Layout>
    
  );
} 

export default CheckoutPage;
