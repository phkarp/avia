import { useEffect } from 'react';

import { Filter } from '../filter/filter';
import { Content } from '../content/content';
import { Loader } from '../loader/loader';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { fetchSearchId, fetchTickets } from '../../store/aviaThunks';

import logo from './logo.svg';
import classes from './app.module.scss';

export const App = () => {
  const dispatch = useAppDispatch();
  const { searchId } = useAppSelector(state => state.tickets);

  useEffect(() => {
    const loadSearchId = () => {
      dispatch(fetchSearchId());
    };
    loadSearchId();
  }, []);

  useEffect(() => {
    const loadTickets = (searchId: string) => {
      dispatch(fetchTickets(searchId));
    };
    if (searchId) {
      loadTickets(searchId);
    }
  }, [searchId]);

  const tickets = useAppSelector(state => state.tickets.ticketsDefault);

  if (!tickets.length) {
    return (
      <section className={classes.section}>
        <Loader />
      </section>
    );
  }

  return (
    <section className={classes.section}>
      <header>
        <img src={String(logo)} alt="" className={classes['logo-container']}></img>
      </header>
      <main className={classes.main}>
        <Filter />
        <Content />
      </main>
    </section>
  );
};
