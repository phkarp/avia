import {createSlice} from '@reduxjs/toolkit';
import type { PayloadAction, Draft } from '@reduxjs/toolkit';

import { ITicket } from '../models';

type AviaState = { tickets: ITicket[]; ticketsDefault: ITicket[]; filters: string[]; sorting: string, countVisibleTickets: number };

const initialState: AviaState = {
  tickets: [],
  ticketsDefault: [],
  filters: [],
  sorting: 'rb-cheap',
  countVisibleTickets: 5
};

const sortTickets = (arr: ITicket[], typeSort: string): ITicket[] => {

  if (typeSort === 'rb-optimal') {
    return arr;
  }

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

const filterTicked = (tickets: ITicket[], filters: string[]) => {
  let filteredTicket: ITicket[] = tickets;

  filters.forEach(filter => {
    switch (filter) {
      case 'Все':
        break;
      case 'Без пересадок':
        filteredTicket = filteredTicket.filter(ticket => !(ticket.segments[0].stops.length && ticket.segments[1].stops.length));
        break;
      case '1 пересадка':
        filteredTicket = filteredTicket.filter(ticket => (ticket.segments[0].stops.length === 1 || ticket.segments[1].stops.length === 1));
        break;
      case '2 пересадки':
        filteredTicket = filteredTicket.filter(ticket => (ticket.segments[0].stops.length === 2 || ticket.segments[1].stops.length === 2));
        break;
      case '3 пересадки':
        filteredTicket = filteredTicket.filter(ticket => (ticket.segments[0].stops.length === 3 || ticket.segments[1].stops.length === 3));
        break;
      default:
        break;
    }
  });

  return filteredTicket;
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
        if (state.filters.length) {
          state.tickets = filterTicked(state.ticketsDefault, state.filters);
          return;
        }
        state.tickets = state.ticketsDefault;
        return;
      }

      const { tickets, sorting}  = state;

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

      const filteredTickets = filterTicked(tickets, filters);
      state.tickets = sortTickets(filteredTickets, state.sorting);
      state.filters = filters;

    },

    clickShowMore: (state: Draft<AviaState>, action: PayloadAction<number>) => {
      state.countVisibleTickets += action.payload;
    },
  },
});

export const { addTickets, handleSorting, clickShowMore, handleFilter } = aviaSlice.actions;

export default aviaSlice.reducer;


// сортировка рандомно
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

// фильтрация через if's
// if (isElemInArr) {
// if (filters.length === 5 && currentFilter === 'Все') {
//   state.filters = [];
//   return;
// }
// if (filters.length === 5) {
//   const index = filters.indexOf('Все');
//   filters.splice(index, 1);
// }
// const index = filters.indexOf(currentFilter);
// filters.splice(index, 1);
// return;
// }

// if (currentFilter === 'Все') {
//   state.filters = ['Все', 'Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];
//   return;
// }
// if (filters.length === 3 && currentFilter !== 'Все') {
//   filters.push('Все');
// }