import './Wallet.css';
import { BiWallet } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { exVar } from './ExtendVariables';
import EarningItem from './EarningItem';


function Wallet({ user }) {
    const [balance, setBalance] = useState();
    const [earnings, setEarnings] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8000/budget')
            .then(res => res.json())
            .then(costs => {
                setEarnings(costs);
                calculateSum(costs);
            })
    }, []);

    function financial(x) {
        return Number.parseFloat(x).toFixed(2);
    }

    function calculateSum(costs) {
        let inn = 0;
        let out = 0;

        costs.forEach((cost) => {
            if (cost.hasOwnProperty('expenseType')) {
                out += Number(cost.expense_sum)
            } else {
                if (cost.hasOwnProperty('earningType')) {
                    inn += Number(cost.earning_sum)
                }
            }

        })
        setBalance(Number(inn - out));
    }

    return (
        <>
            <div className="wallet" data-bs-toggle="modal" data-bs-target="#wallet">
                <div className='wallet__top'>
                    <div className='wallet__top-icon'>
                        <BiWallet />
                    </div>
                    <p>{balance}</p>
                </div>
                <p>Vardas Pavarde</p>
            </div>

            <div className="modal fade" id="wallet" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Jūsų pajamos</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='wallet__list'>
                                {earnings && earnings.filter(earning => earning.earningType === "earning").map(filteredEarning => (
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