import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authState: "login",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleAuthState(state, action) {
      state.authState = action.payload;
    },
  },
});

export const { handleAuthState } = authSlice.actions;

export const getAuthState = (store) => store.auth.authState;

export default authSlice.reducer;
