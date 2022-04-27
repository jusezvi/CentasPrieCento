import React, { useState } from 'react';
import './EarningItem.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { exVar } from './ExtendVariables';

function EarningItem({ earning }) {
  const [newSum, setNewSum] = useState('');
  const [newName, setNewName] = useState('');
  const [earningType, setEarningType] = useState(earning.earningType);
  const [user, setUser] = useState(earning.user);
  const [display, setDisplay] = useState('none')

  function handleDelete() {
    fetch('http://localhost:8000/budget/' + earning.id, {
      method: 'DELETE',
    })
      .then(res => res.json());
    exVar.IS_NEW_EARNING = !exVar.IS_NEW_EARNING;
  }
  function handleEdit() {
    setDisplay('block');
    setNewSum(earning.earning_sum);
    setNewName(earning.earning_name);
  }

  function editItem(e) {
    e.preventDefault();
    const editEarning = { earning_sum: newSum, earning_name: newName, earningType, user };

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
  }

  return (
    <>
      <div style={{ 'display': display }}>
        <form onSubmit={editItem}>
          <input type="text" required placeholder='Įveskite naują pajamų sumą' value={newSum} onChange={e => setNewSum(e.target.value)} />
          <input type="text" required placeholder='Įveskite naują pajamų pavadinimą' value={newName} onChange={e => setNewName(e.target.value)} />
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className='wallet__list-item'>
        <p>{earning.earning_sum} Eur - <span>{earning.earning_name}</span></p>
        <div className='buttons'>
          <p className='edit' onClick={handleEdit}><AiOutlineEdit /></p>
          <p className='delete' onClick={handleDelete}><AiOutlineDelete /></p>
        </div>
      </div>
    </>
  );
}

export default EarningItem;