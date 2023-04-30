import React, { useEffect } from "react";
import { useState } from "react";
import Lista from "./Lista";

export default function Principal(props) {
 

    const [herramientas, setProductos] = useState(props.tools);
    const [busqueda, setBusqueda] = useState("");
    const [precioBusqueda, setPrecio] = useState("");
    const [distanciaBusqueda, setDistancia] = useState("");
    const [posicion, setPosicion] = useState([1, 1]);

    const allCategories = props.tools.map(item => item.categoria);
    const finalCategorias = allCategories.reduce((todasCategorias, categoria) => {
        if (!todasCategorias.includes(categoria)) {
            return [...todasCategorias, categoria];
        }
        return todasCategorias;
    }, [],);

    async function getCoordinates(address) {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`);
        const data = await response.json();
        if (data.length === 0) {
            throw new Error('No se encontraron coordenadas para la dirección proporcionada');
        }
        return {
            lat: data[0].lat,
            lon: data[0].lon,
        };
    }

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

    function filtrarDistancia() {
        console.log(posicion);
        let distancias = props.users.map(user => {
            let dLat = (user.lat - posicion.lat) * (Math.PI / 180);
            let dLon = (user.lon - posicion.lon) * (Math.PI / 180);

            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(posicion.lat * (Math.PI / 180)) *
                Math.cos(user.lat * (Math.PI / 180)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            const distancia = 6371 * c;

            return distancia;
        })

        let usuariosFiltrados = props.users.filter(user => {
            let dLat = (user.lat - posicion.lat) * (Math.PI / 180);
            let dLon = (user.lon - posicion.lon) * (Math.PI / 180);

            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(posicion.lat * (Math.PI / 180)) *
                Math.cos(user.lat * (Math.PI / 180)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            const distancia = 6371 * c;

            return distancia < distanciaBusqueda;
        })
        console.log(distancias);
        console.log(usuariosFiltrados);
        let idsFiltrados = usuariosFiltrados.map(user => user.id);
        console.log(idsFiltrados)
        let listaHerramientasDistancia = props.tools.filter(herramienta => idsFiltrados.includes(herramienta.userId));
        console.log(listaHerramientasDistancia);
        setProductos(listaHerramientasDistancia);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                setPosicion(await getCoordinates(props.users[0].direccion));
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
        console.log(posicion);
    }, [props.users[0].direccion]);

    return (
        <div id="pagBusqueda">
            <div id="barraBusqueda">
                <input id="filtroPrecio" placeholder="Max Precio (€/día)" onChange={e => setPrecio(e.target.value)}></input>
                <button id="botonFiltroPrecio" onClick={() => filtroPrecio()}>Filtrar</button>
                <input placeholder="Max Distancia" onChange={e => setDistancia(e.target.value)}></input>
                <button onClick={() => filtrarDistancia()}>Filtrar</button>
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
