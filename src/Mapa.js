import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import L from "leaflet"
import icon from "leaflet/dist/images/marker-icon.png"
import { useState } from "react"
import { useEffect } from "react"

export default function Mapa(props) {

    const [carga, setCarga] = useState(true);

    useEffect(() => {
        setCarga(true);
        setTimeout(() => {
            setCarga(false);
        }, 500);
    },[props.posicion])

    let iconUbicacion = new L.icon({
        iconUrl: icon,
    });

    if(carga){
        return(<p>Cargando</p>)
    }
    return (<div>
        <MapContainer center={props.posicion} zoom={13} scrollWheelZoom={false} className="mapa">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={props.posicion} icon={iconUbicacion}>
                <Popup>
                    Ubicación de {props.propietario.nombre}
                </Popup>
            </Marker>
        </MapContainer>
    </div>)
}