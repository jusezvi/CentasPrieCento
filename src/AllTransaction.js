import './Home.css';
import Header from './Header';
import Overall from './Overall';
import { useEffect, useState } from 'react';
import { exVar } from './ExtendVariables';
import './AllTransaction.css';
import { useTable } from 'react-router-dom';


function Testas({ cost, index }) {
  const [transactionDate, setTransactionDate] = useState([]);
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


  }, []);

  //   var index=0
  function EditClick(){
    alert ("edit")
  }
  function DeleteClick(){
    alert ("delete")
   
  }

  return (
    <div className='tablte-container'>
      <table className='tr'>
        <thead>
          <tr>
          <th className='number'></th>
          {/* <th>&#8470;</th> */}
          <th> icon</th>
          <th>Sum</th>
          <th>Category</th>
          <th>Type</th>
          <th></th>
          </tr>
        </thead>
        <tbody>
          {transactionDate.map((transactionBudget, index) => (
            <tr>
              <td>{index+1}</td>
              <td>icon</td>
              <td>{transactionBudget.earning_sum}Eur  </td>
              <td>{transactionBudget.earning_name}</td>
              <td>{transactionBudget.type}</td>
              <td><button onClick={EditClick} className='button-transaction'>Edit</button></td>
              <td><button onClick={DeleteClick}  className='button-transaction'>Delete</button></td>

            </tr>
            // <p>{transactionBudget .earning_sum} Eur - <span>{transactionBudget .earning_name}</span></p>
          ))}
        </tbody>

      </table>
    </div>

  );
}

export default Testas;