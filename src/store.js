import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Pages/Cart/cartSlice";
import authReducer from "./Components/Auth/authSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});

export default store;
