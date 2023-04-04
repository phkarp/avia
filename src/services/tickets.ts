import { ITicket } from '../models';

async function getAllTickets(searchId: string, arr: ITicket[] = []): Promise<ITicket[]> {
  try {
    const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);

    if (!response.ok) {
      if (response.status === 500) {
        await getAllTickets(searchId, arr);
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
    return await getAllTickets(searchId, arr);
  }
}

export default getAllTickets;
