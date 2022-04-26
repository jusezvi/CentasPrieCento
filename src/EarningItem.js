import React, { useState } from 'react';
import './EarningItem.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { exVar } from './ExtendVariables';

function EarningItem({ earning }) {
  const [newSum, setNewSum] = useState('');
  const [newName, setNewName] = useState('');

  function handleDelete() {
    fetch('http://localhost:8000/budget/' + earning.id, {
      method: 'DELETE',
    })
      .then(res => res.json());
    exVar.IS_NEW_EARNING = true;
  }
  function handleEdit() {

  }

  return (
    <>
      {/* <div>
                <form onSubmit={handleEdit}>
                    <input type="text" required placeholder='Įveskite naują pajamų sumą' value={newSum} onChange={e => setNewSum(e.target.value)} />
                    <input type="text" required placeholder='Įveskite naują išlaidų pavadinimą' value={newName} onChange={e => setNewName(e.target.value)} />
                    <input type="submit" value="Submit" />
                </form>
            </div>      */}
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