import { Link } from "react-router-dom"
import { useState } from "react";

export default function Register() {

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState();
  const [correoPaypal, setCorreoPaypal] = useState("");
  const [direccion, setDireccion] = useState();
  const [pass, setPass] = useState("");

  const guardarUsuario = () => {
    const usuario = {
      nombre: nombre,
      correo: correo,
      telefono: telefono,
      correoPaypal: correoPaypal,
      direccion: direccion,
      password: pass
    };

    fetch("/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  return (<div id="registro">
    <h2>Registro</h2>
    <div className="formularioLogin">
      <div className="inputsforms">
        <input placeholder="correo" onChange={e => setCorreo(e.target.value)}></input>
        <input placeholder="nombre" onChange={e => setNombre(e.target.value)}></input>
        <input placeholder="tlf" onChange={e => setTelefono(e.target.value)}></input>
        <input placeholder="dirección" onChange={e => setDireccion(e.target.value)}></input>
        <input placeholder="correo paypal" onChange={e => setCorreoPaypal(e.target.value)}></input>
        <input placeholder="contraseña" onChange={e => setPass(e.target.value)}></input>
        <input placeholder="repetir contraseña"></input>
      </div>
      <div>
        <button className="registerSignIn" onClick={() => guardarUsuario()}>Registrarse</button>
        <p>¿Ya tienes cuenta?</p>
        <Link to={"/login"}><button className="loginEnter">Login</button></Link>
      </div>
    </div>
  </div>)
}