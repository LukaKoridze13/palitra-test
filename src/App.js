import './CSS/reset.css'
import './CSS/app.scss'
import { useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { Context } from './Context'
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { checkLogged, logOut } from './LocalStorage';
import ForgotPassword from './Pages/ForgotPassword';
import Register from './Pages/Register';
import Post from './Pages/Post';
import Author from './Pages/Author';
function App() {
  let navigate = useNavigate()
  const [logged, setLogged] = useState(false)
  return (
    <div className="container centerY">
      {checkLogged() && <div onClick={() => { logOut(); navigate('/palitra-test/login') }} className="logout">Log Out</div>}
      <Context.Provider value={{ logged, setLogged }}>
        <Routes>
          <Route path='/palitra-test/' element={checkLogged() ? <Navigate to='/palitra-test/post' /> : <Navigate to='/palitra-test/login' />}
          >
          </Route>
          <Route path='/palitra-test/login' element={checkLogged() ? <Navigate to='/palitra-test/post' /> : <Login />} />
          <Route path='/palitra-test/forgotpassword' element={checkLogged() ? <Navigate to='/palitra-test/post' /> : <ForgotPassword />} />
          <Route path='/palitra-test/register' element={checkLogged() ? <Navigate to='/palitra-test/post' /> : <Register />} />
          <Route path='/palitra-test/post' element={!checkLogged() ? <Navigate to='/palitra-test/login' /> : <Home />} />
          <Route path='/palitra-test/post/:id' element={!checkLogged() ? <Navigate to='/palitra-test/login' /> : <Post />} />
          <Route path='/palitra-test/author/:name' element={!checkLogged() ? <Navigate to='/palitra-test/login' /> : <Author />} />
        </Routes>
      </Context.Provider>
    </div>
  );
}

export default App;
