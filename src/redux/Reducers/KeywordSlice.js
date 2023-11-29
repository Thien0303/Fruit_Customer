import { createSlice } from '@reduxjs/toolkit';

// Create a slice
const keywordSlice = createSlice({
  name: 'keyword',
  initialState: {
    value: '',
  },
  reducers: {
    setKeyword: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Extract actions and reducer
export const { setKeyword } = keywordSlice.actions;
export default  keywordSlice.reducer;