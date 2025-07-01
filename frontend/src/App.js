import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Auth/Login.js'
import Register from './Pages/Auth/Register.js'
import SetAvatar from './Pages/Avatar/setAvatar.js'
import Home from './Pages/Home/Home.js';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css'

const App = () => {
  return (
    
      <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
        </Routes>
      </BrowserRouter>
      </div>
  )
}

export default App
