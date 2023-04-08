import { Link } from "react-router-dom"
import ListaAlquiladas from "./ListaAlquiladas"
import ListaMisHerramientas from "./ListaMisHerramientas"

export default function Dashboard(props){
    let herramientas = props.tools.filter(product=>product.userId==1);
    return(<div>
        <img src={props.users[0].fotoUser}></img>
        <h2>{props.users[0].nombre}</h2>
        <Link to={'/edituser/1'}><button>Editar datos</button></Link>
        <Link to={'/herramienta_upload'}><button>Subir herramienta</button></Link>
        <p>Herramientas alquiladas</p>
        <ListaAlquiladas users={props.users} tools={props.tools}/>
        <p>Mis herramienta</p>
        <ListaMisHerramientas tools={herramientas}/>
    </div>)
}