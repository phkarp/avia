import { Ticket } from '../type/ticket';

export const sortTickets = (arr: Ticket[], typeSort: string): Ticket[] => {
  if (typeSort === 'rb-optimal') {
    return arr;
  }

  const sortByArr = (arr: Ticket[], sorter: (a: Ticket, b: Ticket) => number): Ticket[] => {
    return arr.sort(sorter);
  };

  let sort: (a: Ticket, b: Ticket) => number = () => 0;

  if (typeSort === 'rb-cheap') {
    sort = (a, b) => {
      return a.price - b.price;
    };
  }
  if (typeSort === 'rb-fast') {
    sort = (a, b) => {
      return a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration);
    };
  }

  return sortByArr(arr, sort);
};
