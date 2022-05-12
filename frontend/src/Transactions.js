import React, { useState, useEffect } from 'react';
import './Transactions.css';
import Transaction from './Transaction';
import { exVar } from './ExtendVariables';


function Transactions({ user }) {

    const [date, setDate] = useState('');
    const [category, setCategory] = useState('Home');
    const [error, setError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [transactions, setTransactions] = useState([]);

    const [sum, setSum] = useState('');
    const [type, setType] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {

        fetch('http://localhost:8000/budget')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setTransactions(data);
            });
    }, []);

    function financial(x) {
        return Number.parseFloat(x).toFixed(2);
    }

    const submitExpense = e => {
        e.preventDefault();
        if (!isNaN(Number(sum)) && name.length < 10 && sum > 0) {
            if (Date.parse(date) <= Date.parse(new Date())) {
                let correctSum = financial(sum);
                const newExpense = { sum: correctSum, name, category, type: "expense", date, user };

                fetch('http://localhost:8000/budget', {
                    method: 'POST',
                    headers: { 'Content-Type': "application/json" },
                    body: JSON.stringify(newExpense)
                }).then(() => {
                    exVar.IS_NEW_EARNING = true;
                });
                setSum('');
                setName('');
                setCategory('Home');
                setDate('');
                setError(false);
                window.location.reload();
            } else { setDateError(true) }
        } else {
            setError(true)
        }
    }

    const submitEarning = e => {
        e.preventDefault();
        if (!isNaN(Number(sum)) && name.length < 10 && sum > 0) {
            if (Date.parse(date) <= Date.parse(new Date())) {
                let correctSum = financial(sum);
                const newEarning = { sum: correctSum, name, category: "-", type: "earning", date, user };

                fetch('http://localhost:8000/budget', {
                    method: 'POST',
                    headers: { 'Content-Type': "application/json" },
                    body: JSON.stringify(newEarning)
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

    return (
        <>
            <h4>Visos piniginės operacijos:</h4>
            <div>
                {transactions.map(transaction => (
                    <Transaction key={transaction.id} name={transaction.name}
                        category={transaction.category} price={transaction.sum}
                        type={transaction.type} date={transaction.date} user={transaction.user}
                    />
                ))}
            </div>
            <div className='buttons'>
                <button data-bs-toggle="modal" data-bs-target="#expense">Įvesti išlaidas</button>
                <button data-bs-toggle="modal" data-bs-target="#earning">Įvesti pajamas</button>
            </div>
            <div className='expense__modal'>
                <div className="modal fade" id="expense" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Išlaidų įvedimas</h5>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={submitExpense}>
                                    {error && <p className='error'>Įvestas gali būti tik skaičius, didesnis už 0 (pvz. 50.50) ir pavadinimas mažiau nei 10 simbolių!</p>}
                                    <input type="text" required placeholder='Įveskite išlaidų sumą' value={sum} onChange={e => setSum(e.target.value)} /> <br></br>
                                    <input type="text" required placeholder='Įveskite išlaidų pavadinimą' value={name} onChange={e => setName(e.target.value)} /> <br></br>
                                    <label>Pasirinkite kategoriją:</label> <br></br>
                                    <select required value={category} onChange={e => setCategory(e.target.value)}>
                                        <option value="Namai">Namai</option>
                                        <option value="Automobilis">Automobilis</option>
                                        <option value="Kita">Kita</option>
                                    </select><br></br>
                                    <label>Pasirinkite datą:</label> <br></br>
                                    <input type="date" required value={date} onChange={e => setDate(e.target.value)} />
                                    {dateError && <p className='error'>data negali būti vėlesnė, nei šiandien</p>}
                                    <div className="modal-footer">
                                        <input type="submit" value="Išsaugoti" />
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Uždaryti</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className='earning__modal'>
                <div className="modal fade" id="earning" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Pajamų įvedimas</h5>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={submitEarning}>
                                    {error && <p className='error'>Įvestas gali būti tik skaičius, didesnis už 0 (pvz. 50.50) ir pavadinimas mažiau nei 10 simbolių!</p>}
                                    <input type="text" required placeholder='Įveskite pajamų sumą' value={sum} onChange={e => setSum(e.target.value)} /> <br></br>
                                    <input type="text" required placeholder='Įveskite pajamų pavadinimą' value={name} onChange={e => setName(e.target.value)} /> <br></br>
                                    <label>Pasirinkite datą:</label> <br></br>
                                    <input type="date" required value={date} onChange={e => setDate(e.target.value)} />
                                    {dateError && <p className='error'>data negali būti vėlesnė, nei šiandien</p>}
                                    <div className="modal-footer">
                                        <input type="submit" className="btn btn-secondary" value="Išsaugoti" />
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Uždaryti</button>
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