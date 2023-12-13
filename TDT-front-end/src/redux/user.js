import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
const initialState = {
  auth: false,
  user: null,
  token: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, auth } = action.payload;
      state.auth = auth;
      state.token = user;
      state.user = jwtDecode(user);
    },
    resetUser: (state, action) => {
      const { user } = action.payload;
      state.token = user;
      state.user = jwtDecode(user);
    },
    clearUser: (state) => {
      state.auth = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const { setUser, resetUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
