import { Info } from '../type/ticket';

export const getTimeFly = (info: Info) => {
  const time = new Date(info.date).getTime();

  const hoursDeparture = new Date(time).getHours();
  const minutesDeparture = new Date(time).getMinutes();
  const timeDeparture = `${hoursDeparture}:${minutesDeparture < 10 ? `0${minutesDeparture}` : minutesDeparture}`;

  const hoursArrival = new Date(time + info.duration * 60000).getHours();
  const minutesArrival = new Date(time + info.duration * 60000).getMinutes();
  const timeArrival = `${hoursArrival}:${minutesArrival < 10 ? `0${minutesArrival}` : minutesArrival}`;

  return `${timeDeparture} - ${timeArrival}`;
};

export const getDuration = (duration: number) => {
  return `${(duration / 60).toFixed()}ч ${duration % 60}м`;
};

export const getCountTransfer = (lengthArr: number) => {
  const arrText = ['пересадка', 'пересадки', 'пересадок'];

  const lengthArr10 = lengthArr % 10;
  if (lengthArr10 > 4) {
    return `${lengthArr} ${arrText[2]}`;
  }
  if (lengthArr10 > 1 && lengthArr10 < 5) {
    return `${lengthArr} ${arrText[1]}`;
  }
  if (lengthArr10 == 1) {
    return `${lengthArr} ${arrText[0]}`;
  }
  return 'Без пересадок';
};
