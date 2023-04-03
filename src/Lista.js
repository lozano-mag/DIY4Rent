import { Link } from "react-router-dom"
export default function Lista(props){
    return(<div id="listaHerramientas">
        {props.productos.map((item) => {
            return(
                <Link to={"/herramientas/" + item.id}><div class="tarjeta" onClick={()=>console.log(item.id)}>
                    <div class="imagenHerramienta">
                        <img height="290px" width='300px' src={item.images[0]}></img>
                    </div>
                    <div class="tituloHerramienta">
                        <p>{item.title}</p>
                    </div>
                </div></Link>
            )
        })}
    </div>
    )
}