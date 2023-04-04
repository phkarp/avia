// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import Filter from '../filter/filter';
import TicketsContainer from '../tickets-container/tickets-container';
import Logo from '../logo/logo';
import getAllTickets from '../../services/tickets';
import getSearchId from '../../services/search-id';

import classes from './app.module.scss';

const App = () => {
  getSearchId()
    .then(async res => {
      return await getAllTickets(res.searchId);
    })
    .then(tickets => console.log(tickets));

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
