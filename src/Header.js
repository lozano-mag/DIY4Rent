import { Link } from "react-router-dom"
export default function Header(){

    // check if token exist on localstorage
    const token = localStorage.getItem("token");


    // logout handler
    const logoutHandler = () => {

        // remove token from localstorage
        localStorage.removeItem("token");

        // redirect to login
        window.location.href = "/login";
    };


    const navegaPrincipal = () => {
        window.location.href = '/';
    };
    return(<div id="header">
       <img id="logotipo" src="logo.jpg" onClick={() => navegaPrincipal()}/>
       <div id="botonesInicio">
        {token ?
       <button class="boton" onClick={
logoutHandler
       }><b>cerrar sesión</b></button>
        :
<>
<Link to={"/login"}><button class="boton"><b>INICIAR SESIÓN</b></button></Link>
<Link to={"/register"}><button class="boton"><b>REGISTRARSE</b></button></Link>
</>
        }

       </div>
    </div>
    )
}
