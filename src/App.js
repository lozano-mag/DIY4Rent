import './App.css';
import React, { useEffect } from 'react';
import {useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Header';
import Principal from './Principal';
import Herramientas from './Herramientas';
import { mockdata } from './constants/products';
function App() {

  const [productos, setProductos] = useState(mockdata)

  return (
    <div className="App">
      <Header/>
        <Routes>
          <Route path={"/"} element={<Principal allproducts={productos.products}/>}/>
          <Route path={"/herramientas/:productId"} element={<Herramientas allproducts={productos.products}/>}/>
        </Routes>
    </div>
  );
}

export default App;
