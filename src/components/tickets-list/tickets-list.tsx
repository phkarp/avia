import { FC } from 'react';

import Ticket from '../ticket/ticket';
import { useAppSelector } from '../../hook';

import classes from './ticket-list.module.scss'

const TicketsList: FC = () => {
  const tickets = useAppSelector(state => state.tickets.tickets);
  return (
    <ul className={classes['ticket-list']}>
        {tickets && tickets.map((ticket, i) => {
            return i < 5 ? <Ticket key={i} ticket={ticket}/> : null;
        })}
    </ul>
  );
};

export default TicketsList;
