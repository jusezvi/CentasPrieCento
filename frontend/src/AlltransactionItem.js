import './AllTransaction.css';
import './AllTransactionItem.css';

import { FaLongArrowAltRight } from 'react-icons/fa'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { useState } from "react";
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { confirmAlert } from "react-confirm-alert";
import "../node_modules/react-confirm-alert/src/react-confirm-alert.css";



function AllTransactionItem({ transactionBudget, index, isUpdated, setIsUpdated, categories }) {

    const [newSum, setNewSum] = useState('');
    const [newName, setNewName] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newDate, setNewDate] = useState('');
    const [display, setDisplay] = useState('none');
    const [error, setError] = useState(false);
    const [dateError, setDateError] = useState(false);

    function financial(x) {
        return Number.parseFloat(x).toFixed(2);
    }

    function DeleteClick() {
        fetch('http://localhost:8080/delBudget/' + transactionBudget._id, {
            method: 'DELETE',

        })
            .then(res => res.json()
            );
        setIsUpdated(!isUpdated)

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
            if (Date.parse(newDate) <= Date.parse(new Date())) {
                let correctSum = financial(newSum);
                let edit = transactionBudget.type == 'expense' ? { sum: correctSum, name: newName, category: newCategory, date: newDate, type: 'expense' } : { sum: correctSum, name: newName, category: '-', date: newDate, type: 'earning' };

                fetch('http://localhost:8080/updateBudget/' + transactionBudget._id, {
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
            } else { setDateError(true) }
        } else {
            setError(true);
        }
    }

    function reset(e) {
        e.preventDefault();
        setDisplay('none');
        setDateError(false);
        setError(false)
    }

    const submitDelete = () => {
        confirmAlert({

            message: "Ar tikrai norite ištrinti ?",
            buttons: [
                {
                    label: "Taip",
                    onClick: DeleteClick,
                },
                {
                    label: "Ne",
                },

            ],

        });


    };

    return (
        <>
            <div style={{ 'display': display }}>
                {error && <p className='error'>Įvestas gali būti tik skaičius, didesnis už 0 (pvz. 50.50) ir pavadinimas mažiau nei 10 simbolių!</p>}
                <form onSubmit={editItem}>
                    <div className='block2'>
                        <label>Redagavimas:</label>
                    </div>

                    <div className='block2'>
                    <input className='alltransactions-select-input' type="text" required            placeholder='Įveskite naują sumą' value={newSum} onChange={e => setNewSum(e.        target.value)} /> 

                    </div>
                   
                   
                    <div className='block2'>
                    <input className='alltransactions-select-input' type="text" required placeholder='Įveskite naują pajamų pavadinimą' value={newName} onChange={e => setNewName(e.target.value)} />

                    </div>
                     <div className='block2'>
                     {transactionBudget.type == 'expense' ? <><select className='alltransactions-select-input' required value={newCategory} onChange={e => setNewCategory(e.target.value)}>
                        {categories.map((option) => (
                            
                            <option key={option._id} value={option.name}>{option.name}</option>
                        ))}
                    </select></>
                        : null}

                     </div>
                    
                   
                    <div className=' block2'>
                    <input className='alltransactions-select-input' type="date" required value={newDate.slice(0, 10)} onChange={e => setNewDate(e.target.value)} /><br></br>
                    {dateError && <p className='error'>data negali būti vėlesnė, nei šiandien</p>}

                    </div>
                     
                  
                    <div className='block2'>
                    <button className='btn3' type="submit">Išsaugoti</button>
                    <button  onClick={reset}>Atšaukti</button>

                    </div>
                    
                </form>
            </div>
            <tr>
                <td>{index + 1}</td>
                <td>{transactionBudget.type == 'expense' ? <div className="FaLongArrowAltLeft "><FaLongArrowAltLeft /> </div> : <div className="FaLongArrowAltRight"><FaLongArrowAltRight /></div>}</td>
               
                <td>{transactionBudget.type == 'expense' ? 'Išlaidos' : 'Pajamos'}</td>
                <td>{financial(transactionBudget.sum)} &euro;  </td>
                <td>{transactionBudget.name}</td>
                <td>{transactionBudget.category}</td>
                <td>{transactionBudget.date.slice(0, 10)}</td>
               
                <td className='button-transaction-edit2 none' onClick={handleEdit} ><AiOutlineEdit /></td>
               
                <td className='button-transaction-delete2 none '>
                    <span onClick={submitDelete}>
                        <AiOutlineDelete />
                    </span>
                </td>
            </tr>


        </>
    );
    window.location.reload();

}

export default AllTransactionItem;