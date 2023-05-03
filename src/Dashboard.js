import { Link } from "react-router-dom"
import ListaAlquiladas from "./ListaAlquiladas"
import ListaMisHerramientas from "./ListaMisHerramientas"
import { useEffect, useState } from "react";

export default function Dashboard(props) {

    //check logged in or not
    const idLog = localStorage.getItem("idLog");
    console.log(idLog);
    useEffect(
        () => {
            const token = localStorage.getItem("token");
            if (!token) {

                window.location.href = "/login";
            }

        }, []

    )

    let usuarioList = props.users.filter(user => user.id == idLog);
    let usuario = usuarioList[0];

    let herramientas = props.tools.filter(product => product.userId == usuario.id);
        console.log(usuario);
    const [puntuacionMedia, setPuntuacionMedia] = useState(0);
    const [estrellas, setEstrellas] = useState("");

    useEffect(() => {
        const puntuacionMediaUser = () => {
            let puntuacionesFiltradasUserId = props.puntuaciones.filter(usuario => usuario.id == idLog);
            console.log(puntuacionesFiltradasUserId);
            let puntuacionTotal = 0;
            let nValoraciones = 0;
            let puntuacionMedia = 0;
            puntuacionesFiltradasUserId.map(puntuaciones => {
                puntuacionTotal += puntuaciones.puntuacion;
                nValoraciones++;
            })
            puntuacionMedia = Math.floor(puntuacionTotal / nValoraciones);
            return puntuacionMedia;

        }
        setPuntuacionMedia(puntuacionMediaUser());
    }, [usuario.id, props.puntuaciones]);

    useEffect(() => {
        const estrellasMedia = () => {
            const rutaEstrellas = `/${puntuacionMedia}estrellas.png`;
            return rutaEstrellas;
        }
        setEstrellas(estrellasMedia());
    });
    //
    return (<div id="dashboard">
        <div className="dashboardZona1">
            <img className="profilePhoto" src={usuario.fotoUser} width="250px" height="250px"></img>
            <div id="dashboardDatos">
                <h2>{usuario.nombre}</h2>
                <img src={estrellas}></img>
                <p><b>Puntuación: {puntuacionMedia}</b></p>
                <Link to={`/edituser/${idLog}`}><button className="loginEnter">Editar datos</button></Link>
            </div>
        </div>
        <div id="subirDashboard">
            <Link to={'/herramienta_upload'}><button className="loginSubirDashboard"><b>Subir herramienta</b></button></Link>
        </div>
        <div id="dashboardZona2">
            <p id="tituloDashboardZona2"><b>Herramientas alquiladas:</b></p>
            <ListaAlquiladas tools={props.tools} reservas={props.reservas} usuarios={props.users} />
        </div>
        <div id="dashboardZona3">
            <p id="tituloDashboardZona3"><b>Mis herramientas:</b></p>
            {console.log(props.tools)}
            <ListaMisHerramientas tools={herramientas} reservas={props.reservas}/>
        </div>
    </div>)
}
