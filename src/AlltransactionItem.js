import './AllTransaction.css';
import './AllTransactionItem.css';
import { GrTransaction } from 'react-icons/gr';
import { FaLongArrowAltRight } from 'react-icons/fa'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { useState } from "react";
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { Alert } from 'bootstrap';
// import { Alert } from "react-native";


function AllTransactionItem({ transactionBudget, index, isUpdated, setIsUpdated }) {

    const [newSum, setNewSum] = useState('');
    const [newName, setNewName] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newDate, setNewDate] = useState('');
    const [display, setDisplay] = useState('none');
    const [error, setError] = useState(false);

    function financial(x) {
        return Number.parseFloat(x).toFixed(2);
    }






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

    function Valio(){
        alert ("sveikiname isitrine")
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
            let correctSum = financial(newSum);
            let edit = transactionBudget.type == 'expense' ? { sum: correctSum, name: newName, category: newCategory, date: newDate, type: 'expense' } : { sum: correctSum, name: newName, category: '-', date: newDate, type: 'earning' };

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
                    {transactionBudget.type == 'expense' ? <><label>Įveskite naują kategoriją:</label> <input type="text" required placeholder='Įveskite naują katogoriją:' value={newCategory} onChange={e => setNewCategory(e.target.value)} /></> : null}
                    <label>Pasirinkite datą:</label>
                    <input type="date" required value={newDate} onChange={e => setNewDate(e.target.value)} />
                    <input type="submit" value="Pateikti" />
                </form>
            </div>
            <tr>
                <td>{index + 1}</td>
                <td>{transactionBudget.type == 'expense' ? <div className="FaLongArrowAltLeft "><FaLongArrowAltLeft /> </div> : <div className="FaLongArrowAltRight"><FaLongArrowAltRight /></div>}</td>
                {/* <td className='transaction__icon'><FaLongArrowAltRight /></td> */}
                <td>{transactionBudget.type == 'expense' ? 'Išlaidos' : 'Pajamos'}</td>
                <td>{financial(transactionBudget.sum)} &euro;  </td>
                <td>{transactionBudget.name}</td>
                <td>{transactionBudget.date}</td>
                
                <td className='button-transaction-edit2 none' onClick={handleEdit} ><AiOutlineEdit /></td>
               
                <td className='button-transaction-delete2 none '>
                    <span data-bs-toggle="modal" data-bs-target="#MyModal">
                        <AiOutlineDelete />
                    </span>
                </td>
            </tr>
            
            <div className="modal fade" id="MyModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                           
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p className='success-Delete' >Ar tikrai norite ištrinti ?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button"  onClick={DeleteClick}  className="btn btn-primary buttons">Ištrinti</button>
                            <button type="button" className="btn btn-secondary buttons" data-bs-dismiss="modal">Uždaryti</button>

                        </div>
                    </div>
                </div>
            </div>

        </>
    );

}


export default AllTransactionItem;
