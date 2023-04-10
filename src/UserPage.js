import { useParams } from "react-router-dom"
import Lista from "./Lista"

export default function UserPage(props) {
    let { userId } = useParams();
    let productosFiltrados = props.tools.filter(product => product.userId == userId);

    let usuarioList = props.users.filter(user => user.id == userId);
    let user = usuarioList[0];

    return (<div>
        <div className="dashboardZona1">
            <img className="profilePhoto" src={user.fotoUser} width="250px" height="250px"></img>
            <h2>{user.nombre}</h2>
        </div>
        <div id="otrasHerramientas">
            <p id="otrasHerramientasTitulo"><b>Otras herramientas publicadas por {user.nombre}:</b></p>
            <div id="otrasHerramientasTarjetas">
                <Lista tools={productosFiltrados} />
            </div>
        </div>
    </div>)
}