import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import Lista from "./Lista"

export default function UserPage(props) {
    let { userId } = useParams();
    let productosFiltrados = props.tools.filter(product => product.userId == userId);

    let usuarioList = props.users.filter(user => user.id == userId);
    let user = usuarioList[0];
    
    const [puntuacionMedia, setPuntuacionMedia] = useState(0);
    const [estrellas, setEstrellas] = useState("");

    useEffect(() => {
        const puntuacionMediaUser = () => {
            let puntuacionesFiltradasUserId = props.puntuaciones.filter(usuario => usuario.userId == user.id);
            console.log(puntuacionesFiltradasUserId);
            let puntuacionTotal = 0;
            let nValoraciones = 0;
            let puntMedia = 0;
            puntuacionesFiltradasUserId.map(puntuaciones => {
                puntuacionTotal +=  puntuaciones.puntuacion;
                nValoraciones++;
            })
            puntMedia = Math.floor(puntuacionTotal/nValoraciones);
            return puntMedia;
            
        }
        setPuntuacionMedia(puntuacionMediaUser());
    }, [user.id, props.puntuaciones]);


    useEffect(() =>{
        const estrellasMedia = () => {
            const rutaEstrellas = `/${puntuacionMedia}estrellas.png`;
            return rutaEstrellas;
        }
        setEstrellas(estrellasMedia());
    });
    
    return (<div>
        <div className="dashboardZona1">
            <img className="profilePhoto" src={user.fotoUser} width="250px" height="250px"></img>
            <h2>{user.nombre}</h2>
            <img src={estrellas} height="40px" width="250px"></img>
            <p><b>Puntuación: {puntuacionMedia} </b></p>
        </div>
        <div id="otrasHerramientas">
            <p id="otrasHerramientasTitulo"><b>Otras herramientas publicadas por {user.nombre}:</b></p>
            <div id="otrasHerramientasTarjetas">
                <Lista tools={productosFiltrados} />
            </div>
        </div>
    </div>)
}
