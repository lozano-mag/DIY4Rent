import React from "react";
import { useState } from "react";
import Lista from "./Lista";

export default function Principal(props){
    
    const [productos, setProductos]=useState(props.allproducts);
    const [busqueda, setBusqueda]=useState("");
    const allCategories=props.allproducts.map(item=>item.category);
    const finalCategorias = allCategories.reduce((todasCategorias, categoria) => {
        if(!todasCategorias.includes(categoria)){
            return[...todasCategorias,categoria];
        }
        return todasCategorias;
    },[],);

    function filtroNombre(){
        let productosFiltrados=[];
        productosFiltrados=props.allproducts.filter(product=>product.title.toLowerCase().includes(busqueda));
        setProductos(productosFiltrados);
    }

    function filtroCategoria(categoria){
        let productosFiltrados = [];
        if(categoria=='Todas'){
            setProductos(props.allproducts);
        }else{
            productosFiltrados=props.allproducts.filter(product=>product.category===categoria);
            setProductos(productosFiltrados);
        }
    }
    
    return(
        <div>
            <select id="selectorCategorias" onChange={e => filtroCategoria(e.target.value)}>
                <option key={0}>Todas</option>
                {finalCategorias.map((item, index) => {
                    return(
                        <option key={index+1}>{item}</option>
                    )
                })}
            </select>
            <input type="string" onChange={e => setBusqueda(e.target.value)}></input>
            <button onClick={()=>filtroNombre()}>Buscar</button>
            <Lista productos={productos}/>
        </div>
    )
}