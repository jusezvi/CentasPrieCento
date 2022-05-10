import React from 'react';
import './Transaction.css';
import { GrTransaction } from 'react-icons/gr';
import { FaLongArrowAltRight } from 'react-icons/fa'
import { FaLongArrowAltLeft } from 'react-icons/fa'


function Transaction({ name, category, price, type }) {

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  return (
    <div className="transaction">
      <div className='transaction__icon'>
        {type == 'expense' ? <div className="FaLongArrowAltLeft "><FaLongArrowAltLeft /> </div> : <div className="FaLongArrowAltRight"><FaLongArrowAltRight /></div>}
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