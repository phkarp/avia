import { Ticket } from '../type/ticket';

export const filterTicket = (tickets: Ticket[], filters: string[]) => {
  let filteredTicket: Ticket[] = tickets;

  filters.forEach(filter => {
    switch (filter) {
      case 'Все':
        break;
      case 'Без пересадок':
        filteredTicket = filteredTicket.filter(
          ticket => !(ticket.segments[0].stops.length && ticket.segments[1].stops.length)
        );
        break;
      case '1 пересадка':
        filteredTicket = filteredTicket.filter(
          ticket => ticket.segments[0].stops.length === 1 || ticket.segments[1].stops.length === 1
        );
        break;
      case '2 пересадки':
        filteredTicket = filteredTicket.filter(
          ticket => ticket.segments[0].stops.length === 2 || ticket.segments[1].stops.length === 2
        );
        break;
      case '3 пересадки':
        filteredTicket = filteredTicket.filter(
          ticket => ticket.segments[0].stops.length === 3 || ticket.segments[1].stops.length === 3
        );
        break;
      default:
        break;
    }
  });

  return filteredTicket;
};
