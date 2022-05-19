import './Home.css';
import Header from './Header';
import { useEffect, useState } from 'react';
import { exVar } from './ExtendVariables';
import './AllTransaction.css';
import { useNavigate } from 'react-router-dom';
import AllTransactionItem from './AlltransactionItem';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'


function AllTransaction() {
  const [transactionDate, setTransactionDate] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [type, setType] = useState('all');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [category, setCategory] = useState('all');
  const [allData, setAllData] = useState([]);
  const [expenseSum, setExpenseSum] = useState('');
  const [earningSum, setEarningSum] = useState('');
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    if (read_cookie('auth_access_token').length === 0) {
      navigate('/login')
    }
    fetch('http://localhost:8000/budget/')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setTransactionDate(data);
        setAllData(data);
        sum(data)
      });
    fetch('http://localhost:8000/category')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setCategories(data);
      });


  }, [isUpdated]);

  function handleTypeChange(e) {
    e.preventDefault();
    // const current = new Date();
    // const date = `${current.getFullYear()}-0${current.getMonth() + 1}-01`;
    // if (!minDate) { setMinDate('1990-01-01') }
    // if (!maxDate) { setMaxDate('2023-01-01') }

    function filterByCategory(item) {
      if (category !== "all") {
        return item.category === category
      } else {
        return true;
      }
    }

    const filteredData = transactionDate.filter((item) => {
      if (
        (item.type === type && item.date <= (maxDate ? maxDate : '2023-01-01') && item.date >= (minDate ? minDate : '1990-01-01') && filterByCategory(item))
        ||
        (type === 'all' && item.date <= (maxDate ? maxDate : '2023-01-01') && item.date >= (minDate ? minDate : '1990-01-01'))
      ) return true
    });
    setAllData(filteredData);
    sum(filteredData)
  }

  function deleteChanges(e) {
    e.preventDefault();
    setMinDate('');
    setMaxDate('');
    setType('all');
    setCategory('all');
    setAllData(transactionDate);
    sum(transactionDate)
  }

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  function sum(data) {
    let inSum = 0;
    let outSum = 0;
    data.forEach(item => {
      if (item.type === 'earning') {
        inSum += Number(item.sum)
      } else if (item.type === 'expense') {
        outSum += Number(item.sum)
      }
    });
    setEarningSum(inSum);
    setExpenseSum(outSum);
  }

  return (
    <>
      <Header />
      <form>

        <div className='block'>
          <div className='div-label item-inline' >
            <label className='alltransaction-label'>Tipas:</label>
          </div>
          <div className='item-inline' >
            <select className="alltransactions-select-input" value={type} onChange={e => setType(e.target.value)}>
              <option value="all">Viso</option>
              <option value="earning">Pajamos</option>
              <option value="expense">Išlaidos</option>
            </select>
          </div>
        </div>

        <div className='block'>
          <div className='div-label item-inline'>
            <label className='alltransaction-label'>Nuo:</label>
          </div>
          <div className='item-inline'>
            <input className="alltransactions-select-input" type="date" value={minDate} onChange={e => setMinDate(e.target.value)} />
          </div>
        </div>

        <div className='block'>
          <div className='div-label item-inline'>
            <label className='alltransaction-label'>Iki:</label>
          </div>
          <div className='item-inline' >
            <input className="alltransactions-select-input" type="date" value={maxDate} onChange={e => setMaxDate(e.target.value)} />
            {type === 'expense' ?
              <select value={category} onChange={e => setCategory(e.target.value)}>
                <option value="all">Visos</option>
                <option value="Namai">Namai</option>
                <option value="Automobilis">Automobilis</option>
                <option value="Kita">Kita</option>
              </select>
              : null}
          </div>



        </div>

        <button onClick={handleTypeChange}>Filtruoti</button>
        <button onClick={deleteChanges}>Atstatyti filtrus</button>
      </form>
      <div className='tablte-container'>
        <table className='tr '>
          <thead>
            <tr>
              <th className='number'></th>
              <th className='transaction__icon'> </th>
              <th>Išlaidos/Pajamos</th>
              <th>Suma</th>
              <th>Pavadinimas</th>
              <th>Kategorija</th>
              <th>Data</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allData.map((transactionBudget, index) => (
              <AllTransactionItem key={transactionBudget.id} transactionBudget={transactionBudget} index={index}
                isUpdated={isUpdated} setIsUpdated={setIsUpdated} categories={categories} />
            ))}
          </tbody>
        </table>
        <p className='filtered-sum'>Pajamos ir išlaidos pasirinktu laikotarpiu:</p>
        <p>išlaidos: {financial(expenseSum)} &euro;, pajamos: {financial(earningSum)} &euro;</p>
      </div>
    </>
  );
}

export default AllTransaction;