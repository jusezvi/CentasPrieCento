import React, { useState, useEffect } from 'react';
import './Transactions.css';
import Transaction from './Transaction';
import { exVar } from './ExtendVariables';


function Transactions({ user }) {

    const [expense_sum, setExpense_sum] = useState('');
    const [expense_name, setExpense_name] = useState('');
    const [category, setCategory] = useState('Home');
    const [expenseType, setexpenseType] = useState('expense');
    const [earning_sum, setEarning_sum] = useState('');
    const [earning_name, setEarning_name] = useState('');
    const [earningType, setEarningType] = useState('earning');
    const [error, setError] = useState(false);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {

        fetch('http://localhost:8000/budget')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setTransactions(data);
            });
    }, [])

    const submitExpense = e => {
        e.preventDefault();
        if (!isNaN(Number(expense_sum))) {
            const newExpense = { expense_sum, expense_name, category, expenseType, user };

            fetch('http://localhost:8000/budget', {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(newExpense)
            }).then(() => {
                console.log('expense added');
                exVar.IS_NEW_EARNING = true;
            });
            setExpense_sum('');
            setExpense_name('');
            setCategory('Home');
            setError(false);
            window.location.reload();
        } else {
            setError(true)
        }
    }

    const submitEarning = e => {
        e.preventDefault();
        if (!isNaN(Number(earning_sum))) {
            const newEarning = { earning_sum, earning_name, user, earningType };

            fetch('http://localhost:8000/budget', {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(newEarning)
            }).then(() => {
                console.log('earning added');
                exVar.IS_NEW_EARNING = true;
            });
            setEarning_sum('');
            setEarning_name('');
            setError(false);
            window.location.reload();
        } else {
            setError(true)
        }
    }

    return (
        <>
            <h4>Visos piniginės operacijos:</h4>
            <div>
                {transactions.map(transaction => (
                    <Transaction key={transaction.id} name={transaction.expense_name || transaction.earning_name}
                        category={transaction.category} price={transaction.expense_sum || transaction.earning_sum}
                        type={transaction.expenseType}
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
                                    {error && <p className='error'>Įvestas turi būti skaičius!</p>}
                                    <input type="text" required placeholder='Įveskite išlaidų sumą' value={expense_sum} onChange={e => setExpense_sum(e.target.value)} />
                                    <input type="text" required placeholder='Įveskite išlaidų pavadinimą' value={expense_name} onChange={e => setExpense_name(e.target.value)} />
                                    <label>Pasirinkite kategoriją:</label>
                                    <select value={category} onChange={e => setCategory(e.target.value)}>
                                        <option value="Home">Namai</option>
                                        <option value="Car">Automobilis</option>
                                        <option value="Other">Kita</option>
                                    </select>
                                    <div className="modal-footer">
                                        <input type="submit" value="Submit" />
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
                                    {error && <p className='error'>Įvestas turi skaičius!</p>}
                                    <input type="text" required placeholder='Įveskite pajamų sumą' value={earning_sum} onChange={e => setEarning_sum(e.target.value)} />
                                    <input type="text" required placeholder='Įveskite pajamų pavadinimą' value={earning_name} onChange={e => setEarning_name(e.target.value)} />
                                    <div className="modal-footer">
                                        <input type="submit" className="btn btn-secondary" value="Submit" />
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