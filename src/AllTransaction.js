import './Home.css';
import Header from './Header';
import Overall from './Overall';
import { useEffect, useState } from 'react';
import { exVar } from './ExtendVariables';
import './AllTransaction.css';
import { useTable } from 'react-router-dom';
import AllTransactionItem from './AlltransactionItem';


function AllTransaction({ cost, index }) {
  const [transactionDate, setTransactionDate] = useState([]);
  const [isUpdated, setIsUpdated]= useState(false);
  // let {id} =useParams()

  useEffect(() => {
    fetch('http://localhost:8000/budget/')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setTransactionDate(data);
        console.log(transactionDate)

      });


  }, [isUpdated]);

  
  

  return (
    <div className='tablte-container'>
      <table className='tr'>
        <thead>
          <tr>
          <th className='number'></th>
          {/* <th>&#8470;</th> */}
          <th className='transaction__icon'> </th>
          <th>Sum</th>
          <th>Category</th>
          <th>Type</th>
          <th></th>
          </tr>
        </thead>
        <tbody>
          {transactionDate.map((transactionBudget, index) => (
            <AllTransactionItem key={transactionBudget.id} transactionBudget={transactionBudget} index={index} 
            isUpdated={isUpdated} setIsUpdated={setIsUpdated}/>
           
            
          ))}
        </tbody>

      </table>
    </div>

  );
}

export default AllTransaction;