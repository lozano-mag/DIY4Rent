import { Link } from "react-router-dom"
export default function Lista(props){
    return(<div id="listaHerramientas">
        {props.tools.map((item) => {
            return(
                <Link to={"/herramientas/" + item.id}><div class="tarjeta" onClick={()=>console.log(item.id)}>
                    <div>
                        <img src={item.foto}></img>
                    </div>
                    <div>
                        <p><b>{item.nombre}</b></p>
                        <p><b>{item.precio}€/día</b></p>
                    </div>
                </div></Link>
            )
        })}
    </div>
    )
}