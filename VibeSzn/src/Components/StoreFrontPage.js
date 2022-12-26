import React, { useEffect, useState } from "react";
import { Container, Stack, Box, Modal, Typography } from "@mui/material";
import "../Styles/storefrontpage.css";
import { useDispatch, useSelector } from "react-redux";
import {
  openStoreModal,
  addStoreStation,
  closeStoreModal,
} from "../Redux/cartSlice";
import { useLazyQuery } from "@apollo/client";
import { GET_STORES } from "../graphql/queries";
import LinearProgress from "@mui/material/LinearProgress";
import Navbar from "../Layout/Navbar";
import StationsModal from "./StationsModal";

var stores;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

var storeId;

function StoreFrontPage() {
  const handleClose = function () {
    dispatch(closeStoreModal());
  };

  useEffect(() => {
    getStores({});
  }, []);

  const open = useSelector((state) => state.cart.storeModal);

  const stationState = useSelector((state) => state.cart.storeToStation);

  const dispatch = useDispatch();

  const [getStores, { loading, data, error }] = useLazyQuery(GET_STORES);

  const handleChange = (store) => {
    dispatch(addStoreStation(store));
    dispatch(openStoreModal());
    console.log(stationState);
  };

  if (data) {
    stores = data.storeFronts;
  }

  if (error) {
    console.log(error);
  }
  return (
    <>
          <Navbar />

    <div className="storeselect-container">
      <Container maxWidth>
        <Typography variant="h4" sx={{ padding: "50px 20px" }}>
          Choose Store Front
        </Typography>
        <Stack
          direction="column"
          spacing={6}
          sx={{ padding: "10px" }}
          className="store-stack"
        >
          {typeof stores == "undefined" || loading ? (
            <Box sx={{ width: "100%" }} className="loading-box">
              <LinearProgress />
              <h5>Loading</h5>
            </Box>
          ) : (
            <Stack direction="column" spacing={3}>
              {stores.map((store) => {
                return (
                  <div
                    className="div-btn"
                    onClick={() => {
                      dispatch(
                        openStoreModal(),
                        (storeId = store.id),
                        dispatch(addStoreStation(store)),
                        console.log(storeId)
                      );
                    }}
                    key={store.id}
                  >
                    <Typography variant="body1">{store.name}</Typography>
                  </div>
                );
              })}
            </Stack>
          )}
        </Stack>
        <div>
          <Modal open={open} onClose={handleClose}>
            <StationsModal />
          </Modal>
        </div>
      </Container>
    </div>
    </>
  );
}

export default StoreFrontPage;
