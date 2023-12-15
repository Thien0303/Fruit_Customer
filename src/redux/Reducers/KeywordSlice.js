import { createSlice } from '@reduxjs/toolkit';

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

export const { setKeyword } = keywordSlice.actions;
export default  keywordSlice.reducer;