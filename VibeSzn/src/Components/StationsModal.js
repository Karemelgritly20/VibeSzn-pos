import React, { useEffect, useState } from "react";
import { Stack, Button, Box, Typography, IconButton } from "@mui/material";
import { GET_STATION } from "../graphql/queries";
import { useLazyQuery } from "@apollo/client";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { closeStoreModal, stationIdReducer } from "../Redux/cartSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import "../Styles/station.css";

let stations;





const styleLink = {
  textDecoration: "none",
};

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  backgroundImage: "linear-gradient(to top, #cacaca, #fff)",
  border: "2px solid #000",
  p: 2,
};

function StationsModal() {
  const [stationModal , setStationModal] = useState(true)
  const [cashDrawer , setCashDrawer] = useState(false)
  const [notes , setNotes] = useState(false)


  const { id: storeId = null } = useSelector(
    (state) => state.cart.storeToStation
  );

  console.log({ storeId });

  const [
    getStations,
    { loading: stationLoading, data: stationData, error: stationError },
  ] = useLazyQuery(GET_STATION);

  const dispatch = useDispatch();

  const handleClose = () => dispatch(closeStoreModal());

  const handleClick = (storeId, stationId) => {
    console.log(stationId);
    console.log(storeId);
  };

  useEffect(() => {
    if (storeId) {
      getStations({
        variables: {
          storeId: +storeId,
        },
      });
    }
  }, []);

  if (stationData) {
    stations = stationData.getStations;
    console.log(stationData);
  }

  if (stationError) {
    console.log({ stationError });
  }

  return (
    <div>
      <Stack direction="column" spacing={2} sx={style}>
        <Box>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "#408df6", margin: "0px" }}
          >
            Choose Station
            <IconButton sx={{ float: "right" }} onClick={() => handleClose()}>
              <CancelIcon sx={{ color: "black" }} />
            </IconButton>
          </Typography>
        </Box>
        <Box className="modal-container">
          <Box>
            {typeof stations == "undefined" || stationLoading ? (
              <Box sx={{ width: "100%" }} className="loading-box">
                <CircularProgress />
                <h5>Loading</h5>
              </Box>
            ) : (
              <Box>
                {stations.map((station) => {
                  const stationId = station.id;
                  return (
                    <Box
                      key={station.id}
                      sx={{ mt: 2 }}
                      className="stationCont"
                    >
                      <span>{station.name}</span>
                      <Button
                        fontSize="16px"
                        variant="contained"
                        color="error"
                        sx={{
                          borderRadius: "20px",
                          float: "right",
                          textTransform: "capitalize",
                          padding: "5px 20px",
                        }}
                        onClick={handleClose}
                      >
                        Close
                      </Button>

                      {station.status == 0 ? (
                       
                        <Link
                          className="link"
                          style={styleLink}
                          to={`/products?station_id=${stationId}&store_id=${storeId}`}
                        >
                          <Button
                          
                            variant="contained"
                            sx={{
                              borderRadius: "20px",
                              float: "right",
                              textTransform: "capitalize",
                              padding: "5px 20px",
                            }}
                            onClick={() => handleClick(storeId, stationId)}
                          >
                            Go To POS
                          </Button>
                        </Link>
              
                      ) : null}
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>
        </Box>
      </Stack>
    </div>
  );
}

export default StationsModal;
