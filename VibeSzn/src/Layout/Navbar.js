import React from "react";
import { Box, Stack, Typography, Button, Container, IconButton } from "@mui/material";
import "../Styles/navbar.css";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Link } from "react-router-dom";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
function Navbar() {
  return (
    <Box className="Navbar">
      <Container maxWidth>
        <Stack
          direction="row"
          className="nav-stack"
          sx={{ width: "100%", padding: "0px" }}
        >
          <Box className="navbarLeftContainer">
            <Link to="/#">
              <img src="./logo.png" alt="Paris" className="logo" />
            </Link>
            <Box className="Typo">
              <Typography
                color="white"
                fontSize="29px"
                variant="h5"
                component="h5"
                sx={{ marginTop: "40px" }}
              >
                STL - VibeSzn
              </Typography>
              <span color="white" variant="subtitle2" component="span">
                VibeSzn Events Retail POS
              </span>
            </Box>
          </Box>
          <Stack
          className="rightNavbarContainer"
            direction="row"
            sx={{
              justifyContent: "space-between",
              padding: "15px",
            }}
          >
            <Box className="profileIconContainer" >
              <Button>
              <Typography variant="p" color="white">Kirk Skelton</Typography>
              <AccountCircleRoundedIcon fontSize="large" sx={{color:"black"}}/>
              </Button>
            </Box>
            <Box className="bignavbtn">
              <button>Open Drawer</button>
              <button>Return items</button>
            </Box>
            <Box className="smnavbtn">
              <Button>
                Exit
                <PowerSettingsNewIcon fontSize="large" />
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default Navbar;
