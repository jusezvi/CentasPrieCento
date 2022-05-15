import './App.css';
import Home from './Home';
import Testas from './AllTransaction';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
/* import Header from './Header'; */
import AllTransaction from './AllTransaction';
import WelcomeHtmlRender from './LoginRegister/welcome';
import Registration from './LoginRegister/registerRender';
import Login from './LoginRegister/loginRender'
import Administration from './Administration';

function App() {
  return (
    <div className="app">

      <BrowserRouter>
        <Routes>
          <Route>
            <Route exact path="/" element={<Home />} />
            <Route path="/alltransaction" element={<AllTransaction />} />
            <Route path="/home" element={<Home />} />
            <Route path="/welcome" element={<WelcomeHtmlRender />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/administration" element={<Administration />}/>
            {/* <Route path="/login" element={<Login />} />
            
            <Route path="/profile" element={<Profile />} /> */}

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
