import './Overall.css';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import MainChartdata from './charts/MainChartdata';


function Overall({ transactions }) {

    return (
        <div className="overall">
            <h2>Einamojo mėnesio išlaidos</h2>
            <div className='overall__main'>
                <div className='overall__main-chart'>
                    {/* <Doughnut data={data} /> */}
                    <MainChartdata transactions={transactions} />
                </div>
            </div>
        </div>
    )
}

export default Overall;