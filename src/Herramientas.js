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

    let herramientaList = props.tools.filter(product => product.id == productId);
    let herramienta = herramientaList[0];

    let listarecomendadossinf = props.tools.filter(product => product.categoria === herramienta.categoria);
    let listarecomendados = listarecomendadossinf.filter(product => product.id !== herramienta.id);

    let propietarios = props.users.filter(user => user.id === herramienta.userId);
    let propietario = propietarios[0];

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
            let puntuacionesFiltradasUserId = props.puntuaciones.filter(usuario => usuario.userId == propietario.id);
            console.log(puntuacionesFiltradasUserId);
            let puntuacionTotal = 0;
            let nValoraciones = 0;
            let puntuacionMedia = 0;
            puntuacionesFiltradasUserId.map(puntuaciones => {
                puntuacionTotal +=  puntuaciones.puntuacion;
                nValoraciones++;
            })
            puntuacionMedia = Math.floor(puntuacionTotal/nValoraciones);
            return puntuacionMedia;

        }
        setPuntuacionMedia(puntuacionMediaUser());
    }, [propietario.id, props.puntuaciones]);

    useEffect(() =>{
        const estrellasMedia = () => {
            const rutaEstrellas = `/${puntuacionMedia}estrellas.png`;
            return rutaEstrellas;
        }
        setEstrellas(estrellasMedia());
    });


    return (
        <div id="cajaHerramienta">
            {console.log(position)}
            <div id="zona1">
                <img id="fotoHerramientaPrincipal" src={herramienta.foto} height="500px" width='600px'></img>
                <Link to={"/usuarios/" + propietario.id}>
                    <div id="iraUser">
                        <img src={propietario.fotoUser} height="100px" width="100px"></img>
                        <p><b>{propietario.nombre}</b></p>
                        <img src={estrellas}></img>
                        <p><b>Puntuación: {puntuacionMedia}</b></p>
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
                <p>Ubicación:</p>
                <Mapa posicion={position} propietario={propietario} />
                <p>Lista de reservas:</p>
                {props.reservas.map(reserva => {
                    console.log(reserva);
                    if(reserva.herramientaId == herramienta.id)
                    return (<div>
                        <p>{reserva.diaIni}/{reserva.mesIni}/{reserva.anoIni} - {reserva.diaFin}/{reserva.mesFin}/{reserva.anoFin}</p>
                    </div>)
                })}
            </div>
            <div id="listaRecomendados">
                <div id="introRecomendados">
                    <p><b>Otras herramientas recomendadas:</b></p>
                </div>
                <div id="tarjetasRecomendados">
                    <Lista tools={listarecomendados} />
                </div>
            </div>

        </div>
    )
}