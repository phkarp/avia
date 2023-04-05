import {createSlice} from '@reduxjs/toolkit';
import type { PayloadAction, Draft } from '@reduxjs/toolkit';

import { ITicket } from '../models';

type AviaState = { tickets: ITicket[]; ticketsDefault: ITicket[]; filters: string[]; sorting: string, countVisibleTickets: number };

const initialState: AviaState = {
  tickets: [],
  ticketsDefault: [],
  filters: ['Все'],
  sorting: 'rb-cheap',
  countVisibleTickets: 5
};

const sortTickets = (arr: ITicket[], typeSort: string): ITicket[] => {

  const sortByArr = ((arr: ITicket[], sorter: (a: ITicket, b: ITicket) => number): ITicket[] => {
    return arr.sort(sorter);
  });

  let sort: (a: ITicket, b:ITicket) => number = () => 0;

  if (typeSort === 'rb-cheap') {
    sort = (a, b) => {
      return a.price - b.price;
    };
  }
  if (typeSort === 'rb-fast') {
    sort = (a, b) => {
      return (a.segments[0].duration + a.segments[1].duration) - ( b.segments[0].duration + b.segments[1].duration);
    };
  }

  return sortByArr(arr, sort);

}

const aviaSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {

    addTickets: (state: Draft<AviaState>, actions: PayloadAction<ITicket[]>) => {
      state.ticketsDefault = actions.payload;
      state.tickets = sortTickets(actions.payload.slice(), state.sorting);
    },

    handleSorting: (state: Draft<AviaState>, action: PayloadAction<string>) => {
      state.sorting = action.payload;

      if (state.sorting === 'rb-optimal') {
        state.tickets = state.ticketsDefault;
        return;
      }

      const { tickets, sorting}  = state;

      state.tickets = sortTickets(tickets, sorting);
    },

    handleFilter: (state: Draft<AviaState>, action: PayloadAction<string>) => {
      const filters = state.filters;
      const currentFilter = action.payload;

      const isElemInArr: boolean = filters.includes(currentFilter);

      if (isElemInArr) {
        const index = filters.indexOf(currentFilter);
        filters.splice(index, 1);
        return;
      }
      filters.push(currentFilter);
    },

    clickShowMore: (state: Draft<AviaState>, action: PayloadAction<number>) => {
      state.countVisibleTickets += action.payload;
    },
  },
});

export const { addTickets, handleSorting, clickShowMore, handleFilter } = aviaSlice.actions;

export default aviaSlice.reducer;



// if (typeSort === 'rb-optimal') {
//   const sortRandom = (arr: ITicket[]) => {
//     let random, randomElem;
//     for(let i = arr.length - 1; i > 0; i--){
//       random = Math.floor(Math.random()*(i + 1));
//       randomElem = arr[random];
//       arr[random] = arr[i];
//       arr[i] = randomElem;
//     }
//     return arr;
//   };
//
//   return sortRandom(arr);
// }