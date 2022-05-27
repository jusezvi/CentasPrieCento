import './Home.css';
import Header from './Header';
import { useEffect, useState } from 'react';
import { exVar } from './ExtendVariables';
import './AllTransaction.css';
import { useNavigate } from 'react-router-dom';
import AllTransactionItem from './AlltransactionItem';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'
import { CSVLink } from 'react-csv'


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
    fetch('http://localhost:8080/getBudget/' + read_cookie('auth_access_token'))
      .then(res => {
        return res.json();
      })
      .then(data => {
        setTransactionDate(data.data);
        setAllData(data.data);
        sum(data.data)
      });
    fetch('http://localhost:8080/getCategory/')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setCategories(data.data);
      });


  }, [isUpdated]);

  function handleTypeChange(e) {
    e.preventDefault();


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
          <div className=' item-inline'>
            <input className="alltransactions-select-input" type="date" value={maxDate} onChange={e => setMaxDate(e.target.value)} />
          </div>
        </div>
        <div className='block' style={{ "justify-content": "right", "margin": "0 15px" }}>
          {type === 'expense' ? <select className="alltransactions-select-input  select-category" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="all">Visos</option>
            {categories.map((option) => (
              <option value={option.name} key={option._id}>{option.name}</option>
            ))}
          </select>
            : null}
        </div>




        <button className='buttons2 btn-secondary' onClick={handleTypeChange}>Filtruoti</button>
        <button className='buttons2 btn-secondary' onClick={deleteChanges}>Atstatyti filtrus</button>
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

              <AllTransactionItem key={transactionBudget._id} transactionBudget={transactionBudget} index={index}
                isUpdated={isUpdated} setIsUpdated={setIsUpdated} categories={categories} />
            ))}
          </tbody>
        </table>
        {maxDate}
        <p className='filtered-sum'>Pajamos ir išlaidos pasirinktu laikotarpiu:</p>
        <p>išlaidos: {financial(expenseSum)} &euro;, pajamos: {financial(earningSum)} &euro;</p>
        <br></br>


        <CSVLink data={allData}>
          <button className='buttons2 btn-secondary '>Detali išklotinė</button>
        </CSVLink>

      </div>
    </>
  );
}

export default AllTransaction;