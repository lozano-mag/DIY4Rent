import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import Lista from "./Lista";

export default function Herramientas(props){
    let {productId}=useParams();
    let herramientaList = props.tools.filter(product => product.id == productId);
    let herramienta = herramientaList[0];
    console.log(herramienta);
    let listarecomendadossinf = props.tools.filter(product=>product.categoria===herramienta.categoria);
    let listarecomendados = listarecomendadossinf.filter(product=>product.id!==herramienta.id);
    let propietarios = props.users.filter(user=>user.id===herramienta.userId);
    let propietario = propietarios[0];
    console.log(propietario);
    return(
        <div id="cajaHerramienta">
            <div id="zona1">
                <img src={herramienta.foto} height="500px" width='600px'></img>
                <img></img>
                <Link to={"/usuarios/" + propietario.id}><p>{propietario.nombre}</p></Link>
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
            </div>
            <p>Otras herramientas recomendadas</p>
            <Lista tools={listarecomendados}/>
        </div>
    )
}