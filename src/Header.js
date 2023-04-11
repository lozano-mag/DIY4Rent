import { Link } from "react-router-dom"
export default function Header(){

    const navegaPrincipal = () => {
        window.location.href = '/';
    };
    return(<div id="header">
       <img id="logotipo" src="logo.jpg" onClick={() => navegaPrincipal()}/>
       <div id="botonesInicio">
        <Link to={"/login"}><button class="boton"><b>INICIAR SESIÓN</b></button></Link>
        <Link to={"/register"}><button class="boton"><b>REGISTRARSE</b></button></Link> 
       </div>
    </div>
    )
}