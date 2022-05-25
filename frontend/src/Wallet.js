import './Wallet.css';
import { BiWallet } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { exVar } from './ExtendVariables';
import EarningItem from './EarningItem';
import { read_cookie } from 'sfcookies';


function Wallet({ user }) {
    const [balance, setBalance] = useState();
    const [earnings, setEarnings] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8080/getBudget/' + read_cookie('auth_access_token'))
            .then(res => res.json())
            .then(costs => {
                setEarnings(costs.data);
                calculateSum(costs.data);
            })
    }, []);

    function financial(x) {
        return Number.parseFloat(x).toFixed(2);
    }

    function calculateSum(costs) {
        let inn = 0;
        let out = 0;

        costs.forEach((cost) => {
            if (cost.type == 'expense') {
                out += Number(cost.sum)
            } else {
                if (cost.type == 'earning') {
                    inn += Number(cost.sum)
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
                    <p>{financial(balance)} &euro;</p>
                </div>
                <p>{read_cookie('username')}</p>
            </div>

            <div className="modal fade wallet-modal" id="wallet" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Jūsų pajamos</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='wallet__list'>
                                {earnings && earnings.filter(earning => earning.type === "earning").map(filteredEarning => (
                                    <EarningItem key={filteredEarning._id} earning={filteredEarning} />
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Uždaryti</button>
                        </div>
                    </div>
                </div>f
            </div>
        </>
    );
}

export default Wallet;