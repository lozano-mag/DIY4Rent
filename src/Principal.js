import React from "react";
import { useState } from "react";
import Lista from "./Lista";

export default function Principal(props){
    
    const [herramientas, setProductos]=useState(props.tools);
    const [busqueda, setBusqueda]=useState("");
    const allCategories=props.tools.map(item=>item.categoria);
    const finalCategorias = allCategories.reduce((todasCategorias, categoria) => {
        if(!todasCategorias.includes(categoria)){
            return[...todasCategorias,categoria];
        }
        return todasCategorias;
    },[],);

    function filtroNombre(){
        let productosFiltrados=[];
        productosFiltrados=props.tools.filter(tool => tool.nombre.toLowerCase().includes(busqueda));
        setProductos(productosFiltrados);
    }

    function filtroCategoria(categoria){
        let productosFiltrados = [];
        if(categoria=='Todas'){
            setProductos(props.tools);
        }else{
            productosFiltrados=props.tools.filter(product=>product.categoria===categoria);
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
            <Lista tools={herramientas}/>
        </div>
    )
}