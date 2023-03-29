import Filter from '../filter/filter';
import TicketsContainer from '../tickets-container/tickets-container';

const App = () => {
  return (
      <section>
        <header></header>
        <div>
          <Filter />
          <TicketsContainer />
        </div>
      </section>
  );
};

export default App;
