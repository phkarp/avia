import { Fragment } from 'react';

import TicketsList from '../tickets-list/tickets-list';
import Sorting from '../sorting/sorting';

const TicketsContainer = () => {
  return (
    <Fragment>
      <Sorting />
      <TicketsList />
      <button>more ticket</button>
    </Fragment>
  );
};

export default TicketsContainer;
