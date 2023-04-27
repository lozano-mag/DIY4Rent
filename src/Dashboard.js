import { Link } from "react-router-dom"
import ListaAlquiladas from "./ListaAlquiladas"
import ListaMisHerramientas from "./ListaMisHerramientas"
import { useEffect, useState } from "react";

export default function Dashboard(props) {
    const [puntuacionMedia, setPuntuacionMedia] = useState(0);
    const [estrellas, setEstrellas] = useState(0);

    let herramientas = props.tools.filter(product => product.userId == 1);
    
    useEffect(() => {
        const puntuacionMediaUser = () => {
            let puntuacionesFiltradasUserId = props.puntuaciones.filter(usuario => usuario.userId == props.users[0].id);
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
    }, [props.users[0].id, props.puntuaciones]);

    useEffect(() =>{
        const estrellasMedia = () => {
            const rutaEstrellas = `/${puntuacionMedia}estrellas.png`;
            return rutaEstrellas;
        }
        setEstrellas(estrellasMedia());
    });
    
    return (<div id="dashboard">
        <div className="dashboardZona1">
            <img className="profilePhoto" src={props.users[0].fotoUser} width="250px" height="250px"></img>
            <div id="dashboardDatos">
                <h2>{props.users[0].nombre}</h2>
                <img src={estrellas}></img>
                <p><b>Puntuación: {puntuacionMedia}</b></p>
                <Link to={'/edituser/1'}><button className="loginEnter">Editar datos</button></Link>
            </div>
        </div>
        <div id="subirDashboard">
            <Link to={'/herramienta_upload'}><button className="loginSubirDashboard"><b>Subir herramienta</b></button></Link>
        </div>
        <div id="dashboardZona2">
            <p id="tituloDashboardZona2"><b>Herramientas alquiladas:</b></p>
            <ListaAlquiladas users={props.users} tools={props.tools} />
        </div>
        <div id="dashboardZona3">
            <p id="tituloDashboardZona3"><b>Mis herramientas:</b></p>
            <ListaMisHerramientas tools={herramientas} />
        </div>
    </div>)
}
