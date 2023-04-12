import React from "react";
import { useState } from "react";
import Lista from "./Lista";

export default function Principal(props) {

    const [herramientas, setProductos] = useState(props.tools);
    const [busqueda, setBusqueda] = useState("");
    const [precioBusqueda, setPrecio] = useState("");

    const allCategories = props.tools.map(item => item.categoria);
    const finalCategorias = allCategories.reduce((todasCategorias, categoria) => {
        if (!todasCategorias.includes(categoria)) {
            return [...todasCategorias, categoria];
        }
        return todasCategorias;
    }, [],);

    function filtroNombre() {
        let productosFiltrados = [];
        productosFiltrados = props.tools.filter(tool => tool.nombre.toLowerCase().includes(busqueda));
        setProductos(productosFiltrados);
    }

    function filtroPrecio() {
        let productosFiltrados = [];
        productosFiltrados = props.tools.filter(tool => tool.precio <= precioBusqueda);
        setProductos(productosFiltrados)
    }

    function filtroCategoria(categoria) {
        let productosFiltrados = [];
        if (categoria == 'Todas') {
            setProductos(props.tools);
        } else {
            productosFiltrados = props.tools.filter(product => product.categoria === categoria);
            setProductos(productosFiltrados);
        }
    }

    return (
        <div id="pagBusqueda">
            <div id="barraBusqueda">
                <input id="filtroPrecio" placeholder="Max Precio (€/día)" onChange={e => setPrecio(e.target.value)}></input>
                <button id="botonFiltroPrecio" onClick={() => filtroPrecio()}>Filtrar</button>
                <select id="selectorCategorias" onChange={e => filtroCategoria(e.target.value)}>
                    <option key={0}>Todas</option>
                    {finalCategorias.map((item, index) => {
                        return (
                            <option key={index + 1}>{item}</option>
                        )
                    })}
                </select>
                <input id="filtroNombre" type="string" onChange={e => setBusqueda(e.target.value)}></input>
                <button id="botonfiltroNombre" onClick={() => filtroNombre()}><b>Buscar</b></button>
            </div>
            <Lista tools={herramientas} />
        </div>
    )
}