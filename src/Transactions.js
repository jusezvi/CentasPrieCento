import React, { useState } from 'react';
import Transaction from './Transaction';
import { exVar } from './ExtendVariables';


function Transactions({ transactions, user }) {

    const [expense_sum, setExpense_sum] = useState('');
    const [expense_name, setExpense_name] = useState('');
    const [category, setCategory] = useState('Home');
    const [type, setType] = useState('expense')

    const handleSubmit = e => {
        e.preventDefault();
        const newExpense = { expense_sum, expense_name, category, type, user };

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
    }

    return (
        <>
            <h4>All transactions:</h4>
            <Transaction name="New Laptop" category="Home" price="580" />
            <Transaction name="New TV" category="Home" price="900" />
            <Transaction name="Repair" category="Car" price="150" />
            <Transaction name="Fuel" category="Car" price="53.99" />
            <Transaction name="Tickets" category="Journey" price="45.50" />
            <button data-bs-toggle="modal" data-bs-target="#transactions">Add new transaction</button>

            <div className="modal fade" id="transactions" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Your Expense</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <input type="text" required placeholder='Enter new expense sum' value={expense_sum} onChange={e => setExpense_sum(e.target.value)} />
                                <input type="text" required placeholder='Enter expense name' value={expense_name} onChange={e => setExpense_name(e.target.value)} />
                                <label>Choose a Category:</label>
                                <select value={category} onChange={e => setCategory(e.target.value)}>
                                    <option value="Home">Home</option>
                                    <option value="Car">Car</option>
                                    <option value="Other">Other</option>
                                </select>
                                <input type="submit" value="Submit" />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Transactions;