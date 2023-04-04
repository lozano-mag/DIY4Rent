import { Link } from "react-router-dom"

export default function Login(){
    return(<div>
        <h2>Iniciar sesión</h2>
        <div>
            <div className="inputsforms">
                <input placeholder="correo"></input>
                <input placeholder="contraseña"></input>
            </div>
            <Link to={"/register"}><button>Registrarse</button></Link>
            <button>Entrar</button>
        </div>
    </div>)
}