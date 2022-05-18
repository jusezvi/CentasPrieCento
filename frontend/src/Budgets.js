import './Budgets.css';
import React, { useState, useEffect } from 'react';
import { BiHomeAlt } from 'react-icons/bi';
import { BiCar } from 'react-icons/bi';
import { BiFoodMenu } from 'react-icons/bi';
import { exVar } from './ExtendVariables';
import UserCategory from './UserCategory';


function Budgets({ user }) {

    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [limit, setLimit] = useState('');
    const [error, setError] = useState(false);
    const [userCategories, setUserCategories] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/category')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setCategories(data);
            });

        fetch('http://localhost:8000/userCategory')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setUserCategories(data);
            });
    }, []);

    function financial(x) {
        return Number.parseFloat(x).toFixed(2);
    }

    function submitCategory(e) {
        e.preventDefault();
        if (!isNaN(Number(limit)) && limit > 0) {

            let correctLimit = financial(limit);
            const newCategoryLimit = { user, limit: correctLimit, category: category };
            fetch('http://localhost:8000/userCategory', {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(newCategoryLimit)
            }).then(() => {
                exVar.IS_NEW_EARNING = true;
            });
            setLimit('');
            setCategory('');
            setError(false);
            window.location.reload();
        } else {
            setError(true)
        }
    }

    return (
        <div className="budgets">
            <h2>Piniginė</h2>
            <div className='budgets__main'>
                {userCategories.map((cat, index) => (
                    <UserCategory key={index} limit={cat.limit} category={cat.category} user={cat.user} />
                ))}
                {/* <div className='budget'>
                    <div className='budget__top'>
                        <div className='budget__icon'><BiHomeAlt /></div>
                        <div className='budget__name'>Namai</div>
                    </div>
                    <div className='budget__limit'>425 Eur</div>
                </div>
                <div className='budget'>
                    <div className='budget__top'>
                        <div className='budget__icon'><BiCar /></div>
                        <div className='budget__name'>Automobilis</div>
                    </div>
                    <div className='budget__limit'>600 Eur</div>
                </div>
                <div className='budget'>
                    <div className='budget__top'>
                        <div className='budget__icon'><BiFoodMenu /></div>
                        <div className='budget__name'>Maistas</div>
                    </div>
                    <div className='budget__limit'>230 Eur</div>
                </div>
                <div className='budget'>
                    <div className='budget__top'>
                        <div className='budget__icon'><BiCar /></div>
                        <div className='budget__name'>Automobilis</div>
                    </div>
                    <div className='budget__limit'>50 Eur</div>
                </div> */}
            </div>
            <button data-bs-toggle="modal" data-bs-target="#categories">Pridėti naują išlaidų kategoriją</button>

            <div className='insertCategory'>
                <div className="modal fade" id="categories" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content transaction-modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Išlaidų kategorijos pridėjimas</h5>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={submitCategory}>
                                    {error && <p className='error'>Įvestas gali būti tik skaičius ir didesnis už 0 (pvz. 50.50)</p>}
                                    <label>Pridėti kategoriją:</label>
                                    <select required value={category} onChange={e => setCategory(e.target.value)}>
                                        {categories.map((option, index) => (
                                            <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                    <label>Nustatyti išlaidų kategorijos limitą</label>
                                    <input type="text" value={limit} onChange={e => setLimit(e.target.value)} />
                                    <div className="modal-footer">
                                        <input type="submit" className="btn " value="Išsaugoti" />
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Uždaryti</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Budgets;