import {ITicket} from "../../models";

import classes from './ticket.module.scss';

const Ticket = (props: {key:number, ticket: ITicket}) => {

  const {ticket} = props;
  const {segments} = ticket;

  const there = segments[0];
  const transferThere = there.stops;

  const back = segments[1];
  const transferBack = back.stops;

  type Info = {
    date: string
    destination: string
    duration: number
    origin: string
    stops: string[]
  };

  const getTimeFly = (info: Info) => {
    const time = new Date(info.date).getTime();

    const hoursDeparture = new Date(time).getHours();
    const minutesDeparture = new Date(time).getMinutes();
    const timeDeparture  = `${hoursDeparture}:${minutesDeparture < 10 ? `0${minutesDeparture}` : minutesDeparture}`;

    const hoursArrival = new Date(time + info.duration * 60000).getHours();
    const minutesArrival = new Date(time + info.duration * 60000).getMinutes();
    const timeArrival = `${hoursArrival}:${minutesArrival < 10 ? `0${minutesArrival}` : minutesArrival}`;

    return `${timeDeparture} - ${timeArrival}`;
  };

  const getDuration = (duration: number) => {
    return `${(duration/60).toFixed()}ч ${duration%60}м`
  }

  const getCountTransfer = (lengthArr: number) => {
      const arrText = ['пересадка', 'пересадки', 'пересадок'];

      const lengthArr10 = lengthArr % 10;
      if (lengthArr10 > 4) { return `${lengthArr} ${arrText[2]}`; }
      if (lengthArr10 > 1 && lengthArr10 < 5) { return `${lengthArr} ${arrText[1]}`; }
      if (lengthArr10 == 1) { return `${lengthArr} ${arrText[0]}`; }
      return 'Без пересадок';
  }



  console.log(there.stops.join(', '))

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

export default Ticket;
