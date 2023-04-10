import './App.css';
import React, { useEffect } from 'react';
import {useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Header';
import Principal from './Principal';
import Herramientas from './Herramientas';
import Login from './Login';
import Register from './Register';
import Usuarios from './Usuarios';
import UserPage from './UserPage';
import EditUser from './EditUser';
import Dashboard from './Dashboard';
import SubirHerramienta from './SubirHerramienta';
import EditarHerramientas from './EditarHerramientas';

function App() {

  const [herramientas, setHerramientas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [carga, setCarga]=useState(true);

  useEffect(() => {
    async function fetchData(){
      await fetch('/api/herramientas')
      .then(response => response.json())
      .then(data => setHerramientas(data));
      await fetch('/api/usuarios')
      .then(response => response.json())
      .then(data => setUsuarios(data));
      setTimeout(() => {
        setCarga(false);
      }, 500);
    }
    fetchData();
  },[]);

  return (
    <div className="App">
      <Header/>
      {carga ? <img id='loading' className='spinner' src='spinner.gif'/> : 
      <Routes>
        <Route path={"/"} element={<Principal tools={herramientas}/>}/>
        <Route path={"/herramientas/:productId"} element={<Herramientas users={usuarios} tools={herramientas}/>}/>
        <Route path={"/login"} element={<Login/>}/>
        <Route path={"/register"} element={<Register/>}/>
        <Route path={'/usuarios'} element={<Usuarios users={usuarios}/>} />
        <Route path={'/usuarios/:userId'} element={<UserPage users={usuarios} tools={herramientas}/>}/>
        <Route path={'/edituser/:userId'} element={<EditUser users={usuarios}/>}/>
        <Route path={'/dashboard'}  element={<Dashboard users={usuarios} tools={herramientas}/>}/>
        <Route path={'/herramienta_upload'} element={<SubirHerramienta/>}/>
        <Route path={'/herramienta_edit/:productId'} element={<EditarHerramientas tools={herramientas}/>}/>
      </Routes>
      }
    </div>
  );
}

export default App;
