import './Header.css';
import { GoSearch } from 'react-icons/go';
import { IoMdNotificationsOutline } from 'react-icons/io';


function Header() {
    return (
        <div className="header">
            <div className="nav">
                <a href="#">Overview</a>
                <a href="#">Transactions</a>
                <a href="#">Budgets</a>
                <a href="#">Goals</a>
            </div>
            <div className="icons">
                <GoSearch className='icon'/>
                <IoMdNotificationsOutline className='icon'/>
            </div>
            <div className="user">
                <div className="user__name">
                    <h3>Vardas Pavarde</h3>
                    <p>customer</p>
                </div>
                <div className="user__icon">
                    V
                </div>
            </div>
        </div>
    )
}

export default Header;