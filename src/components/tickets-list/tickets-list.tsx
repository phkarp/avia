import { useSelector } from 'react-redux';
import { Fragment } from 'react';

import Ticket from '../ticket/ticket';

// const tickets = useSelector(state => state.tickets.tickets);

const TicketsList = () => {
  return (
    <Fragment>
      <Ticket />
      <Ticket />
      <Ticket />
    </Fragment>
  );
};

export default TicketsList;
