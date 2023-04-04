// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import {useEffect} from "react";

import Filter from '../filter/filter';
import TicketsContainer from '../tickets-container/tickets-container';
import Logo from '../logo/logo';
import getAllTickets from '../../services/tickets';
import getSearchId from '../../services/search-id';
import { useAppDispatch } from '../../hook';
import { addTickets } from '../../store/aviaSlice';

import classes from './app.module.scss';

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
      getSearchId()
          .then(async res => {
              return await getAllTickets(res.searchId);
          })
          .then(tickets => {
              dispatch(addTickets(tickets));
              return tickets;
          });
      }, []);

  return (
    <section className={classes.section}>
      <header>
        <Logo />
      </header>
      <main className={classes.main}>
        <Filter />
        <TicketsContainer />
      </main>
    </section>
  );
};

export default App;
