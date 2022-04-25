import './App.css';
import Home from './Home';
import Testas from './AllTransaction';
import { BrowserRouter ,  Route,  Routes } from 'react-router-dom';
import Header from './Header';

function App() {
  return (
    <div className="app">
    
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route>
            <Route exact path="/Home" element={<Home />} />
            <Route path="/Testas" element={<Testas/>} />
            {/* <Route path="/login" element={<Login />} />
            
            <Route path="/profile" element={<Profile />} /> */}
            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
