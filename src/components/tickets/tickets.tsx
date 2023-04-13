import { FC, FormEvent } from 'react';

import { TicketsList } from '../tickets-list/tickets-list';
import { Sorting } from '../sorting/sorting';
import { useAppDispatch, useAppSelector } from '../../hook';
import { clickShowMore } from '../../store/aviaSlice';

import classes from './tickets.scss';

export const Tickets: FC = () => {
  const dispatch = useAppDispatch();
  const tickets = useAppSelector(state => state.tickets.tickets);

  const btnOnClick = (e: FormEvent) => {
    e.preventDefault();
    dispatch(clickShowMore(5));
  };

  if (!tickets.length) {
    return (
      <div className={classes['ticket-container']}>
        <h1 style={{ display: 'block', width: '1180px' }}>Таких билетов нет</h1>
      </div>
    );
  }
  return (
    <div className={classes['ticket-container']}>
      <Sorting />
      <TicketsList />
      <button className={classes['btn-more']} onClick={btnOnClick}>
        Показать ещё 5 билетов
      </button>
    </div>
  );
};
