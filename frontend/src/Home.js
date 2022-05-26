import './Home.css';
import Transactions from './Transactions';
import Wallet from './Wallet';
import Budgets from './Budgets';
import { useEffect, useState } from 'react';
import { exVar } from './ExtendVariables';
import MainChartdata from './charts/MainChartdata';
import Header from './Header';
import { navigation, Route, useLocation, Link, useNavigate } from "react-router-dom";

import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'

function Home({ route, navigation, setTest }) {

  const location = useLocation();
  const navigate = useNavigate();




  const [earnings, setEarnings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [userID, setUserID] = useState(read_cookie('auth_access_token'));
  const [count, setCount] = useState(0);




  useEffect(() => {
    if (read_cookie('auth_access_token').length === 0) {
      navigate('/login')
    }
    callAPI(exVar.IS_NEW_EARNING)

  }, []);

  function callAPI(check = false) {
    if (!check) {
      return;
    }
    exVar.IS_NEW_EARNING = false;

  }

  return (
    <div className="home">
      <Header />
      <div className='main'>
        <Wallet user={userID} />
        <section>
          <MainChartdata />
          <Budgets user={userID} transactions={transactions} />
        </section>
        <aside>
          <Transactions user={userID} />
        </aside>
      </div>
    </div>
  );
}

export default Home;