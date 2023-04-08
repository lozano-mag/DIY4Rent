import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import Lista from "./Lista"

export default function UserPage(props){
    let {userId} = useParams();
    let productosFiltrados = props.tools.filter(product=>product.userId==userId);
    return(<div>
        <img src={props.users[userId - 1].fotoUser}></img>
        <h2>{props.users[userId - 1].nombre}</h2>
        <Link to={"/edituser/" + props.users[userId - 1].id}><button>Editar datos</button></Link>
        <Lista tools={productosFiltrados}/>

    </div>)
}