import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"

export default function Herramientas(props){
    let {productId}=useParams();
    console.log(productId)
    return(
        <div>
            <h2><b>{props.allproducts[productId - 1].title}</b></h2>
            <img src={props.allproducts[productId - 1].images[0]}></img>
        </div>
    )
}