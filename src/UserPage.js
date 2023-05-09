import { useParams } from "react-router-dom"
import Lista from "./Lista"
import { useState, useEffect } from "react";

export default function UserPage(props) {
    useEffect(
        () => {
            const token = localStorage.getItem("token");
            if (!token) {

                window.location.href = "/login";
            }

        }, []

    )
    let { userId } = useParams();
    let productosFiltrados = props.tools.filter(product => product.userId == userId);

    let usuarioList = props.users.filter(user => user.id == userId);
    let user = usuarioList[0];

    const [puntuacionMedia, setPuntuacionMedia] = useState(0);
    const [estrellas, setEstrellas] = useState("");
    const [numeroValoraciones, setNumeroValoraciones] = useState(0);

    useEffect(() => {
        const puntuacionMediaUser = () => {
            let puntuacionesFiltradasUserId = props.puntuaciones.filter(puntuacion => puntuacion.userId == user.id);
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
                return puntuacionMedia;
            }

        }
        let puntuacionesFiltradasUserId = props.puntuaciones.filter(puntuacion => puntuacion.userId == user.id);
        setNumeroValoraciones(puntuacionesFiltradasUserId.length);
        setPuntuacionMedia(puntuacionMediaUser());
    }, [user.id, props.puntuaciones]);

    useEffect(() => {
        const estrellasMedia = () => {
            const rutaEstrellas = `/${puntuacionMedia}estrellas.png`;
            return rutaEstrellas;
        }
        setEstrellas(estrellasMedia());
    });

    return (<div>
        <div className="dashboardZona1">
            <img className="profilePhoto" src={user.fotoUser} width="250px" height="250px"></img>
            <div id="dashboardDatos">
                <h2>{user.nombre}</h2>
                <img height="40px" width="250px" src={estrellas}></img>
                <p><b>Número de valoraciones: {numeroValoraciones}</b></p>
            </div>
        </div>
        <div id="otrasHerramientas">
            <p id="otrasHerramientasTitulo"><b>Otras herramientas publicadas por {user.nombre}:</b></p>
            <div id="otrasHerramientasTarjetas">
                <Lista tools={productosFiltrados} />
            </div>
        </div>
    </div>)
}
