import './Budgets.css';
import { BiHomeAlt } from 'react-icons/bi';
import { BiCar } from 'react-icons/bi';
import { BiFoodMenu } from 'react-icons/bi';


function Budgets() {

    return (
        <div className="budgets">
            <h2>Budgets</h2>
            <div className='budgets__main'>
                <div className='budget'>
                    <div className='budget__top'>
                        <div className='budget__icon'><BiHomeAlt /></div>
                        <div className='budget__name'>Home</div>
                    </div>
                    <div className='budget__limit'>425 Eur</div>
                </div>
                <div className='budget'>
                    <div className='budget__top'>
                        <div className='budget__icon'><BiCar /></div>
                        <div className='budget__name'>Car</div>
                    </div>
                    <div className='budget__limit'>600 Eur</div>
                </div>
                <div className='budget'>
                    <div className='budget__top'>
                        <div className='budget__icon'><BiFoodMenu /></div>
                        <div className='budget__name'>Food</div>
                    </div>
                    <div className='budget__limit'>230 Eur</div>
                </div>
                <div className='budget'>
                    <div className='budget__top'>
                        <div className='budget__icon'><BiCar /></div>
                        <div className='budget__name'>Car</div>
                    </div>
                    <div className='budget__limit'>50 Eur</div>
                </div>
            </div>
            <button>Add new budget</button>
        </div>
    )
}

export default Budgets;