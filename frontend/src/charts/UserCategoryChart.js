// import './MainChartdata.css';
import { Line, Bar } from 'react-chartjs-2';
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
      text: 'Pajamos ir išlaidos per einamąjį mėnesį',
    },
  },
};



// const labels=months.filter((month, index)=>index<=(new Date()).getMonth());
// const labels = months.filter((month, index) => index == (new Date()).getMonth());



function UserCategoryChart({ userCategories, currentMonthCategorySum, categories }) {




  const uCategories = userCategories.map((cat) => cat.category);
  const labels = uCategories;

  const limits = userCategories.map((l) => l.limit);
  const [catSumsArray, SetCatSumsArray] = useState([])

  useEffect(() => {
    SetCatSumsArray(sums())
  }, [currentMonthCategorySum])

  function sums() {
    let res = categories.map((cat, index) => {
      let catName = cat.name;
      let sum = currentMonthCategorySum[index];
      // console.log(catName, sum)
      return { catName, sum }
    })
    // console.log(res);
    let catArray = []
    res.map((el) => {
      uCategories.forEach(c => {
        if (el.catName === c) {
          console.log(typeof el.sum)
          catArray = [...catArray, el.sum]
        }
      });

    })
    // SetCatSumsArray(catArray)
    // console.log(catArray)
    // console.log(categories, currentMonthCategorySum)

    return catArray;

  }
  let sumsData = sums()
  console.log(sumsData)
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
  // sums()
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
}

export default UserCategoryChart;