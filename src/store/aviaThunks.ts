import { createAsyncThunk } from '@reduxjs/toolkit';

import { Ticket } from '../type/ticket';
import { getAllTickets } from '../services/get-tickets';

export const fetchSearchId = createAsyncThunk<string, undefined, { rejectValue: string }>(
  'content/fetchSearchId',
  async function (_, { rejectWithValue }) {
    const response = await fetch('https://aviasales-test-api.kata.academy/search');

    if (!response.ok) {
      return rejectWithValue("Cant' t load searchId. Server Error.");
    }

    const data = await response.json();

    return data.searchId;
  }
);

export const fetchTickets = createAsyncThunk<Ticket[], string>('content/fetchTickets', async function (searchId) {
  const response: Ticket[] | undefined = await getAllTickets(searchId);

  if (response) {
    return response;
  }

  throw new Error("Cant' t load content. Server Error.");
});
