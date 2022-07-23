import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    addFilter: (_, action) => {
      return action.payload;
    },
  },
});

export const { addFilter } = filterSlice.actions;
export const filterSliceReducer = filterSlice.reducer;
