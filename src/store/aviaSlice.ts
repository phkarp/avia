import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ITicket } from '../models';

type AviaState = { tickets: ITicket[]; filters: string[]; sorting: string };

const initialState: AviaState = {
  tickets: [],
  filters: [],
  sorting: '',
};

const aviaSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    addTickets(state, actions) {
      state.tickets = actions.payload;
      console.log(actions.payload);
    },
    handleSorting(state, action: PayloadAction<string>) {
      console.log(state, action.payload);
    },
    handleFilter(state, action) {
      console.log(state, action);
    },
    showMore(state, action) {
      console.log(state, action);
    },
  },
});

export const { addTickets, handleSorting, showMore, handleFilter } = aviaSlice.actions;

export default aviaSlice.reducer;
