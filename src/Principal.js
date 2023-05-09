import React, { useEffect } from "react";
import { useState } from "react";
import Lista from "./Lista";
import moment from "moment/moment";

export default function Principal(props) {


    const [herramientas, setProductos] = useState(props.tools);
    const [busqueda, setBusqueda] = useState("");
    const [precioBusqueda, setPrecio] = useState("");
    const [distanciaBusqueda, setDistancia] = useState("");
    const [posicion, setPosicion] = useState([1, 1]);
    const [diaIniSeleccionado, setdiaIniSeleccionado] = useState(1);
    const [mesIniSeleccionado, setmesIniSeleccionado] = useState(1);
    const [anoIniSeleccionado, setanoIniSeleccionado] = useState(2023);
    const [diaFinSeleccionado, setdiaFinSeleccionado] = useState(1);
    const [mesFinSeleccionado, setmesFinSeleccionado] = useState(1);
    const [anoFinSeleccionado, setanoFinSeleccionado] = useState(2023);

    const idLog = localStorage.getItem("idLog");
    let usuarioList = props.users.filter(user => user.id == idLog);
    let usuarioLog = usuarioList[0];

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
                setPosicion(await getCoordinates(usuarioLog.direccion));
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
        console.log(posicion);
    }, [props.users[0].direccion]);

    const buscarReservasDisponibles = () => {
        let stringFechaIni = `${anoIniSeleccionado}-${mesIniSeleccionado}-${diaIniSeleccionado}`;
        let stringFechaFin = `${anoFinSeleccionado}-${mesFinSeleccionado}-${diaFinSeleccionado}`;

        const fechaSeleccionadaIniObjeto = moment(stringFechaIni);
        const fechaSeleccionadaFinObjeto = moment(stringFechaFin);

        let idsEliminados = [];

        const reservasDisponibles = props.reservas.filter((reserva) => {
            const stringFechaInicio = `${reserva.anoIni}-${reserva.mesIni}-${reserva.diaIni}`;
            const stringFechaFin = `${reserva.anoFin}-${reserva.mesFin}-${reserva.diaFin}`;
            const fechaInicioObjeto = moment(stringFechaInicio);
            const fechaFinObjeto = moment(stringFechaFin);
            if (fechaSeleccionadaIniObjeto.isSameOrAfter(fechaInicioObjeto) &&
                fechaSeleccionadaIniObjeto.isBefore(fechaFinObjeto) &&
                fechaSeleccionadaFinObjeto.isAfter(fechaInicioObjeto)) {
                idsEliminados.push(reserva.herramientaId);
                console.log("eliminado")
            }

            return (
                (fechaSeleccionadaIniObjeto.isBefore(fechaInicioObjeto) && fechaSeleccionadaFinObjeto.isBefore(fechaInicioObjeto))
                ||
                (fechaFinObjeto.isBefore(fechaSeleccionadaIniObjeto) && fechaFinObjeto.isBefore(fechaSeleccionadaFinObjeto))
            );
        });

        console.log(idsEliminados);
        console.log(props.reservas);
        console.log(reservasDisponibles);
        let idsFiltradosConReserva = reservasDisponibles.map(reserva => reserva.herramientaId);
        let listaHerramientasDisponibles = props.tools.filter(herramienta => idsFiltradosConReserva.includes(herramienta.id));
        let allIds = props.reservas.map(reserva => reserva.herramientaId);
        let listaHerramientasSinReserva = props.tools.filter(herramienta => !allIds.includes(herramienta.id));
        let listadoDisponibles = [...listaHerramientasDisponibles, ...listaHerramientasSinReserva];
        let listadoDisponiblesFinal = listadoDisponibles.filter(herramienta => !idsEliminados.includes(herramienta.id));

        setProductos(listadoDisponiblesFinal);
    };

    return (
        <div id="pagBusqueda">
            <div id="barraBusqueda">
            <p>Filtrar por:</p>
                <div class="DesdeyHasta">
                    <p><b>Disponibilidad</b> <i>desde</i></p>
                    <div class="Desde">
                        <select className="botonDisponibilidadFecha" onChange={e => setdiaIniSeleccionado(e.target.value)}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                            <option>13</option>
                            <option>14</option>
                            <option>15</option>
                            <option>16</option>
                            <option>17</option>
                            <option>18</option>
                            <option>19</option>
                            <option>20</option>
                            <option>21</option>
                            <option>22</option>
                            <option>23</option>
                            <option>24</option>
                            <option>25</option>
                            <option>27</option>
                            <option>28</option>
                            <option>29</option>
                            <option>30</option>
                            <option>31</option>
                        </select>
        
                        <select className="botonDisponibilidadFecha" onChange={e => setmesIniSeleccionado(e.target.value)}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                        </select>
                
                        <select className="botonDisponibilidadFecha" onChange={e => setanoIniSeleccionado(e.target.value)}>
                            <option>2023</option>
                            <option>2024</option>
                            <option>2025</option>
                        </select>
                    </div>
                    <div class="Hasta">
                        <p><i>hasta</i></p>
                        <select className="botonDisponibilidadFecha" onChange={e => setdiaFinSeleccionado(e.target.value)}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                            <option>13</option>
                            <option>14</option>
                            <option>15</option>
                            <option>16</option>
                            <option>17</option>
                            <option>18</option>
                            <option>19</option>
                            <option>20</option>
                            <option>21</option>
                            <option>22</option>
                            <option>23</option>
                            <option>24</option>
                            <option>25</option>
                            <option>27</option>
                            <option>28</option>
                            <option>29</option>
                            <option>30</option>
                            <option>31</option>
                        </select>
                    
                        <select className="botonDisponibilidadFecha" onChange={e => setmesFinSeleccionado(e.target.value)}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                        </select>
                        
                        <select className="botonDisponibilidadFecha" onChange={e => setanoFinSeleccionado(e.target.value)}>
                            <option>2023</option>
                            <option>2024</option>
                            <option>2025</option>
                        </select>
                    </div>
                    <button id="BotonFiltrarDisponibilidad" onClick={() => buscarReservasDisponibles()}>Filtrar</button>
                </div>
                <input className="filtroPrecio" placeholder="Max Precio (€/día)" onChange={e => setPrecio(e.target.value)}></input>
                <button className="botonFiltroPrecio" onClick={() => filtroPrecio()}>Filtrar</button>
                <input className="filtroPrecio" placeholder="Max Distancia (Km)" onChange={e => setDistancia(e.target.value)}></input>
                <button className="botonFiltroPrecio" onClick={() => filtrarDistancia()}>Filtrar</button>
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
