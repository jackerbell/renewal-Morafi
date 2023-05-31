import { createSlice } from "@reduxjs/toolkit";

export const globalLoadingSlice = createSlice({
  name: "AuthModal",
  initialState: {
    isGlobalLoading: false
  },
  reducers: {
    setIsGlobalLoading: (state,action) => {
      state.appState = action.payload
    },
  }
});

export const {
  setIsGlobalLoading
} = globalLoadingSlice.actions
export default globalLoadingSlice.reducer