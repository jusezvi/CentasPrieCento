import './Home.css';
import Header from './Header';
import { useEffect, useState } from 'react';
import { exVar } from './ExtendVariables';
import './AllTransaction.css';
import { useNavigate } from 'react-router-dom';
import AllTransactionItem from './AlltransactionItem';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { CSVLink } from 'react-csv';
import Transactions from './Transactions';



function AllTransaction() {

  const user = read_cookie('auth_access_token');
  const [transactionDate, setTransactionDate] = useState([]);
  const [type, setType] = useState('all');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [category, setCategory] = useState('all');
  const [allData, setAllData] = useState([]);
  const [expenseSum, setExpenseSum] = useState('');
  const [earningSum, setEarningSum] = useState('');
  const [categories, setCategories] = useState([]);
  const [date, setDate] = useState('');
  const [error, setError] = useState(false);
  const [dateError, setDateError] = useState(false);



  const [pavadinimas, setPavadinimas] = useState('');

  const [kodas, setKodas] = useState('');
  const [adresas, setAdresas] = useState('');

  const navigate = useNavigate();
  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  const loadData = () => {
    fetch('http://localhost:8080/getBudget/' + read_cookie('auth_access_token'))
    .then(res => {
      return res.json();
    })
    .then(data => {
      setTransactionDate(data.data);
      setAllData(data.data);
      pavadinimas(data.data)
    });
  fetch('http://localhost:8080/getCategory/')
    .then(res => {
      return res.json();
    })
    .then(data => {
      setCategories(data.data);
    });
  }


  useEffect(() => {
    if (read_cookie('auth_access_token').length === 0) {
      navigate('/login')
    }
    loadData()
   


  }, []);

  const submitEarning = e => {
    e.preventDefault();
    
        // let correctSum = financial(sum);
        const newEarning = { pavadinimas, kodas, adresas, type: "earning", date, user, test:1 };


        fetch('http://localhost:8080/insertBudget/' + JSON.stringify(newEarning), {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': "application/json" },
        }).then(() => {
          setPavadinimas('');
          setKodas('');
          setError(false);
          // window.location.reload();
          loadData()
          // exVar.IS_NEW_EARNING = true;
        });

    
  }


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
  pavadinimas(filteredData)
  }

  function deleteChanges(e) {
    e.preventDefault();
    setMinDate('');
    setMaxDate('');
    setType('all');
    setCategory('all');
    setAllData(transactionDate);
    pavadinimas(transactionDate)
  }
  function reset(e) {
    e.preventDefault();
    setPavadinimas('');
    setAdresas('');
    setDate('');
    setKodas('');

  }

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
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
                 categories={categories} loadData={loadData}/>
            ))}
          </tbody>
        </table>
        {/* {maxDate} */}
        {/* <p className='filtered-sum'>Pajamos ir išlaidos pasirinktu laikotarpiu:</p>
        <p>išlaidos: {financial(expenseSum)} &euro;, pajamos: {financial(earningSum)} &euro;</p>
        <br></br> */}



        <CSVLink data={allData}>
          <button className='buttons2 btn-secondary '>Detali išklotinė</button>
        </CSVLink>
        <form onSubmit={submitEarning}>
          {error && <p className='error'>Įvestas gali būti tik skaičius, didesnis už 0 (pvz. 50.50) ir pavadinimas mažiau nei 10 simbolių!</p>}
          <input className='transactions-select-input' type="text" required placeholder='Įveskite pavadinimą' value={pavadinimas} onChange={e => setPavadinimas(e.target.value)} /> <br></br>
          <input className='transactions-select-input' type="text" required placeholder='Įveskite kodą' value={kodas} onChange={e => setKodas(e.target.value)} /> <br></br>
          <input className='transactions-select-input' type="text" required placeholder='Įveskite adres1' value={adresas} onChange={e => setAdresas(e.target.value)} /> <br></br>
          <label>Pasirinkite datą:</label> <br></br>
          <input className='transactions-select-input' type="date" required value={date} onChange={e => setDate(e.target.value)} />
          {dateError && <p className='error'>data negali būti vėlesnė, nei šiandien</p>}
          <div className="modal-footer">
            <input type="submit" className="btn btn-secondary" value="Išsaugoti" />
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={reset}>Uždaryti</button>
          </div>
        </form>







      </div>
    </>
  );
}

export default AllTransaction;