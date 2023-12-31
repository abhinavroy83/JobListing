import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.status = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
