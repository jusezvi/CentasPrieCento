import './Home.css';
import Header from './Header';
import { useEffect, useState } from 'react';
import { exVar } from './ExtendVariables';
import './AllTransaction.css';
import { useTable } from 'react-router-dom';
import AllTransactionItem from './AlltransactionItem';


function AllTransaction() {
  const [transactionDate, setTransactionDate] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [type, setType] = useState('all');
  const [minDate, setMinDate] = useState('1990-01-01');
  const [maxDate, setMaxDate] = useState('2023-01-01');
  const [category, setCategory] = useState('all');
  const [allData, setAllData] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/budget/')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setTransactionDate(data);
        console.log(transactionDate)
        setAllData(data)
      });


  }, [isUpdated]);

  function handleTypeChange(e) {
    e.preventDefault();
    // const current = new Date();
    // const date = `${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}`;
    if (!minDate) { setMinDate('1990-01-01') }
    if (!maxDate) { setMaxDate('2023-01-01') }

    function filterByCategory(item) {
      if (category !== "all") {
        return item.category === category
      } else {
        return true;
      }
    }

    const filteredData = transactionDate.filter((item) => {
      if (
        (item.type === type && item.date <= maxDate && item.date >= minDate && filterByCategory(item))
        ||
        (type === 'all' && item.date <= maxDate && item.date >= minDate)
      ) return true
    });
    setAllData(filteredData)
  }

  return (
    <>
      <Header />
      <form>
        <label>Tipas:</label>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="all">Viso</option>
          <option value="earning">Pajamos</option>
          <option value="expense">Išlaidos</option>
        </select>
        <label>Nuo:</label>
        <input type="date" onChange={e => setMinDate(e.target.value)} />
        <label>Iki:</label>
        <input type="date" onChange={e => setMaxDate(e.target.value)} />
        {type === 'expense' ?
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="all">Visos</option>
            <option value="Home">Namai</option>
            <option value="Car">Automobilis</option>
            <option value="Other">Kita</option>
          </select>
          : null}
        <button onClick={handleTypeChange}>Filtruoti</button>
      </form>
      <div className='tablte-container'>
        <table className='tr '>
          <thead>
            <tr>
              <th className='number'></th>
              {/* <th>&#8470;</th> */}
              <th className='transaction__icon'> </th>
              <th>Išlaidos/pajamos</th>
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
                isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
            ))}
          </tbody>

        </table>
      </div>
    </>
  );
}

export default AllTransaction;