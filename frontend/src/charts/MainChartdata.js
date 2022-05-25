import { useEffect, useState } from 'react';
import Chart from './Chart';
import MonthlyChart from './MonthlyChart';
import './MainChartdata.css';
import { useForm } from 'react-hook-form';
import { read_cookie } from 'sfcookies'


function MainChartdata() {
  const [monthlyEarningSum, setMonthlyEarningSum] = useState([]);
  const [monthlyExpenseSum, setMonthlyExpenseSum] = useState([]);
  // const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [earningForChart, setEarningForChart] = useState([]);
  const [expenseForChart, setExpenseForChart] = useState([]);
  let months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  let currentMonth = new Date().getMonth();
  const [transactions, setTransactions] = useState([]);
  const [monthlyIncomeForChart, setMonthlyIncomeForChart] = useState([]);
  const [monthlyOutcomeForChart, setMonthlyOutcomeForChart] = useState([]);


  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }


  function calculateSum(items) {
    let mEarnings = [];
    let mExpenses = [];

    months.forEach((month) => {
      let earningSum = 0;
      let expenseSum = 0;
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


  function sumsBymonth(items) {
    let monthlyIncome = [];
    let monthlyOutcome = [];
    months.forEach((month) => {
      let earningByMonthSum = 0;
      let expenseByMonthSum = 0;
      // let sum = 0;
      items.forEach((d) => {
        if ((new Date(d.date)).getMonth() === month && d.type === 'earning') {
          earningByMonthSum += Number(d.sum);

        } else {
          if ((new Date(d.date)).getMonth() === month && d.type === 'expense') {
            expenseByMonthSum += Number(d.sum);
          }
        }
      });

      monthlyIncome = [...monthlyIncome, earningByMonthSum];
      monthlyOutcome = [...monthlyOutcome, expenseByMonthSum];
      setMonthlyIncomeForChart(monthlyIncome);
      setMonthlyOutcomeForChart(monthlyOutcome);
    });
  }

  useEffect(() => {

    fetch('http://localhost:8080/getBudget/' + read_cookie('auth_access_token'))
      .then(res => res.json())
      .then(items => {
        setTransactions(items.data);
        calculateSum(items.data);
        sumsBymonth(items.data);
      })
  }, []);

  return (
    <div className='chart__container'>
      <h2>Pajamų ir išlaidų grafinis atvaizdavimas</h2>
      <div className='main-chart__container'>
        <div className='main-chart'>
          <Chart earningForChart={earningForChart} expenseForChart={expenseForChart} />
        </div>
        <div className='main-chart-info'>
          <p>Pajamos: {financial(monthlyEarningSum)}</p>
          <p>Išlaidos: {financial(monthlyExpenseSum)}</p>
        </div>
      </div>
      <div className='monthly-chart'>
        <MonthlyChart monthlyIncomeForChart={monthlyIncomeForChart} monthlyOutcomeForChart={monthlyOutcomeForChart} />
      </div>
    </div>
  );
}

export default MainChartdata;