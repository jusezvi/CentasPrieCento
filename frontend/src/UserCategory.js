import './UserCategory.css';
import { BiHomeAlt } from 'react-icons/bi';
import { BiCar } from 'react-icons/bi';
import { BiFoodMenu } from 'react-icons/bi';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { FcMoneyTransfer } from 'react-icons/fc';
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import { confirmAlert } from "react-confirm-alert";
import "../node_modules/react-confirm-alert/src/react-confirm-alert.css";





const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function UserCategory({ limit, category, catSum, user, id }) {

  const [newLimit, setNewLimit] = useState(limit);
  const [error, setError] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  function reset(e) {
    e.preventDefault();
    setNewLimit('');
    setError(false)
  }

  function openModal() {
    setIsOpen(true);
  }
  function closeModal(e) {
    setIsOpen(false);
    e.preventDefault();
    setNewLimit('');
    setError(false);
  }

  function editCategory(e) {
    e.preventDefault();
    if (!isNaN(Number(newLimit)) && newLimit > 0) {
      let correctLimit = financial(newLimit);
      const editUserCategory = { limit: correctLimit };

      fetch('http://localhost:8080/updateUserCategory/' + id, {
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

  function handleDelete() {
    fetch('http://localhost:8080/delUserCategory/' + id, {
      method: 'DELETE',
    })
      .then(res => res.json());
    window.location.reload();
  }

  const submitDelete2 = () => {
    confirmAlert({

      message: "Ar tikrai norite ištrinti ?",
      buttons: [
        {
          label: "Taip",
          onClick: handleDelete,
        },
        {
          label: "Ne",
        },

      ],

    });


  };

  return (
    <>
      <div className='budget'>
        <div className='budget__top'>
          <div className='icons'>
            <div className='budget__icon'><FcMoneyTransfer /></div>
            <div className='action__items'>
              <p className='budget__icon-delete ' onClick={submitDelete2}><AiOutlineDelete /></p>
              <p className='budget__icon-edit' onClick={openModal}><AiOutlineEdit /></p>
            </div>
          </div>
          <p className='budget__name'>{category}</p>
        </div>
        <p className='budget__limit'>Limitas: {limit}</p>
        <p>Kategorijos suma: {catSum}</p>
      </div>
      <Modal

        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className='transaction-modal-content'>


          <h5 className='transaction-modal__title'>Limito redagavimas</h5>
          <form className='usercategory-modal' onSubmit={editCategory}>
            {error && (
              <p className="error">
                Įvestas gali būti tik skaičius ir didesnis už 0 (pvz.
                50.50)
              </p>
            )}
            <label>Naujas limitas:</label> <br></br>
            <input
              className='select-input5'
              type="text"
              value={newLimit}
              onChange={(e) => setNewLimit(e.target.value)}
            />
            <div className="modal-footer">
              <input type="submit" className="btn8 " value="Išsaugoti" />
              <button
                type="button"
                className="btn8 "
                data-bs-dismiss="modal"
                onClick={closeModal}
              >
                Uždaryti
              </button>
            </div>
          </form>
        </div>
      </Modal>

    </>
  );

}

export default UserCategory;