import './App.css';
import React, { useEffect } from 'react';
import { useState } from "react";
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
import Alquilar from './Alquilar';
import Valoracion from './Valoracion';
import DevolucionCompletada from './DevolucionCompletada';
import ConfirmarYPagar from './ConfirmarYPagar';

function App() {

  const [herramientas, setHerramientas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [carga, setCarga] = useState(true);
  const [puntuaciones, setPuntuaciones] = useState(0);

  useEffect(() => {
    async function fetchData() {
      await fetch('/api/herramientas')
        .then(response => response.json())
        .then(data => setHerramientas(data));
      await fetch('/api/usuarios')
        .then(response => response.json())
        .then(data => setUsuarios(data));
      await fetch('/api/reservas')
        .then(response => response.json())
        .then(data => setReservas(data));
      await fetch('/api/puntuaciones')
        .then(response => response.json())
        .then(data => setPuntuaciones(data));
      setTimeout(() => {
        setCarga(false);
      }, 500);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <Header users={usuarios}/>
      {carga ? <img id='loading' className='spinner' src='spinner.gif' /> :
        <Routes>
          <Route path={"/"} element={<Principal tools={herramientas} users={usuarios} reservas={reservas} />} />
          <Route path={"/herramientas/:productId"} element={<Herramientas users={usuarios} tools={herramientas} reservas={reservas} puntuaciones={puntuaciones} />} />
          <Route path={"/login"} element={<Login users={usuarios} />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={'/usuarios'} element={<Usuarios users={usuarios} />} />
          <Route path={'/usuarios/:userId'} element={<UserPage users={usuarios} tools={herramientas} puntuaciones={puntuaciones} />} />
          <Route path={'/edituser/:userId'} element={<EditUser users={usuarios} />} />
          <Route path={'/dashboard'} element={<Dashboard users={usuarios} tools={herramientas} reservas={reservas} puntuaciones={puntuaciones} />} />
          <Route path={'/herramienta_upload'} element={<SubirHerramienta />} />
          <Route path={'/herramienta_edit/:productId'} element={<EditarHerramientas tools={herramientas} />} />
          <Route path={'/alquilar/:herramientaId'} element={<Alquilar tools={herramientas} usuarios={usuarios} />} />
          <Route path={'/valoracion/:userId'} element={<Valoracion users={usuarios} puntuaciones={puntuaciones} />} />
          <Route path={'/devolver/:herramientaId'} element={<DevolucionCompletada users={usuarios} reservas={reservas} tools={herramientas} />} />
          <Route path={'/confirmarypagar/:reservaId'} element={<ConfirmarYPagar users={usuarios} reservas={reservas} tools={herramientas}/>}/>
        </Routes>
      }
    </div>
  );
}

export default App;
