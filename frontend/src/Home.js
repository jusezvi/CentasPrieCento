import './Home.css';
import Transactions from './Transactions';
import Wallet from './Wallet';
import Budgets from './Budgets';
import { useEffect, useState } from 'react';
import { exVar } from './ExtendVariables';
import MainChartdata from './charts/MainChartdata';
import Header from './Header';

function Home({route}) {
 
  // Cia reiktu pasidaryti parametru gavima is Login page
  // jeigu negaunu jokiu paramateru o konkreciai ID
  // Tuomet mane nunaviguoja i /login
  // Jeigu gaunu, parametra issaugo pvz i const userID kintamaji
  // Ir leidzia naudoti puslapiu

  const [earnings, setEarnings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState('Vardenis');
  const [count, setCount] = useState(0);


  useEffect(() => {
    callAPI(exVar.IS_NEW_EARNING)
    // setCount(count + 1);

  }, []);

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
      });
  }

  return (
    <div className="home">
      <Header />
      <div className='main'>
        <Wallet user={user} />
        <section>
          <MainChartdata />
          <Budgets />
        </section>
        <aside>
          <Transactions user={user} />
        </aside>
      </div>
    </div>
  );
}

export default Home;