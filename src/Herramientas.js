import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import Lista from "./Lista"
import { useState, useEffect } from "react";
import Mapa from "./Mapa";

export default function Herramientas(props) {

    let { productId } = useParams();

    const [position, setPosition] = useState([1, 1]);
    const [puntuacionMedia, setPuntuacionMedia] = useState(0);
    const [estrellas, setEstrellas] = useState("");
    const [numeroValoraciones, setNumeroValoraciones] = useState(0);

    const idLog = localStorage.getItem("idLog");
    let usuarioList = props.users.filter(user => user.id == idLog);
    let usuarioLog = usuarioList[0];

    let herramientaList = props.tools.filter(product => product.id == productId);
    let herramienta = herramientaList[0];

    let listarecomendadossinf = props.tools.filter(product => product.categoria === herramienta.categoria);
    let listarecomendados = listarecomendadossinf.filter(product => product.id !== herramienta.id);

    let propietarios = props.users.filter(user => user.id === herramienta.userId);
    let propietario = propietarios[0];

    const calculaDistancia = () => {
        let dLat = (propietario.lat - usuarioLog.lat) * (Math.PI / 180);
        let dLon = (propietario.lon - usuarioLog.lon) * (Math.PI / 180);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(propietario.lat * (Math.PI / 180)) *
            Math.cos(usuarioLog.lat * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const dist = 6371 * c;

        return dist;
    }

    useEffect(() => {
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

        async function fetchData() {
            try {
                setPosition(await getCoordinates(propietario.direccion));
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();

    }, [propietario.direccion]);

    useEffect(() => {
        const puntuacionMediaUser = () => {
            let puntuacionesFiltradasUserId = props.puntuaciones.filter(puntuacion => puntuacion.userId == propietario.id);
            console.log(puntuacionesFiltradasUserId);
            let puntuacionTotal = 0;
            let nValoraciones = 0;
            let puntuacionMedia = 0;
            if (puntuacionesFiltradasUserId.length == 0) {
                puntuacionMedia = 0;
                return puntuacionMedia;
            } else {
                puntuacionesFiltradasUserId.map(puntuaciones => {
                    puntuacionTotal += puntuaciones.puntuacion;
                    nValoraciones++;
                })
                puntuacionMedia = Math.floor(puntuacionTotal / nValoraciones);
                console.log(puntuacionMedia);
                return puntuacionMedia;
            }
        }
        let puntuacionesFiltradasUserId = props.puntuaciones.filter(puntuacion => puntuacion.userId == propietario.id);
        setNumeroValoraciones(puntuacionesFiltradasUserId.length);
        setPuntuacionMedia(puntuacionMediaUser());
    }, [propietario.id, props.puntuaciones]);

    useEffect(() => {
        const estrellasMedia = () => {
            const rutaEstrellas = `/${puntuacionMedia}estrellas.png`;
            return rutaEstrellas;
        }
        setEstrellas(estrellasMedia());
    });


    return (
        <div id="cajaHerramienta">
            <div id="zona1">
                <img id="fotoHerramientaPrincipal" src={herramienta.foto} height="500px" width='600px'></img>
                <Link to={"/usuarios/" + propietario.id}>
                    <div id="iraUser">
                        <img id="fotoIraUser" src={propietario.fotoUser} height="100px" width="100px"></img>
                        <p><b>{propietario.nombre}</b></p>
                        <button><b>Contactar</b></button>
                        <img src={estrellas}></img>
                    <p><b>Número de valoraciones: {numeroValoraciones}</b></p>
                    </div>
                </Link>
            </div>
            <div id="zona2">
                <div id="encabezadoPagHerramienta">
                    <h2><b>{herramienta.nombre}</b></h2>
                    <p><b>
                        Estado: {" "}
                        {herramienta.estadoDesgaste === 1 && "Excelente"}
                        {herramienta.estadoDesgaste === 2 && "Bueno"}
                        {herramienta.estadoDesgaste === 3 && "Regular"}
                    </b></p>
                    <p>Categoria: {herramienta.categoria}</p>
                </div>
                <p>{herramienta.descripcion}</p>
                <p id="precio"><b>{herramienta.precio}€/dia</b></p>
                <p><b>Ubicación:</b></p>
                {idLog ? <p>A <b>{calculaDistancia().toFixed(2)} Km</b> de ti</p> : <p>Inicia sesión para ver la distancia</p>}
                <Mapa posicion={position} propietario={propietario} />
                <p><b>Lista de reservas:</b></p>
                {props.reservas.map(reserva => {
                    if (reserva.herramientaId == herramienta.id && reserva.isPagado == true)
                        return (<div>
                            <p>{reserva.diaIni}/{reserva.mesIni}/{reserva.anoIni} - {reserva.diaFin}/{reserva.mesFin}/{reserva.anoFin}</p>
                        </div>)
                })}
            </div>
            <div id="listaRecomendados">
                <div id="introRecomendados">
                    <p><b>Otras herramientas de la misma categoría:</b></p>
                </div>
                <div id="tarjetasRecomendados">
                    <Lista tools={listarecomendados} />
                </div>
            </div>
        </div>
    )
}
