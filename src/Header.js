import './Header.css';
import { GoSearch } from 'react-icons/go';
import { IoMdNotificationsOutline } from 'react-icons/io';
import AllTransaction from './AllTransaction';
import { Link} from 'react-router-dom';



function Header() {
    return (
        <div className="header">
            <div className="nav">
                <ul>
                    <li> <Link to="/Home" className='text-link'>Home</Link></li>
                    <li><Link to="/Testas" className='text-link'>Transaction</Link></li>
                </ul>
        
               
            </div>
            <div className="icons">
                <GoSearch className='icon' />
                <IoMdNotificationsOutline className='icon' />
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