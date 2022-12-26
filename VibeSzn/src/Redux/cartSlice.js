import { createSlice } from "@reduxjs/toolkit";

let duplicate;

const initialState = {
  itemsInCart: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  open: false,
  itemModal: [],
  storeModal: false,
  drawerCountModal: false,
  
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.itemsInCart.length === 0) {
        state.itemsInCart.push(action.payload.payloadToSend);
      } else {
        duplicate = false;
        state.itemsInCart.forEach((item) => {
          if (
            item.item.id === action.payload.payloadToSend.item.id &&
            item.combination === action.payload.payloadToSend.combination
          ) {
            duplicate = true;
            item.quantity =
              item.quantity + action.payload.payloadToSend.quantity;
          }
        });

        if (!duplicate) {
          state.itemsInCart.push(action.payload.payloadToSend);
        }
      }
      state.open = false;
    },
    deleteItem: (state, action) => {
      console.log(action.payload)
      state.itemsInCart = state.itemsInCart.item.filter(
        (item) => item.id  !== action.payload.item.id);
    },
    clear: (state, action) => {
      state.itemsInCart = [];
    },
    cartModal: (state, action) => {
      state.open = true;
    },
    closeCartModal: (state, action) => {
      state.open = false;
    },
    addItemModal: (state, action) => {
      state.itemModal = action.payload;
    },
    openStoreModal: (state, action) => {
      state.storeModal = true;
    },
    closeStoreModal: (state, action) => {
      state.storeModal = false;
    },
    addStoreStation: (state, action) => {
      state.storeToStation = action.payload;
    },
    stationIdReducer: (state, action) => {
      state.stationId = action.payload;
    },
  },
});

export const {
  addToCart,
  deleteItem,
  clear,
  cartModal,
  closeCartModal,
  addItemModal,
  openStoreModal,
  closeStoreModal,
  addStoreStation,
  clearStoreStation,
  stationIdReducer,
} = cartSlice.actions;

export default cartSlice.reducer;
