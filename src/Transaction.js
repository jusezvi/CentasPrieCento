import React from 'react';
import './Transaction.css';
import { GrTransaction } from 'react-icons/gr';


function Transaction({ name, category, price, type }) {

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

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
        <p>{type == "expense" ? '-' : '+'} {financial(price)} &euro;</p>
      </div>
    </div>
  );
}

export default Transaction;