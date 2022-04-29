import { exVar } from "./ExtendVariables";
// import AllTransaction from './Alltransaction';
import './AllTransaction.css';
import { GrTransaction } from 'react-icons/gr';
import { useState } from "react";
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';


function AllTransactionItem({ transactionBudget, index, isUpdated, setIsUpdated }) {

    const [newSum, setNewSum] = useState('');
    const [newName, setNewName] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newDate, setNewDate] = useState('');
    const [display, setDisplay] = useState('none');
    const [error, setError] = useState(false);

    function DeleteClick() {
        fetch('http://localhost:8000/budget/' + transactionBudget.id, {
            method: 'DELETE',

        })
            .then(res => res.json()
            )
            .then(() => {
                setIsUpdated(!isUpdated)
            });


    }

    function handleEdit() {
        setDisplay('block');
        setNewSum(transactionBudget.earning_sum || transactionBudget.expense_sum);
        setNewName(transactionBudget.earning_name || transactionBudget.expense_name);
        setNewCategory(transactionBudget.category);
        setNewDate(transactionBudget.date);
    }

    function editItem(e) {
        e.preventDefault();
        if (!isNaN(Number(newSum)) && newName.length < 10) {
            let edit = transactionBudget.expenseType == 'expense' ? { expense_sum: newSum, expense_name: newName, category: newCategory, date: newDate, expenseType: 'expense' } : { earning_sum: newSum, earning_name: newName, category: '', date: newDate, earningType: 'earning' };

            fetch('http://localhost:8000/budget/' + transactionBudget.id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(edit)
            })
                .then(res => res.json());

            setDisplay('none');
            setNewSum('');
            setNewName('');
            setNewCategory('');
            window.location.reload();
        } else {
            setError(true);
        }
    }

    return (
        <>
            <div style={{ 'display': display }}>
                {error && <p className='error'>Įvestas turi būti skaičius ir pavadinimas mažiau nei 10 simbolių!</p>}
                <form onSubmit={editItem}>
                    <input type="text" required placeholder='Įveskite naują sumą' value={newSum} onChange={e => setNewSum(e.target.value)} />
                    <input type="text" required placeholder='Įveskite naują pavadinimą' value={newName} onChange={e => setNewName(e.target.value)} />
                    {transactionBudget.expenseType == 'expense' ? <input type="text" required placeholder='Įveskite naują katogoriją' value={newCategory} onChange={e => setNewCategory(e.target.value)} /> : null};
                    <label>Pasirinkite datą:</label>
                    <input type="date" required value={newDate} onChange={e => setNewDate(e.target.value)} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <tr>
                <td>{index + 1}</td>
                <td className='transaction__icon'><GrTransaction /></td>
                <td>{transactionBudget.expenseType == 'expense' ? 'Išlaidos' : 'Pajamos'}</td>
                <td>{transactionBudget.earning_sum || transactionBudget.expense_sum} Eur  </td>
                <td>{transactionBudget.earning_name || transactionBudget.expense_name}</td>
                <td>{transactionBudget.date}</td>
                <td><button onClick={handleEdit} className='button-transaction-edit'>Edit</button></td>
                <td className='button-transaction-edit2 none' onClick={handleEdit} ><AiOutlineEdit /></td>
                <td><button onClick={DeleteClick} className='button-transaction-delete'>Delete</button></td>
                <td className='button-transaction-delete2 none'onClick={DeleteClick}><AiOutlineDelete /></td>

            </tr>
        </>
    );

}

export default AllTransactionItem;