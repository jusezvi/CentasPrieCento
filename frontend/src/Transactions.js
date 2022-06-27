import React, { useState, useEffect } from 'react';
import './Transactions.css';
import Transaction from './Transaction';
import { exVar } from './ExtendVariables';
import { read_cookie } from 'sfcookies';


function Transactions({ user }) {
    console.log({user})

    const [date, setDate] = useState('');
    const [error, setError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([])

    const [sum, setSum] = useState('');
  
    const [name, setName] = useState('');

    useEffect(() => {

        fetch('http://localhost:8080/getBudget/' + read_cookie('auth_access_token'), {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => setTransactions(data.data));



        fetch('http://localhost:8080/getCategory/', {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json());


    }, []);

    function financial(x) {
        return Number.parseFloat(x).toFixed(2);
    }

    

    const submitEarning = e => {
        e.preventDefault();
        if (!isNaN(Number(sum)) && name.length < 10 && sum > 0) {
            if (Date.parse(date) <= Date.parse(new Date())) {
                let correctSum = financial(sum);
                const newEarning = { sum: correctSum, name, category: "-", type: "earning", date, user };
               

                fetch('http://localhost:8080/insertBudget/' + JSON.stringify(newEarning), {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'Content-Type': "application/json" },
                }).then(() => {
                    exVar.IS_NEW_EARNING = true;
                });
                setSum('');
                setName('');
                setError(false);
                window.location.reload();
            } else { setDateError(true) }
        } else {
            setError(true)
        }
    }

    function reset(e) {
        e.preventDefault();
        setSum('');
        setDate('');
        setName('');
       
    }

    return (
        <>
            {/* <h4>Paskutinės piniginės operacijos:</h4>
            <div>
                {transactions.slice(Math.max(transactions.length - 5, 0)).map(transaction => (
                    <Transaction key={transaction._id} name={transaction.name}
                        category={transaction.category} price={transaction.sum}
                        type={transaction.type} date={transaction.date} user={transaction.user}
                    />
                ))}
            </div> */}
            <div className='buttons'>
               
                <button className='btn btn-secondary' data-bs-toggle="modal" data-bs-target="#earning">Įvesti pajamas</button>
            </div>
           
            <div className='earning__modal'>
                <div className="modal fade" id="earning" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-add-costs">
                        <div className="modal-content transaction-modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Pajamų įvedimas</h5>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={submitEarning}>
                                    {error && <p className='error'>Įvestas gali būti tik skaičius, didesnis už 0 (pvz. 50.50) ir pavadinimas mažiau nei 10 simbolių!</p>}
                                    <input className='transactions-select-input' type="text" required placeholder='Įveskite pajamų sumą2' value={sum} onChange={e => setSum(e.target.value)} /> <br></br>
                                    <input className='transactions-select-input' type="text" required placeholder='Įveskite pajamų pavadinimą' value={name} onChange={e => setName(e.target.value)} /> <br></br>
                                    <label>Pasirinkite datą:</label> <br></br>
                                    <input className='transactions-select-input' type="date" required value={date} onChange={e => setDate(e.target.value)} />
                                    {dateError && <p className='error'>data negali būti vėlesnė, nei šiandien</p>}
                                    <div className="modal-footer">
                                        <input type="submit" className="btn btn-secondary" value="Išsaugoti" />
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={reset}>Uždaryti</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Transactions;