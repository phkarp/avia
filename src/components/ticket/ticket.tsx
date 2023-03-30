import classes from './ticket.module.scss';
import logoCompany from './S7 Logo.svg';

const Ticket = () => {
  return (
    <div className={classes.ticket}>
      <div className={classes['price-and-logo']}>
        <span className={classes.price}>13400 P</span>
        <img src={String(logoCompany)} alt="" />
      </div>
      <div className={classes.info}>
        <div>
          <span>mov-hkt</span>
          <span>10:45 – 08:00</span>
        </div>
        <div>
          <span>В пути</span>
          <span>21ч 15м</span>
        </div>
        <div>
          <span>2 пересадки</span>
          <span>HKG, JNB</span>
        </div>
      </div>
      <div className={classes.info}>
        <div>
          <span>mov-hkt</span>
          <span>11:20 – 00:50</span>
        </div>
        <div>
          <span>В пути</span>
          <span>13ч 30м</span>
        </div>
        <div>
          <span>2 пересадки</span>
          <span>HKG, JNB</span>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
