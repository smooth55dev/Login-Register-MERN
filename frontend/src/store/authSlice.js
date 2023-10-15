import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setUserName } = authSlice.actions;

export default authSlice.reducer;
