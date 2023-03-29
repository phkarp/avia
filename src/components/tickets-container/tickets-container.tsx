import { Fragment } from 'react';

import TicketsList from '../tickets-list/tickets-list';

const TicketsContainer = () => {
  return (
    <Fragment>
      <div>
        <input type="radio" name="sorting" />
        <input type="radio" name="sorting" />
        <input type="radio" name="sorting" />
      </div>
      <TicketsList />
      <button>more ticket</button>
    </Fragment>
  );
};

export default TicketsContainer;
