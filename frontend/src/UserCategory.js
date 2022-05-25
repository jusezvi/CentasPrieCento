import './UserCategory.css';
import { BiHomeAlt } from 'react-icons/bi';
import { BiCar } from 'react-icons/bi';
import { BiFoodMenu } from 'react-icons/bi';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { FcMoneyTransfer } from 'react-icons/fc';

function UserCategory({ limit, category, catSum, user }) {




  return (
    <>
      <div className='budget'>
        <div className='budget__top'>
          <div className='icons'>
            <div className='budget__icon'><FcMoneyTransfer /></div>
            <div className='action__items'>
              <p className='budget__icon-delete'><AiOutlineDelete /></p>
              <p className='budget__icon-edit'><AiOutlineEdit /></p>
            </div>
          </div>
          <p className='budget__name'>{category}</p>
        </div>
        <p className='budget__limit'>Limitas: {limit}</p>
        <p>Kategorijos suma: {catSum}</p>
      </div>
    </>
  );

}

export default UserCategory;