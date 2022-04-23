import Header from './Header';
import './AllTransaction.css';
function AllTransaction() {
  return (

    // <div className="allTransaction">
    //     <Header /> 

    // </div>
    <div className='table'>

    
    <center>
      


        <table className='tableTransacation' striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Date </th>
              <th>Name???</th>
              <th>Category</th>
              <th>Suma</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>icon</td>
              <td>2022-04-04</td>
              <td>cleaning</td>
              <td>Home</td>
              <td>12.5$</td>
              <td><button>Delete</button></td>
              <td><button>Edit</button></td>
            </tr>
            <tr>
              <td>icon</td>
              <td>2022-05-12</td>
              <td>tires</td>
              <td>car</td>
              <td>0.12$</td>
              <td><button>Delete</button></td>
              <td><button>Edit</button></td>
            </tr>
            <tr>
              <td>icon</td>
              <td>2022-04-04</td>
              <td>cleaning</td>
              <td>Home</td>
              <td>0.12$</td>
              <td><button>Delete</button></td>
              <td><button>Edit</button></td>
              
            </tr>

          </tbody>
        </table>
     

    </center>
    </div>
  )
}
export default AllTransaction;