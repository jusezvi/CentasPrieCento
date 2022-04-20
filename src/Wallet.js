import './Wallet.css';
import { BiWallet } from 'react-icons/bi';


function Wallet() {
  return (
      <>
        <div className="wallet" data-bs-toggle="modal" data-bs-target="#wallet">
        <div className='wallet__top'>
            <div className='wallet__top-icon'>
                <BiWallet />
            </div>
            <p>2450 Eur</p>
        </div>
        <p>vardas pavarde</p>
        </div>

        <div class="modal fade" id="wallet" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Your Earnings</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <input type="text" placeholder='Enter new earnings' name="wallet" />
                            <input type="submit" value="Submit" />
                        </form>
                        <div className='wallet__list'>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
</>
  );
}

export default Wallet;