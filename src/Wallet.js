import './Wallet.css';
import { BiWallet } from 'react-icons/bi';
import { useState } from 'react';
// import { exVar } from './ExtendVariables';
import EarningItem from './EarningItem';


function Wallet({ earnings, user }) {


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
                            <h5 className="modal-title" id="exampleModalLabel">Jūsų pajamos</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='wallet__list'>
                                {earnings.filter(earning => earning.earningType === "earning").map(filteredEarning => (
                                    <EarningItem key={filteredEarning.id} earning={filteredEarning} />
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Uždaryti</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Wallet;