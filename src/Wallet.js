import './Wallet.css';
import { BiWallet } from 'react-icons/bi';
import { useState } from 'react';
import { exVar } from './ExtendVariables';

function Wallet({ earnings, user }) {
    const [earning_sum, setEarning_sum] = useState('');
    const [earning_name, setEarning_name] = useState('');
    const [type, setType] = useState('earning')

    const handleSubmit = e => {
        e.preventDefault();
        const newEarning = { earning_sum, earning_name, user, type };

        fetch('http://localhost:8000/budget', {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(newEarning)
        }).then(() => {
            console.log('earning added');
            exVar.IS_NEW_EARNING = true;
            // console.log(exVar.IS_NEW_CONTENT)
        });
        setEarning_sum('');
        setEarning_name('');

    }

    return (
        <>
            <div className="wallet" data-bs-toggle="modal" data-bs-target="#wallet">
                <div className='wallet__top'>
                    <div className='wallet__top-icon'>
                        <BiWallet />
                    </div>
                    <p>2450 Eur</p>
                </div>
                <p>Vardas Pavarde</p>
            </div>

            <div className="modal fade" id="wallet" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Your Earnings</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <input type="text" required placeholder='Enter new earning sum' value={earning_sum} onChange={e => setEarning_sum(e.target.value)} />
                                <input type="text" required placeholder='Enter earning name' value={earning_name} onChange={e => setEarning_name(e.target.value)} />
                                <input type="submit" value="Submit" />
                            </form>
                            <div className='wallet__list'>
                                {earnings.filter(earning => earning.type == "earning").map(filteredEarning => (
                                    <p>{filteredEarning.earning_sum} Eur - <span>{filteredEarning.earning_name}</span></p>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Wallet;