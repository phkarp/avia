import { FC } from 'react';

import type { ITicketProps } from '../../type/ticket';
import { getDuration, getTimeFly, getCountTransfer } from '../../utils/info-ticket';

import classes from './ticket.module.scss';

export const Ticket: FC<ITicketProps> = ({ ticket }) => {
  const { segments } = ticket;

  const there = segments[0];
  const transferThere = there.stops;

  const back = segments[1];
  const transferBack = back.stops;

  return (
    <div className={classes.ticket}>
      <div className={classes['price-and-logo']}>
        <span className={classes.price}>{ticket.price.toLocaleString()} P</span>
        <img src={`https://pics.avs.io/99/36/${ticket.carrier}.png`} alt="" />
      </div>
      <div className={classes.info}>
        <div>
          <span>{`${there.origin}-${there.destination}`}</span>
          <span>{getTimeFly(there)}</span>
        </div>
        <div>
          <span>В пути</span>
          <span>{getDuration(there.duration)}</span>
        </div>
        <div>
          <span>{getCountTransfer(transferThere.length)}</span>
          <span>{there.stops.join(', ')}</span>
        </div>
      </div>
      <div className={classes.info}>
        <div>
          <span>{`${back.origin}-${back.destination}`}</span>
          <span>{getTimeFly(back)}</span>
        </div>
        <div>
          <span>В пути</span>
          <span>{getDuration(back.duration)}</span>
        </div>
        <div>
          <span>{getCountTransfer(transferBack.length)}</span>
          <span>{back.stops.join(', ')}</span>
        </div>
      </div>
    </div>
  );
};
