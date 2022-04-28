import './Home.css';
import Header from './Header';
import Overall from './Overall';
import Transactions from './Transactions';
import Wallet from './Wallet';
import Budgets from './Budgets';
import { useEffect, useState } from 'react';
import { exVar } from './ExtendVariables';

function Home() {
  const [earnings, setEarnings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState('Vardenis');
  const [count, setCount] = useState(0);

  useEffect(() => {
    callAPI(exVar.IS_NEW_EARNING)
    setCount(count + 1);

  }, [count]);

  function callAPI(check = false) {
    if (!check) {
      return;
    }
    exVar.IS_NEW_EARNING = false;
    fetch('http://localhost:8000/budget')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setTransactions(data);
        setEarnings(data);
        console.log(earnings)
      });
  }

  return (
    <div className="home">
      <Header />
      <div className='main'>
        <Wallet earnings={earnings} user={user} />
        <section>
          <Overall transactions={transactions} />
          <Budgets />
        </section>
        <aside>
          <Transactions transactions={transactions} user={user} />
        </aside>
      </div>
    </div>
  );
}

export default Home;