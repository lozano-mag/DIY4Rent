import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import L from "leaflet"
import icon from "leaflet/dist/images/marker-icon.png"
import Lista from "./Lista"
import { useState, useEffect } from "react";

export default function Herramientas(props) {

    let { productId } = useParams();

    const [position, setPosition] = useState([1, 1]);
    const [carga, setCarga] = useState(true);

    let herramientaList = props.tools.filter(product => product.id == productId);
    let herramienta = herramientaList[0];

    let listarecomendadossinf = props.tools.filter(product => product.categoria === herramienta.categoria);
    let listarecomendados = listarecomendadossinf.filter(product => product.id !== herramienta.id);

    let propietarios = props.users.filter(user => user.id === herramienta.userId);
    let propietario = propietarios[0];

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

    useEffect(() => {
        async function fetchData() {
            try{
                setPosition(await getCoordinates(propietario.direccion));
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        setTimeout(() => {
            setCarga(false);
        }, 500);
    });

    let iconUbicacion = new L.icon({
        iconUrl: icon,
    });

    if (carga) {
        return (<div>
            <p>Cargando</p>
        </div>)
    }
    return (
        <div id="cajaHerramienta">
            <div id="zona1">
                <img src={herramienta.foto} height="500px" width='600px'></img>
                <Link to={"/usuarios/" + propietario.id}>
                    <div>
                        <img src={propietario.fotoUser} height="100px" width="100px"></img>
                        <p>{propietario.nombre}</p>
                    </div>
                </Link>
                <button>Contactar con propietario</button>
            </div>
            <div id="zona2">
                <div>
                    <h2><b>{herramienta.nombre}</b></h2>
                    <b>Estado:</b>
                    <p>{herramienta.categoria}</p>
                </div>
                <p>{herramienta.descripcion}</p>
                <p><b>{herramienta.precio}€/dia</b></p>
                <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="mapa">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position} icon={iconUbicacion}>
                        <Popup>
                            Ubicación de {propietario.nombre}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
            <p>Otras herramientas recomendadas</p>
            <Lista tools={listarecomendados} />
        </div>
    )
}