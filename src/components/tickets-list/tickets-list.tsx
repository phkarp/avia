import { FC } from 'react';

import Ticket from '../ticket/ticket';
import { useAppSelector } from '../../hook';

import classes from './ticket-list.module.scss'

const TicketsList: FC = () => {
  const { countVisibleTickets } = useAppSelector(state => state.tickets);
  const tickets = useAppSelector(state => state.tickets.tickets).slice(0, countVisibleTickets);
  return (
    <ul className={classes['ticket-list']}>
        {tickets && tickets.map((ticket, i) => <Ticket key={i} ticket={ticket}/>)}
    </ul>
  );
};

export default TicketsList;
