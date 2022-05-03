import './AllTransaction.css';
import './AllTransactionItem.css';
import { GrTransaction } from 'react-icons/gr';
import {FaLongArrowAltRight} from 'react-icons/fa'
import {FaLongArrowAltLeft } from 'react-icons/fa'
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
        setNewSum(transactionBudget.sum);
        setNewName(transactionBudget.name);
        setNewCategory(transactionBudget.category);
        setNewDate(transactionBudget.date);
    }

    function editItem(e) {
        e.preventDefault();
        if (!isNaN(Number(newSum)) && newName.length < 10 && newSum > 0) {
            let edit = transactionBudget.type == 'expense' ? { sum: newSum, name: newName, category: newCategory, date: newDate, type: 'expense' } : { sum: newSum, name: newName, category: '-', date: newDate, type: 'earning' };

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
                {error && <p className='error'>Įvestas turi būti skaičius, didesnis už 0 ir pavadinimas mažiau nei 10 simbolių!</p>}
                <form onSubmit={editItem}>
                    <label>Įveskite naują sumą:</label>
                    <input type="text" required placeholder='Įveskite naują sumą-' value={newSum} onChange={e => setNewSum(e.target.value)} />
                    <label>Įveskite naują sumą:</label>
                    <input type="text" required placeholder='Įveskite naują pajamų pavadinimą' value={newName} onChange={e => setNewName(e.target.value)} />
                    {transactionBudget.expenseType == 'expense' ? <><label>Įveskite naują katogoriją:</label> <input type="text" required placeholder='Įveskite naują katogoriją:' value={newCategory} onChange={e => setNewCategory(e.target.value)}  /></> : null}
                    <label>Pasirinkite datą:</label>
                    <input type="date" required value={newDate} onChange={e => setNewDate(e.target.value)} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <tr>
                <td>{index + 1}</td>
                <td>{transactionBudget.expenseType == 'expense' ? <div className="FaLongArrowAltLeft "><FaLongArrowAltLeft /> </div>: <div className="FaLongArrowAltRight"><FaLongArrowAltRight /></div>}</td>
                {/* <td className='transaction__icon'><FaLongArrowAltRight /></td> */}
                <td>{transactionBudget.expenseType == 'expense' ? 'Išlaidos' : 'Pajamos'}</td>
                <td>{transactionBudget.earning_sum || transactionBudget.expense_sum} Eur  </td>
                <td>{transactionBudget.earning_name || transactionBudget.expense_name}</td>
                <td>{transactionBudget.date}</td>
                {/* <td><button onClick={handleEdit} className='button-transaction-edit'>Edit</button></td> */}
                <td className='button-transaction-edit2 none' onClick={handleEdit} ><AiOutlineEdit /></td>
                {/* <td><button onClick={DeleteClick} className='button-transaction-delete'>Delete</button></td> */}
                <td className='button-transaction-delete2 none'onClick={DeleteClick}><AiOutlineDelete /></td>

            </tr>
        </>
    );

}

export default AllTransactionItem;