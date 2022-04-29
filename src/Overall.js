import './Overall.css';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { GrTransaction } from 'react-icons/gr';
import { AiOutlineHome } from 'react-icons/ai';


function Overall({ transactions }) {
    const data = {
        labels: ['Home', 'Car', 'Food', 'Other'],
        datasets: [{
            data: [12, 5, 20, 9],
            backgroundColor: ['#5C6FE4', '#E9DEF6', '#E6E9F1', 'blue']
        }]
    }

    return (
        <div className="overall">
            <h2>Overal Spent</h2>
            <div className='overall__main'>
                <div className='overall__main-chart'>
                    <Doughnut data={data} />
                </div>
                <div className='overall__main-expense'>
                    <div className='overall__icon'>
                        <GrTransaction />
                    </div>
                    <div className='overall__sum'>
                        <h3>10000 &euro;</h3>
                    </div>
                    <div className='overall__category-transactions'>
                        <div className='category__transaction'>
                            <div className='category__transaction-icon'>
                                <AiOutlineHome />
                            </div>
                            <div className='category__transaction-info'>
                                <div className='category__transaction-price'> - 50.50 &euro;</div>
                                <div className='category__transaction-name'>Food</div>
                            </div>
                        </div>
                        <div className='category__transaction'>
                            <div className='category__transaction-icon'>
                                <AiOutlineHome />
                            </div>
                            <div className='category__transaction-info'>
                                <div className='category__transaction-price'> - 800 &euro;</div>
                                <div className='category__transaction-name'>New laptop</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overall;