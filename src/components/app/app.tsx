import {Fragment, useEffect} from "react";

import Filter from '../filter/filter';
import TicketsContainer from '../tickets-container/tickets-container';
import Logo from '../logo/logo';
// import getAllTickets from '../../services/tickets';
// import getSearchId from '../../services/search-id';
import {useAppDispatch, useAppSelector} from '../../hook';
import { fetchSearchId, fetchTickets } from '../../store/aviaSlice';

import Loader from "./loader/loader";
import classes from './app.module.scss';

const App = () => {
  const dispatch = useAppDispatch();
  const {searchId} = useAppSelector(state => state.tickets);

  // useEffect(() => {
  //     // getSearchId()
  //     //     .then(res => getAllTickets(res.searchId))
  //     //     .then(tickets => dispatch(addTickets(tickets)));
  //     dispatch(fetchSearchId());
  //     }, []);

    // useEffect(() => {
    //     dispatch(fetchTickets());
    // }, []);


    useEffect(() => {
        const loadSearchId = async () => {
            dispatch(fetchSearchId());
        };
        loadSearchId();
    }, []);

    useEffect(() => {
        const loadTickets = async (searchId: string) => {
            dispatch(fetchTickets(searchId));
        };
        if ( searchId ) {
            loadTickets(searchId);
        }
    }, [searchId]);



  // console.log(searchId);

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
