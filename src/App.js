import './CSS/reset.css'
import './CSS/app.scss'
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Context } from './Context'
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { checkLogged } from './LocalStorage';
import ForgotPassword from './Pages/ForgotPassword';
import Register from './Pages/Register';
function App() {
  const [logged, setLogged] = useState(false)
  return (
    <div className="container centerY">
      <Context.Provider value={{ logged, setLogged }}>
        <Routes>
          <Route path='/palitra-test/' element={checkLogged() ? <Navigate to='/palitra-test/home' /> : <Navigate to='/palitra-test/login' />}
          >
          </Route>
          <Route path='/palitra-test/login' element={checkLogged() ? <Navigate to='/palitra-test/home' /> : <Login />} />
          <Route path='/palitra-test/forgotpassword' element={checkLogged() ? <Navigate to='/palitra-test/home' /> : <ForgotPassword />} />
          <Route path='/palitra-test/register' element={checkLogged() ? <Navigate to='/palitra-test/home' /> : <Register/>} />
          <Route path='/palitra-test/home' element={!checkLogged() ? <Navigate to='/palitra-test/home' /> : <Home />} />
        </Routes>
      </Context.Provider>
    </div>
  );
}

export default App;
