import React from "react";
import { Box, Container, Button, Stack, Typography } from "@mui/material";
import Fab from "@mui/material/Fab";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../Styles/queudorders.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Orders = [
  "10001",
  "10002",
  "10003",
  "10004",
  "10005",
  "10006",
  "10007",
  "10008",
  "10009",
  "10010",
  "10011",
  "10012",
  "10013",
];
function Queudorders() {
  return (
    <Box className="navsecpart">
      <Container maxWidth="xlarge">
        <Stack
          className="queued-stack"
          direction="row"
          spacing={2}
          // sx={{ justifyContent: "space-around", marginTop: "15px" }}
        >
          <Box>
            <Typography
              variant="h6"
              fontSize="20px"
              fontFamily="ITC Avant Garde Gothic Std Demi Condensed "
              sx={{
                margin: "10px",
                display: "block",
              }}
            >
              Queued Orders
            </Typography>
          </Box>

          <Box className="queud-box">
            <Stack direction="row" spacing={0.4}>
              <Box className="arrow1">
                <Fab
                  size="small"
                  sx={{
                    color: "white",
                    backgroundColor: "#408df6",
                    marginTop: "6px",
                  }}
                >
                  <ArrowBackIosIcon sx={{ marginLeft: "6px" }} />
                </Fab>
              </Box>

              {Orders.map((Order) => {
                return (
                  <Button key={Order}>
                    <Box className="ordercont">
                      <span key={Order.id} className="typo">
                        #{Order}
                      </span>
                    </Box>
                  </Button>
                );
              })}

              <Box sx={{ marginLeft: "20px" }}>
                <Fab
                  size="small"
                  sx={{
                    color: "white",
                    backgroundColor: "#408df6",
                    marginTop: "6px",
                  }}
                >
                  <ArrowForwardIosIcon />
                </Fab>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default Queudorders;
