import {FC, FormEvent} from "react";

import {useAppDispatch, useAppSelector} from "../../hook";
import {clickShowMore} from "../../store/aviaSlice";

import classes from './more-ticket.module.scss';

const MoreTicket: FC = () => {
  const dispatch = useAppDispatch();
  const tickets = useAppSelector(state => state.tickets.tickets);

  const btnOnClick = (e: FormEvent) => {
    e.preventDefault();
    dispatch(clickShowMore(5));
  };
  const buttonMore = <button className={classes['btn-more']} onClick={btnOnClick}>Показать ещё 5 билетов</button>;
  const visible = tickets.length && buttonMore || null;

  return visible;
};

export default MoreTicket;
