import { Link } from "react-router-dom"
import { useState } from "react"
import axios from 'axios';


export default function Login(props) {

    // check if logged in or not
    const token = localStorage.getItem("token");

    if (token) {

        //window.location.href = "/dashboard";
        console.log(token);
    }


    // use state for correo and pass
    const [correo, setCorreo] = useState("");

    const [password, setPassword] = useState("");

    const LoginMethod = (correo, password) => {

        let usuarioLogeado;
        // use axios to call backend api
        axios.post('http://localhost:8080/login', {
            correo: correo,
            password: password
        })
            .then(function (response) {
                console.log(response.config.data);
                let cadenaJson = response.config.data;
                let usuarioLogeado = JSON.parse(cadenaJson);
                console.log(usuarioLogeado);
                let idLogeado = props.users.filter(user => user.correo == usuarioLogeado.correo);
                localStorage.setItem("idLog", idLogeado[0].id);
                localStorage.setItem("token", response.data.data.token);
                const idChupado = localStorage.getItem("idLog");
                console.log(idChupado);
                window.location.href = "/dashboard";
            }
            )
            .catch(function (error) {
                console.log(error);
                alert("Usuario o contraseña incorrectos");
            }
            );
    }

    const loginhandler = () => {

        LoginMethod(correo, password)

    }

    return (<div className="login">
        <h2>Iniciar sesión</h2>
        <div className="formularioLogin">
            <div className="inputsforms">
                <input placeholder="correo" value={correo} onChange={
                    (e) => {
                        setCorreo(e.target.value)
                    }

                }></input>
                <input placeholder="contraseña" type="password"
                    onChange={
                        (e) => {
                            setPassword(e.target.value)
                        }

                    }></input>
            </div>
            <Link to={"/register"}><button className="loginRegister">Registrarse</button></Link>
            <button className="loginEnter" onClick={loginhandler}>Entrar</button>
        </div>
    </div>)
}
