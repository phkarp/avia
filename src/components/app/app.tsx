import Filter from '../filter/filter';
import TicketsContainer from '../tickets-container/tickets-container';
import Logo from '../logo/logo';

import classes from './app.module.scss';

const App = () => {
  const a: number = 4;
  return (
    <section className={classes.section}>
      <header>
        <Logo />
      </header>
      <main className={classes.main}>
        <Filter a={a} />
        <TicketsContainer />
      </main>
    </section>
  );
};

export default App;
