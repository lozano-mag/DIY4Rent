import { Link } from "react-router-dom"
import LoginMethod from './services/UserService'
import { useState } from "react"


export default function Login(){

    // check if logged in or not
    const token = localStorage.getItem("token");

    if (token) {

        window.location.href = "/dashboard";
    }


    // use state for correo and pass
    const [correo, setCorreo] = useState("");

    const [password,setPassword]=useState("");



    const loginhandler=()=>{

        LoginMethod(

            correo,password
        )
    }

    return(<div className="login">
        <h2>Iniciar sesión</h2>
        <div className="formularioLogin">
            <div className="inputsforms">
                <input placeholder="correo" value={correo} onChange={
                    (e)=>{
                        setCorreo(e.target.value)
                    }

                }></input>
                <input placeholder="contraseña" type="password"
                onChange={
                    (e)=>{
                        setPassword(e.target.value)
                    }

                }></input>
            </div>
            <Link to={"/register"}><button className="loginRegister">Registrarse</button></Link>
         <button className="loginEnter" onClick={loginhandler}>Entrar</button>
        </div>
    </div>)
}
