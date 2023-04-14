import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction, Draft } from '@reduxjs/toolkit';

import { Ticket } from '../type/ticket';
import { sortTickets } from '../utils/sorting';
import { filterTicket } from '../utils/filter';

import { fetchTickets, fetchSearchId } from './aviaThunks';

type AviaState = {
  tickets: Ticket[];
  ticketsDefault: Ticket[];
  filters: string[];
  sorting: string;
  countVisibleTickets: number;
  searchId: string;
};

const initialState: AviaState = {
  tickets: [],
  ticketsDefault: [],
  filters: [],
  sorting: 'rb-cheap',
  countVisibleTickets: 5,
  searchId: '',
};

const aviaSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    handleSorting: (state: Draft<AviaState>, action: PayloadAction<string>) => {
      state.sorting = action.payload;

      if (state.sorting === 'rb-optimal') {
        if (state.filters.length) {
          state.tickets = filterTicket(state.ticketsDefault, state.filters);
          return;
        }
        state.tickets = state.ticketsDefault;
        return;
      }

      const { tickets, sorting } = state;

      state.tickets = sortTickets(tickets, sorting);
    },

    handleFilter: (state: Draft<AviaState>, action: PayloadAction<string>) => {
      let filters = state.filters;
      const currentFilter = action.payload;
      const tickets = state.ticketsDefault.slice();

      const isElemInArr: boolean = filters.includes(currentFilter);

      switch (currentFilter) {
        case 'Все':
          if (isElemInArr && filters.length === 5) {
            filters = [];
            break;
          }

          filters = ['Все', 'Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];
          break;

        case 'Без пересадок':
        case '1 пересадка':
        case '2 пересадки':
        case '3 пересадки':
          if (isElemInArr) {
            if (filters.length === 5) {
              const index = filters.indexOf('Все');
              filters.splice(index, 1);
            }
            const index = filters.indexOf(currentFilter);
            filters.splice(index, 1);
            break;
          }

          if (filters.length === 3) {
            filters.push('Все');
          }

          filters.push(currentFilter);
          break;
      }

      const filteredTickets = filterTicket(tickets, filters);
      state.tickets = sortTickets(filteredTickets, state.sorting);
      state.filters = filters;
    },

    clickShowMore: (state: Draft<AviaState>, action: PayloadAction<number>) => {
      state.countVisibleTickets += action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.ticketsDefault = action.payload;
        state.tickets = sortTickets(action.payload.slice(), state.sorting);
      });
  },
});

export const { handleSorting, clickShowMore, handleFilter } = aviaSlice.actions;

export default aviaSlice.reducer;
