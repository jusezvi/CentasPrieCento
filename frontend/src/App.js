import './App.css';
import Home from './Home';
import Testas from './AllTransaction';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
/* import Header from './Header'; */
import AllTransaction from './AllTransaction';
import WelcomeHtmlRender from './LoginRegister/welcome';
import Registration from './LoginRegister/registerRender';
import Login from './LoginRegister/loginRender'
import Administration from './Administration';
import { useState } from 'react';

function App() {

  const [test, setTest] = useState(null)

  // const location = useLocation();
  // const navigate = useNavigate();

  // function checkLogin() {
  //   if (location.state === null) {
  //     navigate("/login");
  //   } else {
  //     navigate("/");
  //   }
  // }
  console.log('app ' + test)
  return (
    <div className="app">

      <BrowserRouter>
        <Routes>
          <Route>
            <Route exact path="/" element={<Home setTest={setTest} />} />

            {/* <Route exact path="/">
              if (location.state === null)
            </Route> */}

            <Route path="/alltransaction" element={<AllTransaction />} />
            <Route path="/home" element={<Home />} />
            <Route path="/welcome" element={<WelcomeHtmlRender />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/administration" element={<Administration />} />
            {/* <Route path="/login" element={<Login />} />
            
            <Route path="/profile" element={<Profile />} /> */}

          </Route>
        </Routes>
      </BrowserRouter>

      {test}
    </div>
  );
}

export default App;
