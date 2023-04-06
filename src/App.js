import './App.css';
import React, { useEffect } from 'react';
import {useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Header';
import Principal from './Principal';
import Herramientas from './Herramientas';
import { mockdata } from './constants/products';
import Login from './Login';
import Register from './Register';

function App() {

  const [herramientas, setHerramientas] = useState([]);
  const [carga, setCarga]=useState(true);

  useEffect(() => {
    async function fetchData(){
      await fetch('/api/herramientas')
      .then(response => response.json())
      .then(data => setHerramientas(data));
      setTimeout(() => {
        setCarga(false);
      }, 500);
    }
    fetchData();
  },[]);

  return (
    <div className="App">
      <Header/>
      {carga ? <img width="200px" height="200px" id='loading' className='spinner' src='spinner.gif'/> : 
      <Routes>
        <Route path={"/"} element={<Principal tools={herramientas}/>}/>
        <Route path={"/herramientas/:productId"} element={<Herramientas tools={herramientas}/>}/>
        <Route path={"/login"} element={<Login/>}/>
        <Route path={"/register"} element={<Register/>}/>
      </Routes>
      }
    </div>
  );
}

export default App;
