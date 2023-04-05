import {FC} from "react";

import TicketsList from '../tickets-list/tickets-list';
import Sorting from '../sorting/sorting';
import MoreTicket from '../more-ticket/more-ticket';
// import withEmptyList from "../hoc/with-empty-list";
import {useAppSelector} from "../../hook";

import classes from './ticket-container.module.scss';

const TicketsContainer: FC = () => {

    const tickets = useAppSelector(state => state.tickets.tickets);
    const container = <div className={classes['ticket-container']}>
        <Sorting />
        <TicketsList />
        <MoreTicket />
    </div>;

    const text = <div className={classes['ticket-container']}><h1 style={({ display: "block", width: "1180px"})}>Таких билетов нет</h1></div>
  return tickets.length && container || text;
};
// const TicketContainerWithEmptyList = withEmptyList(TicketsContainer);
export default TicketsContainer;
