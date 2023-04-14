import { Ticket } from '../type/ticket';

export async function getAllTickets(searchId: string, arr: Ticket[] = []): Promise<Ticket[]> {
  try {
    const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);

    if (!response.ok) {
      if (response.status === 500) {
        return await getAllTickets(searchId, arr);
      }
    }

    const data = await response.json();

    if (!data.stop) {
      arr.push(...data.tickets);
      await getAllTickets(searchId, arr);
      return arr;
    }
    return arr;
  } catch (e) {
    if (e instanceof Error && e.message === 'reload') {
      return await getAllTickets(searchId, arr);
    }
    return arr;
  }
}
