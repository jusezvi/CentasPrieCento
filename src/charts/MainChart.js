import { Bar } from 'react-chartjs-2';
import React from 'react';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Pajamos ir išlaidos',
    },
  },
};
// export const data = {
//     labels,
//     datasets: [
//       {
//         label: 'Pajamos',
//         data: earnings,
//         backgroundColor: 'rgba(255, 99, 132, 0.5)',
//       },
//       {
//         label: 'Išlaidos',
//         data: expenses,
//         backgroundColor: 'rgba(52, 180, 235, 0.5)',
//       }

//     ],
//   };


function Chart({ transactions }) {
  const [earnings, setEarnings] = useState(0);
  const [expenses, setExpenses] = useState(0);


  useEffect(() => {
    allSums();
    console.log(expenses, earnings)
  }, []);

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  function allSums() {
    let inn = 0;
    let out = 0;
    transactions.forEach((transaction) => {
      if (transaction.hasOwnProperty('expenseType')) {
        out += Number(transaction.expense_sum)
      } else {
        if (transaction.hasOwnProperty('earningType')) {
          inn += Number(transaction.earning_sum)
        }
      }
    });
    setExpenses(financial(out));
    setEarnings(financial(inn));
  }

  const data = {
    datasets: [{
      label: 'Pajamos',
      data: earnings,
      backgroundColor: ['#5C6FE4']
    },
    {
      label: 'Išlaidos',
      data: expenses,
      backgroundColor: ['#E9DEF6']
    }
    ]
  }

  return (
    <div style={{ width: '300px', height: '200px' }}>
      <Bar options={options} data={data} />
      {/* {incomes.map(data => data + ",")} */}
    </div>
  );
}

export default Chart;