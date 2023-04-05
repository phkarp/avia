// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import {Fragment, useEffect} from "react";

import Filter from '../filter/filter';
import TicketsContainer from '../tickets-container/tickets-container';
import Logo from '../logo/logo';
import getAllTickets from '../../services/tickets';
import getSearchId from '../../services/search-id';
import {useAppDispatch, useAppSelector} from '../../hook';
import { addTickets } from '../../store/aviaSlice';
// import TicketContainerWithEmptyList from "../tickets-container/tickets-container";

import Loader from "./loader/loader";
import classes from './app.module.scss';
// import tickets from "../../services/tickets";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
      getSearchId()
          .then(res => getAllTickets(res.searchId))
          .then(tickets => dispatch(addTickets(tickets)));
      }, []);

  const bodySection = <Fragment><header>
      <Logo />
  </header>
      <main className={classes.main}>
          <Filter />
          <TicketsContainer />
      </main></Fragment>;

    const tickets = useAppSelector(state => state.tickets.ticketsDefault);
  return (
    <section className={classes.section}>
        {tickets.length && bodySection|| <Loader />}
    </section>
  );
};

export default App;
