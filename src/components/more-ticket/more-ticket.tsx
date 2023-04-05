import {FC} from "react";

import classes from './more-ticket.module.scss';

const MoreTicket: FC = () => {
  return <button className={classes['btn-more']}>Показать ещё 5 билетов</button>;
};

export default MoreTicket;
