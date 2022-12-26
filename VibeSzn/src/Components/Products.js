import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Stack,
  PaginationItem,
  Button,
  Typography,
  Container,
  Modal,
} from "@mui/material";
import "../Styles/products.css";
import Card from "@mui/material/Card";
import Queudorders from "./Queudorders";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { closeCartModal, cartModal, addItemModal } from "../Redux/cartSlice";
import ItemModal from "./itemmodal";
import PaidIcon from "@mui/icons-material/Paid";
import { useLazyQuery } from "@apollo/client";
import { GET_ITEMS_QUERY } from "../graphql/queries";
import LinearProgress from "@mui/material/LinearProgress";
import Pagination from "@mui/material/Pagination";
import Navbar from "../Layout/Navbar";
import { useSearchParams } from "react-router-dom";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import SortIcon from "@mui/icons-material/Sort";

let items = [];

let lastPage;

let paginatorKey;

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [getItems, { loading, error, data }] = useLazyQuery(GET_ITEMS_QUERY);
  const [stationId, setStationId] = useState(searchParams.get("station_id"));
  const [storeId, setStoreId] = useState(searchParams.get("store_id"));
  const [searchInput, setSearchInput] = useState("");
  const [itemId, setItemId] = useState(null);
  const [paginationPage, setPaginationPage] = useState(0);

  useEffect(() => {
    getItems({
      variables: {
        page,
        stationId: +stationId,
        storeId: +storeId,
        searchInput: searchInput,
      },
    });
  }, [searchInput]);

  useEffect(() => {
    if (searchInput === "") {
      searchParams.delete("searchquery");
      setSearchParams(searchParams);
    }
  }, [searchInput]);

  const dispatch = useDispatch();
  const open = useSelector((state) => state.cart.open);

  const itemOnClick = function (item) {
    dispatch(addItemModal(item));
  };

  const handleOpen = function () {
    dispatch(cartModal());
  };
  const handleClose = function () {
    dispatch(closeCartModal());
    setItemId(null);
  };

  const handleSubmit = (event) => {
    getItems({
      variables: {
        page,
        stationId: +stationId,
        storeId: +storeId,
        searchInput: searchInput,
      },
    });

    setSearchParams({
      station_id: stationId,
      store_id: storeId,
      searchquery: searchInput,
    });
    event.preventDefault();
  };

  if (error) {
    console.log(error);
  }

  if (data) {
    items = data.getItems.data;
    lastPage = data.getItems.paginatorInfo.lastPage;
    paginatorKey = data.getItems.paginatorInfo.currentPage;
  }

  const style = {
    position: "relative",
    left: "58%",
    transform: "translate(-50%, -50%)",
    top: "25%",
    width: "35%",
    border: "2px solid rgba(0, 0, 0, 0.46);",
    boxShadow: 10,
    textAlign: "center",
    maxHeight: "90vh",
  };

  const handleChange = (item) => {
    getItems({
      variables: {
        page: item.page,
        storeId: +storeId,
        stationId: +stationId,
      },
    });
  };
  return (
    <>
      <div className="all-cont">
        <Navbar />
        <Queudorders />
        <Container maxWidth="xlarge">
          <Box className="search-cont">
            <Stack
              direction="row"
              sx={{
                marginLeft: "30px",
                marginTop: "20px",
                justifyContent: "space-between",
              }}
            >
              <Box className="left-cont">
                <form onSubmit={handleSubmit}>
                  <input
                    className="search"
                    placeholder="Search by keyword..."
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                    }}
                  />
                </form>
                <Box>
                  <QrCodeScannerIcon fontSize="large" />
                </Box>
              </Box>
              <Box className="btn-container">
                <Button
                  variant="contained"
                  sx={{ borderRadius: "20px", textTransform: "capitalize" }}
                >
                  <SortIcon />
                  Filter
                </Button>
              </Box>
            </Stack>
          </Box>

          {loading && (
            <Box sx={{ width: "100%" }} className="loading-box">
              <LinearProgress />
              <h1>Loading now please wait </h1>
            </Box>
          )};
          <Stack className="products-container" direction="row">
            <Grid container>
              {items.map((item) => {
                return (
                  <Grid
                    item
                    md={3}
                    sm={6}
                    lg={3}
                    xl={2}
                    xs={12}
                    key={item.id}
                    class="container"
                  >
                    <Card
                      sx={{
                        borderRadius: "2px",
                        border: "solid 2px rgba(127, 127, 127, 0.34)",
                        width: "300px",
                        maxHeight: "360px",
                      }}
                      onClick={() => {
                        itemOnClick(item);
                        handleOpen();
                        setItemId(item.id);
                      }}
                    >
                      <div className="img-div">
                        <img
                          src={item.image_url.small}
                          alt="Image No Found"
                          key={item.id}
                          width="100%"
                          height="100%"
                        />
                      </div>
                      <Stack direction="column">
                        <Box>
                          <Stack
                            direction="row"
                            className="price-box"
                            sx={{
                              borderRadius: "17.3px",
                              backgroundColor: "#263238",
                              color: "white",
                              float: "left",
                              margin: "10px",
                            }}
                          >
                            <Box
                              sx={{
                                float: "right",
                                marginTop: "4px",
                                justifyContent: "center",
                              }}
                            >
                              <Typography
                                variant="p"
                                fontSize="21px"
                                key={item.id}
                                sx={{ padding: "5px 7px" }}
                              >
                                $ {item.price}
                              </Typography>
                            </Box>
                          </Stack>
                        </Box>
                        <Box sx={{ borderBottom: "1px solid black" }}>
                          <Typography
                            variant="h5"
                            sx={{
                              fontSize: "21px",
                              fontWeight: "600",
                              fontFamily:
                                "ITC Avant Garde Gothic Std Demi Condensed",
                            }}
                            key={item.id}
                          >
                            {item.name.length > 25
                              ? `${item.name.substring(0, 25)}...`
                              : item.name}
                          </Typography>
                        </Box>

                        <Box sx={{ justifyContent: "space-between" }}>
                          <Typography
                            variant="subtitle"
                            sx={{
                              float: "left",
                              margin: "20px",
                              marginLeft: "12px",
                              fontSize: "18px",
                              fontFamily:
                                "ITC Avant Garde Gothic Std Demi Condensed",
                            }}
                            key={item.id}
                          >
                            Quantity {item.quantity}
                          </Typography>
                          {item.is_backorder && (
                            <Box
                              sx={{
                                backgroundColor: "#408df6",
                                borderRadius: "17px",
                                float: "right",
                                margin: "15px",
                              }}
                            >
                              <Typography
                                color="white"
                                sx={{
                                  fontFamily: "ITC book",
                                  fontWeight: "100",
                                  
                                }}
                                fontSize="18px"
                              >
                                Backorder
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Stack>
                      <Box className="overlay">
                        <Stack direction="column" sx={{ alignItems: "center" }}>
                          <h1>{item.name}</h1>
                          <Box
                            sx={{
                              height: "1px",
                              width: "100%",
                              backgroundColor: "white",
                              marginTop: "30px",
                            }}
                          />

                          <Box className="backorder-container">
                            <Typography
                              variant="h6"
                              color="white"
                              sx={{ padding: "10px" }}
                              key={item.id}
                            >
                              Quantity {item.stock}
                            </Typography>
                            <Box sx={{ margin: "20px" }}>
                              {item.is_backorder && (
                                <Typography
                                  variant="body"
                                  sx={{
                                    backgroundColor: "#ffff",
                                    borderRadius: "17px",
                                    textAlign: "center",
                                    padding: "10px",
                                  }}
                                >
                                  Available For Backorder
                                </Typography>
                              )}
                            </Box>
                          </Box>
                          <Box
                            className="price-box"
                            sx={{
                              borderRadius: "17.3px",
                              backgroundColor: "#263238",
                              color: "white",
                              textAlign: "center",
                              margin: "10px",
                            }}
                          >
                           <PaidIcon
                              fontSize="medium"
                              sx={{
                                color: "#408df6",
                                float: "left",
                                padding: "4px",
                                margin: "auto",
                              }}
                            />
                            <Typography
                              variant="body"
                              fontSize="20px"
                              sx={{ marginTop: "10px" }}
                              key={item.id}
                            >
                              {item.price}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
            <Box className="cart-container" sx={{ marginRight: "50px" }}>
              <Cart />
            </Box>
          </Stack>
          <Stack spacing={1} className="page-paginator">
            <Pagination
              key={paginatorKey}
              count={lastPage}
              boundaryCount={5}
              defaultPage={paginatorKey}
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  className={item.selected ? "selected" : "notSelected"}
                  onClick={() => handleChange(item)}
                />
              )}
            />
          </Stack>
        </Container>
      </div>
      {open ? (
        <Modal open={open} onClose={handleClose}>
          <Box className="modal-box" sx={style}>
            <ItemModal item_id={+itemId} />
          </Box>
        </Modal>
      ) : null}
    </>
  );
}

export default Products;
