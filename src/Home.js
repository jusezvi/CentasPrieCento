import './Home.css';
import Header from './Header';
import Overall from './Overall';
import Transaction from './Transaction';

function Home() {
  return (
    <div className="home">
      <Header />
      <div className='main'>
        <section>
            <Overall />
        </section>
        <aside>
            All transactions:
            <Transaction name="New Laptop" category="Home" price="580"/>
            <Transaction name="New TV" category="Home" price="900"/>
            <Transaction name="Repair" category="Car" price="150"/>
            <Transaction name="Fuel" category="Car" price="53.99"/>
            <Transaction name="Tickets" category="Journey" price="45.50"/>
            <button>Add new transaction</button>
        </aside>
      </div>
    </div>
  );
}

export default Home;