import { Link } from "react-router-dom"

export default function Login(){
    return(<div className="login">
        <h2>Iniciar sesión</h2>
        <div className="formularioLogin">
            <div className="inputsforms">
                <input placeholder="correo"></input>
                <input placeholder="contraseña"></input>
            </div>
            <Link to={"/register"}><button className="loginRegister">Registrarse</button></Link>
            <Link to={"/dashboard"}><button className="loginEnter">Entrar</button></Link>
        </div>
    </div>)
}