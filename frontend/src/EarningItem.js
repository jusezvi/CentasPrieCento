import React, { useState } from 'react';
import './EarningItem.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { exVar } from './ExtendVariables';

function EarningItem({ earning }) {
  const [newSum, setNewSum] = useState('');
  const [newName, setNewName] = useState('');
  const [date, setDate] = useState(earning.date);
  const [user, setUser] = useState(earning.user);
  const [display, setDisplay] = useState('none');
  const [error, setError] = useState(false);

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  function handleDelete() {
    fetch('http://localhost:8000/budget/' + earning.id, {
      method: 'DELETE',
    })
      .then(res => res.json());
    exVar.IS_NEW_EARNING = !exVar.IS_NEW_EARNING;
    window.location.reload();
  }
  function handleEdit() {
    setDisplay('block');
    setNewSum(earning.sum);
    setNewName(earning.name);
  }

  function editItem(e) {
    e.preventDefault();

    if (!isNaN(Number(newSum)) && newName.length < 10 && newSum > 0) {
      let correctSum = financial(newSum);
      const editEarning = { sum: correctSum, name: newName, type: "earning", category: "-", date, user };

      fetch('http://localhost:8000/budget/' + earning.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editEarning)
      })
        .then(res => res.json());

      setDisplay('none');
      setNewSum('');
      setNewName('');
      exVar.IS_NEW_EARNING = !exVar.IS_NEW_EARNING;
      window.location.reload();
    } else {
      setError(true);
      exVar.IS_NEW_EARNING = !exVar.IS_NEW_EARNING;
    }
    exVar.IS_NEW_EARNING = !exVar.IS_NEW_EARNING;
  }

  return (
    <>
      <div style={{ 'display': display }}>
        {error && <p className='error'>Įvestas turi būti skaičius, didesnis už 0 ir pavadinimas mažiau nei 10 simbolių!</p>}
        <form onSubmit={editItem}>
          <input type="text" required placeholder='Įveskite naują pajamų sumą' value={newSum} onChange={e => setNewSum(e.target.value)} />
          <input type="text" required placeholder='Įveskite naują pajamų pavadinimą' value={newName} onChange={e => setNewName(e.target.value)} />
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className='wallet__list-item'>
        <p>{financial(earning.sum)} &euro; - <span>{earning.name}</span></p>
        <div className='buttons'>
          <p className='edit' onClick={handleEdit}><AiOutlineEdit /></p>
          <p className='delete' onClick={handleDelete}><AiOutlineDelete /></p>
        </div>
      </div>
    </>
  );
}

export default EarningItem;