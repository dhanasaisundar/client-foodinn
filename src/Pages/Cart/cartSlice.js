import { createSlice } from "@reduxjs/toolkit";
import {
  apiAddToCart,
  apiClearCart,
  apiDecreaseQuantity,
  apiDeleteFromCart,
  apiIncreaseQuantity,
} from "../../services/apiCart";
import toast from "react-hot-toast";

const cartId = localStorage.getItem("cartId");
const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart.push(action.payload);
      saveCartToLocalStorage(state.cart);
      saveCartToDatabase(action.payload);
    },
    deleteFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.itemId !== action.payload);
      saveCartToLocalStorage(state.cart);
      deleCartFromDatabase(action.payload);
    },
    increaseItemQuantityInCart(state, action) {
      const cartItem = state.cart.find(
        (item) => item.itemId === action.payload
      );
      if (cartItem) {
        cartItem.quantity++;
        cartItem.totalPrice = cartItem.quantity * cartItem.unitprice;
        saveCartToLocalStorage(state.cart);
        increaseItemQuantityInDatabase(action.payload);
      }
    },
    decreaseItemQuantityInCart(state, action) {
      const item = state.cart.find((item) => item.itemId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitprice;
      if (item.quantity === 0)
        cartSlice.caseReducers.deleteFromCart(state, action);
      saveCartToLocalStorage(state.cart);
      decreaseItemQuantityInDatabase(action.payload);
    },
    clearCart(state) {
      state.cart = [];
      saveCartToLocalStorage(state.cart);
      clearCartInDatabase();
    },
  },
});

//##########################################################################################################
//Local Storage
const saveCartToLocalStorage = (cartItem) => {
  localStorage.setItem("cart", JSON.stringify(cartItem));
};

//##########################################################################################################
//Database
async function saveCartToDatabase(item) {
  try {
    await apiAddToCart(cartId, item);
    toast.success("Item added to cart");
  } catch (error) {
    console.error("Error saving cart to database");
    toast.error("Error saving cart to database");
  }
}

async function deleCartFromDatabase(item) {
  try {
    await apiDeleteFromCart(cartId, item);
    toast.success("Item removed from cart");
  } catch (error) {
    console.error("Error deleting cart from database");
    toast.error("Error deleting cart from database");
  }
}

async function increaseItemQuantityInDatabase(item) {
  try {
    await apiIncreaseQuantity(cartId, item);
  } catch (error) {
    console.error("Error adding item quantity in cart");
    toast.error("Error adding item quantity in cart");
  }
}

async function decreaseItemQuantityInDatabase(item) {
  try {
    await apiDecreaseQuantity(cartId, item);
  } catch (error) {
    console.error("Error adding item quantity in cart");
    toast.error("Error adding item quantity in cart");
  }
}

async function clearCartInDatabase() {
  try {
    await apiClearCart(cartId);
  } catch (error) {
    console.error("Error deleting cart from database");
    toast.error("Error deleting cart from database");
  }
}
//##########################################################################################################
export const {
  addToCart,
  deleteFromCart,
  increaseItemQuantityInCart,
  decreaseItemQuantityInCart,
  clearCart,
} = cartSlice.actions;

//##########################################################################################################
//Selector functions

export const getCart = (store) => store.cart.cart;

export const getTotalCartQuantity = (store) => {
  const cartItems = store.cart.cart.reduce(
    (accum, item) => item.quantity + accum,
    0
  );
  return cartItems;
};

export const getTotalCartPrice = (store) => {
  const cartPrice = store.cart.cart.reduce(
    (accum, item) => item.totalPrice + accum,
    0
  );
  return cartPrice;
};

export const getCurrentQuantityById = (id) => (store) =>
  store.cart.cart.find((item) => item.itemId === id)?.quantity ?? 0;

//##########################################################################################################
export default cartSlice.reducer;
