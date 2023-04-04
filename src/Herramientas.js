import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import Lista from "./Lista";

export default function Herramientas(props){
    let {productId}=useParams();
    let listarecomendadossinf = props.allproducts.filter(product=>product.category===props.allproducts[productId - 1].category);
    let listarecomendados = listarecomendadossinf.filter(product=>product.id!=props.allproducts[productId - 1].id);
    return(
        <div id="cajaHerramienta">
            <div id="zona1">
                <img src={props.allproducts[productId - 1].images[0]}></img>
                <img></img>
                <p>Propietario</p>
                <button>Contactar con propietario</button>
            </div>
            <div id="zona2">
                <div>
                    <h2><b>{props.allproducts[productId - 1].title}</b></h2>
                    <b>Estado:</b>
                    <p>{props.allproducts[productId - 1].category}</p>
                </div>
                <p>{props.allproducts[productId - 1].description}</p>
                <p><b>{props.allproducts[productId - 1].price}€/dia</b></p>
            </div>
            
            <p>Otras herramientas recomendadas</p>
            <Lista productos={listarecomendados}/>
        </div>
    )
}