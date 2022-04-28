import { exVar } from "./ExtendVariables";
// import AllTransaction from './Alltransaction';
import './AllTransaction.css';
import { GrTransaction } from 'react-icons/gr';

function AllTransactionItem({ transactionBudget, index, isUpdated, setIsUpdated }) {
    function DeleteClick() {
        fetch('http://localhost:8000/budget/' + transactionBudget.id, {
            method: 'DELETE',

        })
            .then(res => res.json()
           )
            .then(() =>{
                setIsUpdated(!isUpdated)
            });


    }

    function EditClick() {
        alert("edit")
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td className='transaction__icon'><GrTransaction /></td>
            <td>{transactionBudget.earning_sum}Eur  </td>
            <td>{transactionBudget.earning_name||transactionBudget.expense_name}</td>
            <td>{transactionBudget.expenseType||transactionBudget.expense_sum}</td>
            <td><button onClick={EditClick} className='button-transaction'>Edit</button></td>
            <td><button onClick={DeleteClick} className='button-transaction'>Delete</button></td>

        </tr>
    );

}

export default AllTransactionItem;