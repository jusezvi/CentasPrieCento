import './UserCategory.css';
import { BiHomeAlt } from 'react-icons/bi';
import { BiCar } from 'react-icons/bi';
import { BiFoodMenu } from 'react-icons/bi';

function UserCategory({ limit, category, user }) {

  return (
    <>
      <div className='budget'>
        <div className='budget__top'>
          <div className='budget__icon'><BiHomeAlt />

          </div>
          <div className='budget__name'>{category}</div>
        </div>
        <div className='budget__limit'>{limit}</div>
      </div>
    </>
  );

}

export default UserCategory;