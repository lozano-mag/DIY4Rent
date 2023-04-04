import { Link } from "react-router-dom"

export default function Register(){
    return(<div>
        <h2>Registro</h2>
        <div>
            <div className="inputsforms">
                <input placeholder="correo"></input>
                <input placeholder="nombre"></input>
                <input placeholder="tlf"></input>
                <input placeholder="dirección"></input>
                <input placeholder="correo paypal"></input>
                <input placeholder="contraseña"></input>
                <input placeholder="repetir contraseña"></input>
            </div>
            <button>Registrarse</button>
            <Link to={"/login"}><p>volver</p></Link>
        </div>
    </div>)
}