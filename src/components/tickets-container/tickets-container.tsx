import {FC} from "react";

import TicketsList from '../tickets-list/tickets-list';
import Sorting from '../sorting/sorting';
import MoreTicket from '../more-ticket/more-ticket';

import classes from './ticket-container.module.scss';

const TicketsContainer: FC = () => {
  return (
    <div className={classes['ticket-container']}>
      <Sorting />
      <TicketsList />
      <MoreTicket />
    </div>
  );
};

export default TicketsContainer;
