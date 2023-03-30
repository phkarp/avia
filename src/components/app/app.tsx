import Filter from '../filter/filter';
import TicketsContainer from '../tickets-container/tickets-container';
import Logo from '../logo/logo';

const App = () => {
  const a: number = 4;
  return (
    <section>
      <header>
        <Logo />
      </header>
      <div>
        <Filter a={a} />
        <TicketsContainer />
      </div>
    </section>
  );
};

export default App;
