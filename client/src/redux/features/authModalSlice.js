import { createSlice } from '@reduxjs/toolkit';

export const authModalSlice = createSlice({
  name: 'AuthModal',
  initialState: {
    isAuthModalOpen: false
  },
  reducers: {
    setisAuthModalOpen: (state,action) => {
      state.appState = action.payload
    },
  }
});

export const {
  setisAuthModalOpen
} = authModalSlice.actions
export default authModalSlice.reducer