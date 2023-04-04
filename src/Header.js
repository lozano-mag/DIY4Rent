import { Link } from "react-router-dom"
export default function Header(){
    return(<div id="header">
       <Link to={"/"}><img id="logotipo" src="logo.jpg"/></Link>
       <div id="botonesInicio">
        <Link to={"/login"}><button class="boton">Iniciar Sesión</button></Link>
        <Link to={"/register"}><button class="boton">Registrarse</button></Link> 
       </div>
    </div>
    )
}