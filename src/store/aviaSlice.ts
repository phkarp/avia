import { createSlice } from '@reduxjs/toolkit';

const aviaSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    filters: '',
    sorting: '',
  },
  reducers: {
    handleSorting(state, action) {},
    handleFilter(state, action) {},
    showMore(state, action) {},
  },
});

export const { handleSorting, showMore, handleFilter } = aviaSlice.actions;

export default aviaSlice.reducer;
