import { createSlice } from "@reduxjs/toolkit";

export const globalLoadingSlice = createSlice({
  name: "AuthModal",
  initialState: {
    isGlobalLoading: false
  },
  reducers: {
    setIsGlobalLoading: (state,action) => {
      state.isGlobalLoading = action.payload
    },
  }
});

export const {
  setIsGlobalLoading
} = globalLoadingSlice.actions

export default globalLoadingSlice.reducer