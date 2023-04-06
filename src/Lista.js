import { Link } from "react-router-dom"
export default function Lista(props){
    return(<div id="listaHerramientas">
        {console.log(props.tools)}
        {props.tools.map((item) => {
            return(
                <Link to={"/herramientas/" + item.id}><div class="tarjeta" onClick={()=>console.log(item.id)}>
                    <div class="imagenHerramienta">
                        <img height="290px" width='300px' src={item.foto}></img>
                    </div>
                    <div class="tituloHerramienta">
                        <p>{item.nombre}</p>
                    </div>
                </div></Link>
            )
        })}
    </div>
    )
}