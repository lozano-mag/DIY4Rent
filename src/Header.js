import { Link } from "react-router-dom"
export default function Header(){
    return(<div id="header">
       <Link to={"/"}><img id="logotipo" src="logo.jpg"/></Link>
       <div id="botonesInicio">
        <button class="boton">Iniciar Sesión</button>
        <button class="boton">Registrarse</button> 
       </div>
    </div>
    )
}