import './App.css';
import Home from './Home';
import Testas from './AllTransaction';
import { BrowserRouter ,  Route,  Routes } from 'react-router-dom';
import Header from './Header';
import AllTransaction from './AllTransaction';

function App() {
  return (
    <div className="app">
    
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route>
            <Route exact path="/home" element={<Home />} />
            <Route path="/alltransaction" element={<AllTransaction/>} />
            {/* <Route path="/login" element={<Login />} />
            
            <Route path="/profile" element={<Profile />} /> */}
            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
