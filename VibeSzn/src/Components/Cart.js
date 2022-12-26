import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Grid,
  Button,
} from "@mui/material";
import "../Styles/cart.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, clear } from "../Redux/cartSlice";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Cart(props) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.itemsInCart);

  const handleDelete = (item) => {
    console.log(item)
    dispatch(deleteItem(item));
    
  };

  const clearCart = () => {
    dispatch(clear());
  };

  return (
    <Box className="cart-container">
      <Stack direction="row" className="cart-header">
        <Box sx={{ marginTop: "10px", padding: "10px" }}>
          <ShoppingCartOutlinedIcon
            sx={{
              color: "white",
              float: "left",
            }}
          />
          <Typography
            variant="span"
            fontFamily="itc book"
            fontSize="22px"
            color="white"
          >
            Cart
          </Typography>
        </Box>

        <Box>
          <IconButton onClick={clearCart}>
            <DeleteOutlineOutlinedIcon
              sx={{
                color: "white",
                fontSize: "21px",
              }}
            />
          </IconButton>
        </Box>
      </Stack>
      <Box className="prod-cart">
        <Grid container>
          {cart.map((item) => {
            return (
              <Box key={item.id} className="items-grid">
                <Typography
                  sx={{ fontSize: "23px", padding: "5px" }}
                  key={item.id}
                >
                  {item.item.name}
                </Typography>
                <br/>
                <Stack direction="row">
                  <Box className="deleteBtn" >
                    <IconButton onClick={handleDelete}>
                      <DeleteForeverIcon
                      />
                    </IconButton>
                    
                  </Box>

                  <Box ><img src={item?.item?.image_url?.small} /></Box>
                  <Box sx={{ padding: "20px" }}>
                    <Typography key={item.id} sx={{ fontWeight: "500" }}>
                      {item.details}
                    </Typography>
                    <Typography
                      key={item.id}
                      sx={{ color: "#b7904f", paddingTop: "10px" }}
                    >
                      {item.item.price},00
                    </Typography>
                  </Box>
                  {/* <Box>
                    <Typography>{item.combination}</Typography>
                  </Box> */}
                </Stack>
                <Stack
                  direction="row"
                  className="btn-stack"
                  spacing={2}
                  sx={{ mt: 3 }}
                >
                  <Stack spacing={0.1} direction="row" sx={{ display: "flex" }}>
                    <button className="plus-btn">+</button>
                    <Box
                      sx={{ border: "1px solid black", padding: "0px 40px" , height:"38px" }}
                    >
                      <Typography>{item.quantity}</Typography>
                    </Box>
                    <button className="min-btn">-</button>
                  </Stack>
                  <Box>
                    <Typography sx={{ marginTop: "2px" }}>X</Typography>
                  </Box>
                  <Stack spacing={0.2} direction="row" sx={{ display: "flex" }}>
                    <button className="sec-plus-btn">+</button>
                    <Box
                      sx={{ border: "1px solid black", padding: "0px 40px" , height:"38px" }}
                    >
                      <Typography>{item.item.price}</Typography>
                    </Box>
                    <button className="sec-min-btn">-</button>
                  </Stack>
                  <Typography variant="body"> = ${item.item.price}.00</Typography>
                </Stack>
              </Box>
            );
          })}
        </Grid>
      </Box>
      <Box className="cart-bottom">
        <Link to="/checkout">
          <Typography variant="h6" color="white">
            <ShoppingCartOutlinedIcon sx={{ marginTop: "15px" }} />
            Checkout
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}

export default Cart;
