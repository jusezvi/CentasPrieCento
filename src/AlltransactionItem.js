import { exVar } from "./ExtendVariables";
// import AllTransaction from './Alltransaction';
import './AllTransaction.css';
import { GrTransaction } from 'react-icons/gr';
import { useState } from "react";

function AllTransactionItem({ transactionBudget, index, isUpdated, setIsUpdated }) {

    const [newSum, setNewSum] = useState('');
    const [newName, setNewName] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [display, setDisplay] = useState('none');
    const [newEarning, setEarning] = useState('');
    const [newExpense, setNewExpense] = useState('');
    // const [edit, setEdit] = useState([]);

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
        setNewCategory(transactionBudget.category)
    }

    function editItem(e) {
        e.preventDefault();
        // setNewExpense({ earning_sum: '', earning_name: '', expense_sum: newSum, expense_name: newName, category: newCategory });
        // setEarning({ expense_sum: '', expense_name: '', category: '', earning_sum: newSum, earning_name: newName })
        // { transactionBudget.expenseType == 'expense' ? setEdit(newExpense) : setEdit(newEarning) };

        let edit = transactionBudget.expenseType == 'expense' ? { expense_sum: newSum, expense_name: newName, category: newCategory } : { earning_sum: newSum, earning_name: newName, category: '' };

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
    }

    return (
        <>
            <div style={{ 'display': display }}>
                <form onSubmit={editItem}>
                    <input type="text" required placeholder='Įveskite naują sumą' value={newSum} onChange={e => setNewSum(e.target.value)} />
                    <input type="text" required placeholder='Įveskite naują pavadinimą' value={newName} onChange={e => setNewName(e.target.value)} />
                    {transactionBudget.expenseType == 'expense' ? <input type="text" required placeholder='Įveskite naują katogoriją' value={newCategory} onChange={e => setNewCategory(e.target.value)} /> : null}
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <tr>
                <td>{index + 1}</td>
                <td className='transaction__icon'><GrTransaction /></td>
                <td>{transactionBudget.expenseType == 'expense' ? 'Išlaidos' : 'Pajamos'}</td>
                <td>{transactionBudget.earning_sum || transactionBudget.expense_sum} Eur  </td>
                <td>{transactionBudget.earning_name || transactionBudget.expense_name}</td>
                <td><button onClick={handleEdit} className='button-transaction'>Edit</button></td>
                <td><button onClick={DeleteClick} className='button-transaction'>Delete</button></td>

            </tr>
        </>
    );

}

export default AllTransactionItem;