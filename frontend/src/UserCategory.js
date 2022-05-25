import './UserCategory.css';
import { BiHomeAlt } from 'react-icons/bi';
import { BiCar } from 'react-icons/bi';
import { BiFoodMenu } from 'react-icons/bi';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { FcMoneyTransfer } from 'react-icons/fc';

function UserCategory({ limit, category, catSum, user, id }) {

  const [newLimit, setNewLimit] = useState('');
  const [error, setError] = useState(false);

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  function editCategory(e) {
    e.preventDefault();

    if (!isNaN(Number(newLimit)) && newLimit > 0) {
      let correctLimit = financial(newLimit);
      const editUserCategory = { limit: correctLimit, category: category, user: user };

      fetch('http://localhost:8080/updateBudget/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editUserCategory)
      })
        .then(res => res.json());
      setNewLimit('');
      window.location.reload();

    } else {
      setError(true);

    }

  }

  return (
    <>
      <div className='budget'>
        <div className='budget__top'>
          <div className='icons'>
            <div className='budget__icon'><FcMoneyTransfer /></div>
            <div className='action__items'>
              <p className='budget__icon-delete'><AiOutlineDelete /></p>
              <p className='budget__icon-edit' data-bs-toggle="modal" data-bs-target="#edit"><AiOutlineEdit /></p>
            </div>
          </div>
          <p className='budget__name'>{category}</p>
        </div>
        <p className='budget__limit'>Limitas: {limit}</p>
        <p>Kategorijos suma: {catSum}</p>
      </div>
      <div
        className="modal fade"
        id="edit"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content transaction-modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Išlaidų kategorijos limito redagavimas
              </h5>
            </div>
            <div className="modal-body">
              <form onSubmit={editCategory}>
                {error && (
                  <p className="error">
                    Įvestas gali būti tik skaičius ir didesnis už 0 (pvz.
                    50.50)
                  </p>
                )}
                <label>Koreguoti išlaidų kategorijos limitą</label>
                <input
                  type="text"
                  value={newLimit}
                  onChange={(e) => setNewLimit(e.target.value)}
                />
                <div className="modal-footer">
                  <input type="submit" className="btn " value="Išsaugoti" />
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Uždaryti
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}

export default UserCategory;