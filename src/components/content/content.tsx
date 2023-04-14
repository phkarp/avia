import { FC, FormEvent } from 'react';

import { TicketsList } from '../tickets-list/tickets-list';
import { Sorting } from '../sorting/sorting';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { clickShowMore } from '../../store/aviaSlice';

import classes from './content.module.scss';

export const Content: FC = () => {
  const dispatch = useAppDispatch();
  const tickets = useAppSelector(state => state.tickets.tickets);

  const btnOnClick = (e: FormEvent) => {
    e.preventDefault();
    dispatch(clickShowMore(5));
  };

  if (!tickets.length) {
    return (
      <div className={classes.content}>
        <h1 style={{ display: 'inline-block', width: '450px' }}>Таких билетов нет</h1>
      </div>
    );
  }
  return (
    <div className={classes.content}>
      <Sorting />
      <TicketsList />
      <button className={classes['btn-more']} onClick={btnOnClick}>
        Показать ещё 5 билетов
      </button>
    </div>
  );
};
