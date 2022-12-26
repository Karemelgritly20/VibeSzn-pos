import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Stack,
  Button,
  IconButton,
  Typography,
  Checkbox,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import "../Styles/itemmodal.css";
import { addToCart, closeCartModal } from "../Redux/cartSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import { useLazyQuery } from "@apollo/client";
import { GET_ITEMS_COMBINATIONS } from "../graphql/queries";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchParams } from "react-router-dom";
import _ from "lodash";
import Attributes from "./CustomAttribute/Attributes";

var combination;
var customCombination;

export default function ItemModal(props) {
  const productRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const [stationId, setStationId] = useState(searchParams.get("station_id"));
  const [storeId, setStoreId] = useState(searchParams.get("store_id"));

  const [quantityArray, setQuantityArray] = useState([]);

  const [getCombin, { loading, error, data }] = useLazyQuery(
    GET_ITEMS_COMBINATIONS
  );

  useEffect(() => {
    if (props.item_id) {
      getCombin({
        variables: {
          item_id: Number(props.item_id),
          storeId: +storeId,
          stationId: +stationId,
        },
      });
    }
  }, []);

  if (data) {
    combination = data?.getItemCombinations?.available_combinations;
    customCombination = data?.getItemCombinations.item_attributes;
    // console.log(customCombination);
    // console.log(data);
  }

  if (error) {
    console.log(error);
  }

  const dispatch = useDispatch();
  const addItemToCart = function (item) {
    const quantity = document.getElementById("select-quantity").value;
    const combination = document.getElementById("select-attribute").value;
    const payloadToSend = {
      quantity: +quantity,
      combination: combination,
      item,
    };
    dispatch(addToCart({ payloadToSend }));
  };

  const handleClose = function () {
    dispatch(closeCartModal());
  };

  const itemModal = useSelector((state) => state.cart.itemModal);

  const [checked, setChecked] = useState(false);

  const handleCombinSubmit = function (event, item) {
    const quantity =
      +event.target.options[event.target.selectedIndex].getAttribute(
        "data-quantity"
      );
    const attribute =
      event.target.options[event.target.selectedIndex].getAttribute(
        "data-attribute"
      );
    // console.log(attribute);
    // console.log(quantity);
    setQuantityArray(_.range(1, Number(quantity) + 1));
  };
  return (
    <Stack direction="column" className="modal-container">
      <form>
        <Box className="modal-header">
          <Box sx={{ float: "left", marginTop: "10px" }}>
            <IconButton onClick={handleClose}>
              <CancelIcon sx={{ color: "black" }} />
            </IconButton>
          </Box>
          <Stack direction="row" spacing={4} sx={{ padding: "10px 4px" }}>
            <img className="img-box" src={itemModal.image_url.small} />
            <Box key={itemModal.id}>
              <Typography
                sx={{
                  fontSize: "23px",
                  textAlign: "left",
                  marginTop: "50px",
                  marginLeft: "10px",
                }}
                key={itemModal.id}
              >
                {itemModal.name}
              </Typography>
              <Box sx={{ float: "left" }}>
                <Box
                  sx={{
                    float: "right",
                    marginTop: "15px",
                    backgroundColor: "black",
                    borderRadius: "50px",
                  }}
                >
                  <Typography
                    variant="h5"
                    fontSize="21px"
                    sx={{ padding: "0px 10px", color: "white" }}
                    key={itemModal.id}
                  >
                    {" "}
                    ${itemModal.price}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: "#408df6",
                    borderRadius: "17px",
                    float: "right",
                    margin: "12px",
                  }}
                >
                  <Typography
                    color="white"
                    sx={{
                      float: "left",
                      fontFamily: "ITC book",
                      fontWeight: "100",
                      letterSpacing: "0.7px",
                      padding: "3px 15px",
                      fontSize: "20px",
                    }}
                  >
                    Avilable for Backorder
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Box>
        <Grid container>
          <Grid item md={7}>
            <Typography
              sx={{ float: "left", fontWeight: "700", marginLeft: "20px" }}
            >
              Combination
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Typography sx={{ fontWeight: "700" }}>Available</Typography>
          </Grid>
          <Grid item md={3}>
            <Typography sx={{ fontWeight: "700" }}>Price/Unit</Typography>
          </Grid>
        </Grid>
        <Box className="item-table">
          {typeof combination == "undefined" || loading ? (
            <Box sx={{ width: "100%" }} className="loading-box">
              <CircularProgress />
              <h5>Loading</h5>
            </Box>
          ) : (
            <Box className="combin-list">
              <Grid container spacing={2} className="formGrid">
                <Grid item md={7}>
                  <select
                    id="select-attribute"
                    onChange={(event) => handleCombinSubmit(event)}
                  >
                    <option value={null}>Select Available Combination</option>
                    {combination.map((combinaitem) => {
                      return (
                        <option
                          value={combinaitem.attribute_option_data}
                          data-quantity={combinaitem.quantity}
                          data-attribute={
                            combinaitem.parsed_attribute_option_data
                          }
                        >
                          {combinaitem.parsed_attribute_option_data}
                        </option>
                      );
                    })}
                  </select>
                </Grid>

                <Grid item md={2}>
                  <select id="select-quantity">
                    <option value={null}>Quantity</option>
                    {quantityArray.map((quantity) => {
                      return <option value={quantity}>{quantity}</option>;
                    })}
                  </select>
                </Grid>
                <Grid item md={3}>
                  <Typography variant="subtitle1" sx={{ fontSize: "20px" }}>
                    {data ? data.getItemCombinations.price : ""}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
        <div className="scroll">
          <Box className="combination-check" sx={{ display: "inlineBlock" }}>
            <Typography variant="body2">
              Choose Custom Combination
              <Checkbox
                onClick={() => {
                  setChecked(!checked);
                }}
              />
            </Typography>
          </Box>
          <br />
          <br />
          <br />
          <br />
          <Box>
            {checked ? (
              <Attributes
                data={data}
                item_attributes={data.getItemCombinations.item_attributes}
              />
            ) : null}
          </Box>
        </div>
        <Box>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              addItemToCart(itemModal);
            }}
            sx={{ textTransform: "capitalize" }}
            endIcon={<ShoppingCartOutlined />}
          >
            Add To Cart
          </Button>
        </Box>
      </form>
    </Stack>
  );
}
