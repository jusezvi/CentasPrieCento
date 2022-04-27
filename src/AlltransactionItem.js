import { exVar } from "./ExtendVariables";
// import AllTransaction from './Alltransaction';

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
            <td>icon</td>
            <td>{transactionBudget.earning_sum}Eur  </td>
            <td>{transactionBudget.earning_name}</td>
            <td>{transactionBudget.type}</td>
            <td><button onClick={EditClick} className='button-transaction'>Edit</button></td>
            <td><button onClick={DeleteClick} className='button-transaction'>Delete</button></td>

        </tr>
    );

}

export default AllTransactionItem;