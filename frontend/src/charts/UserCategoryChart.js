// import './MainChartdata.css';
import { Bar } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
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
      text: 'Išlaidų kategorijos',
    },
  },
};




function UserCategoryChart({ userCategories, currentMonthCategorySum, categories }) {




  const uCategories = userCategories.map((cat) => cat.category);
  const labels = uCategories;

  const limits = userCategories.map((l) => l.limit);
  const [catSumsArray, SetCatSumsArray] = useState([])

  useEffect(() => {
    SetCatSumsArray(sums())
  }, [currentMonthCategorySum])

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  function sums() {
    let res = categories.map((cat, index) => {
      let catName = cat.name;
      let sum = financial(currentMonthCategorySum[index]);

      return { catName, sum }
    })

    let catArray = []
    uCategories.map((el) => {
      res.forEach((c) => {
        if (el === c.catName) {
          catArray = [...catArray, c.sum]
        }
      });
    })


    return catArray;

  }
  let sumsData = sums()
  const data = {
    labels,
    datasets: [
      {
        label: 'Limitai',
        data: limits,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Išleista suma',
        data: catSumsArray,
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

export default UserCategoryChart;