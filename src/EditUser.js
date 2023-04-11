import { useParams } from "react-router-dom";
import { useState } from "react";

export default function EditUser(props) {

  let { userId } = useParams();
  let usuarioList = props.users.filter(user => user.id == userId);
  let user = usuarioList[0];



  const [nombre, setNombre] = useState(user.nombre);
  const [correo, setCorreo] = useState(user.correo);
  const [telefono, setTelefono] = useState(user.telefono);
  const [correoPaypal, setCorreoPaypal] = useState(user.correoPaypal);
  const [direccion, setDireccion] = useState(user.direccion);
  const [pass, setPass] = useState(user.password);
  const [repass, setRepass] = useState("");


  const guardarUsuario = () => {
    const usuario = {
      nombre: nombre,
      correo: correo,
      telefono: telefono,
      correoPaypal: correoPaypal,
      direccion: direccion,
      password: pass
    };

    if (pass != repass) {
      alert('Las contraseñas no coinciden!')
    } else {

      fetch(`/api/usuarios/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

      window.location.href = '/dashboard';
    }

  };

  return (<div id="editarUsuario">
    <h2>Editar Usuario</h2>
    <div className="formularioEditar">
      <div className="inputsforms">
        <div className="inputEditar">
          <label>Correo:</label>
          <input placeholder={correo} onChange={e => setCorreo(e.target.value)}></input>
        </div>
        <div className="inputEditar">
          <label>Nombre de usuario:</label>
          <input placeholder={nombre} onChange={e => setNombre(e.target.value)}></input>
        </div>
        <div className="inputEditar">
          <label>Número de teléfono:</label>
          <input placeholder={telefono} onChange={e => setTelefono(e.target.value)}></input>
        </div>
        <div className="inputEditar">
          <label>Dirección postal:</label>
          <input placeholder={direccion} onChange={e => setDireccion(e.target.value)}></input>
        </div>
        <div className="inputEditar">
          <label>Correo de paypal</label>
          <input placeholder={correoPaypal} onChange={e => setCorreoPaypal(e.target.value)}></input>
        </div>
        <div className="inputEditar">
          <label>Contraseña:</label>
          <input placeholder="Contraseña" onChange={e => setPass(e.target.value)} type="password"></input>
        </div>
        <div className="inputEditar">
          <label>Repetir contraseña:</label>
          <input placeholder="Repetir contraseña" onChange={e => setRepass(e.target.value)} type="password"></input>
        </div>
      </div>
      <button className="loginEnter" onClick={() => guardarUsuario()}>Editar</button>
    </div>

  </div>)
}