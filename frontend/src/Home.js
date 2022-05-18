import './Home.css';
import Transactions from './Transactions';
import Wallet from './Wallet';
import Budgets from './Budgets';
import { useEffect, useState } from 'react';
import { exVar } from './ExtendVariables';
import MainChartdata from './charts/MainChartdata';
import Header from './Header';
import { navigation, Route, useLocation, Link, useNavigate } from "react-router-dom";
// import CheckAuth from './external/CheckAuth';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'

function Home({ route, navigation, setTest }) {

  const location = useLocation();
  const navigate = useNavigate();


  // Cia reiktu pasidaryti parametru gavima is Login page
  // jeigu negaunu jokiu paramateru o konkreciai ID
  // Tuomet mane nunaviguoja i /login
  // Jeigu gaunu, parametra issaugo pvz i const userID kintamaji
  // Ir leidzia naudoti puslapiu

  const [earnings, setEarnings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [userID, setUseID] = useState(read_cookie('auth_access_token'));
  const [count, setCount] = useState(0);




  useEffect(() => {
    if (read_cookie('auth_access_token').length === 0) {
      navigate('/login')
    }
    console.log(read_cookie('auth_access_token'))
    // CheckAuth(location.state);
    callAPI(exVar.IS_NEW_EARNING)
    // setCount(count + 1);
    console.log(location.state);
    // if (location.state === null) {
    //   navigate("/login");
    // }

    // setUser(location.state)
  }, []);

  function callAPI(check = false) {
    if (!check) {
      return;
    }
    exVar.IS_NEW_EARNING = false;
    // fetch('http://localhost:8000/budget')
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(data => {
    //     setTransactions(data);
    //     setEarnings(data);
    //   });
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