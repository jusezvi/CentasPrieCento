// import './MainChartdata.css';
import { Bar } from 'react-chartjs-2';
import React from 'react';
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
      text: 'Pajamos ir išlaidos per mėnesį',
    },
  },
};

const months = ['Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis'];
const labels = months.filter((month, index) => index <= (new Date()).getMonth());

function MonthlyChart({ monthlyIncomeForChart, monthlyOutcomeForChart }) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Pajamos',
        data: monthlyIncomeForChart,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Išlaidos',
        data: monthlyOutcomeForChart,
        backgroundColor: 'rgba(52, 180, 235, 0.5)',
      }

    ],
  };
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
}

export default MonthlyChart;