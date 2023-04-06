import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import Lista from "./Lista";

export default function Herramientas(props){
    let {productId}=useParams();
    let listarecomendadossinf = props.tools.filter(product=>product.categoria===props.tools[productId - 1].categoria);
    let listarecomendados = listarecomendadossinf.filter(product=>product.id!=props.tools[productId - 1].id);
    return(
        <div id="cajaHerramienta">
            <div id="zona1">
                <img src={props.tools[productId - 1].foto}></img>
                <img></img>
                <p>Propietario</p>
                <button>Contactar con propietario</button>
            </div>
            <div id="zona2">
                <div>
                    <h2><b>{props.tools[productId - 1].nombre}</b></h2>
                    <b>Estado:</b>
                    <p>{props.tools[productId - 1].categoria}</p>
                </div>
                <p>{props.tools[productId - 1].descripcion}</p>
                <p><b>{props.tools[productId - 1].precio}€/dia</b></p>
            </div>
            <Lista tools={listarecomendados}/>
            <p>Otras herramientas recomendadas</p>
            
        </div>
    )
}