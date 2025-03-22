import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    isAuthenticated: false,
    forgetAuth: false,
    resetFlowStep:"verify",
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setAuthenticate: (state, action) => {
      state.isAuthenticated = true;
    },
    setForgetAuth: (state, action) => {
      state.forgetAuth = action.payload;
    },
    setResetFlowStep: (state, action) => {
      state.resetFlowStep = action.payload;
    },
  },
});

export const {
  setLoading,
  setUser,
  logoutUser,
  setAuthenticate,
  setForgetAuth,
  setResetFlowStep
} = authSlice.actions;
export default authSlice.reducer;
