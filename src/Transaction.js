import React from 'react';
import './Transaction.css';
import { GrTransaction } from 'react-icons/gr';


function Transaction({ name, category, price}) {
  return (
    <div className="transaction">
        <div className='transaction__icon'>
            <GrTransaction />
        </div>
        <div className='transaction__info'>
            <p>{name}</p>
            <p>{category}</p>
        </div>
        <div className='transaction__price'>
            <p>- {price} Eur</p>
        </div>
    </div>
  );
}

export default Transaction;