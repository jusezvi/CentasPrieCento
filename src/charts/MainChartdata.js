import { useEffect, useState } from 'react';
import Chart from './Chart';
import './MainChartdata.css';


function MainChartdata({ transactionss }) {
  const [earnings, setEarnings] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [monthlyEarning, setMonthlyEarning] = useState([]);
  const [monthlyEarningSum, setMonthlyEarningSum] = useState([]);
  const [monthlyExpenseSum, setMonthlyExpenseSum] = useState([]);
  // const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [earningForChart, setEarningForChart] = useState([]);
  const [expenseForChart, setExpenseForChart] = useState([]);
  let months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  let currentMonth = new Date().getMonth();
  const [transactions, setTransactions] = useState([]);

  //   useEffect(() => {
  // //     setEarnings(transactions.filter((transaction) => transaction.type === 'earning'));
  // //     setExpenses(transactions.filter((transaction) => transaction.type === 'expense'));
  // //     // setMonthlyEarning(earnings.filter((earning) => new Date(earning.date).getMonth === currentMonth));
  // //     earningsSum()
  // // }, [])

  useEffect(() => {
    fetch('http://localhost:8000/budget')
      .then(res => res.json())
      .then(items => {
        setTransactions(items);
        calculateSum(items);
      })
  }, []);

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }


  function calculateSum(items) {
    let mEarnings = [];
    let mExpenses = [];
    months.forEach((month) => {
      let earningSum = 0;
      let expenseSum = 0;
      // let sum = 0;
      items.forEach((d) => {
        if ((new Date(d.date)).getMonth() === currentMonth && d.type === 'earning') {
          earningSum += Number(d.sum);
        } else {
          if ((new Date(d.date)).getMonth() === currentMonth && d.type === 'expense') {
            expenseSum += Number(d.sum);
          }
        }
      });
      mEarnings = [...mEarnings, earningSum];
      mExpenses = [...mExpenses, expenseSum];
      setEarningForChart(mEarnings);
      setExpenseForChart(mExpenses);
      setMonthlyEarningSum(earningSum);
      setMonthlyExpenseSum(expenseSum);
    })
  }
  return (
    <div className='chart__container'>
      <div className='chart__container-chart'>
        <Chart earningForChart={earningForChart} expenseForChart={expenseForChart} />
      </div>
      <div className='chart__container-info'>
        <p>pajamos: {financial(monthlyEarningSum)}</p>
        <p>islaidos: {financial(monthlyExpenseSum)}</p>
      </div>
    </div>
  );
}

export default MainChartdata;