import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type { PayloadAction, Draft } from '@reduxjs/toolkit';

import {getAllTickets} from '../services/tickets';
import { ITicket } from '../models';

type AviaState = { tickets: ITicket[]; ticketsDefault: ITicket[]; filters: string[]; sorting: string, countVisibleTickets: number, searchId: string };

const initialState: AviaState = {
  tickets: [],
  ticketsDefault: [],
  filters: [],
  sorting: 'rb-cheap',
  countVisibleTickets: 5,
  searchId: ''
};

export const fetchSearchId = createAsyncThunk<string, undefined, { rejectValue: string }>(
    'tickets/fetchSearchId',
    async function (_, {rejectWithValue}) {
        const response = await fetch('https://aviasales-test-api.kata.academy/search');

        if (!response.ok) {
          return rejectWithValue('Cant\' t load searchId. Server Error.');
        }

        const data = await response.json();

        return data.searchId;

    }
)

export const fetchTickets = createAsyncThunk<ITicket[], string>(
    'tickets/fetchTickets',
    async function (searchId) {
      const response: ITicket[] | undefined = await getAllTickets(searchId);

      if (response) {
        return response;
      }

      throw new Error('Cant\' t load tickets. Server Error.');
    }
)



const aviaSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {

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
  extraReducers: (builder) => {
    builder
        .addCase(fetchSearchId.fulfilled, (state, action) => {
          state.searchId = action.payload;
        })
        .addCase(fetchTickets.fulfilled, (state, action) => {
          state.ticketsDefault = action.payload;
          state.tickets = sortTickets(action.payload.slice(), state.sorting);
        })
  },

});


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

export const { handleSorting, clickShowMore, handleFilter } = aviaSlice.actions;

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

// загрузка одного билета
// const fetchTickets = createAsyncThunk(
//     'tickets/fetchTickets',
//     async function (searchId, {rejectWithValue}) {
//       const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
//       //
//       // if (!response.ok) {
//       //   if (response.status === 500) {
//       //     dispatch(fetchTickets(searchId));
//       //   }
//       //   return rejectWithValue('Cant\' t load searchId. Server Error.');
//       // }
//       //
//       // const data = await response.json();
//       // const tickets = data.tickets;
//       //
//       // return tickets;
//     }
// )