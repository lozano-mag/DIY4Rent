import { useParams } from "react-router-dom";
import { useState } from "react";

export default function EditUser(props){

    let {userId} =  useParams();
    let usuarioList = props.users.filter(user => user.id == userId);
    let user = usuarioList[0];



    const [nombre, setNombre] = useState(user.nombre);
    const [correo, setCorreo] = useState(user.correo);
    const [telefono, setTelefono] = useState(user.telefono);
    const [correoPaypal, setCorreoPaypal] = useState(user.correoPaypal);
    const [direccion, setDireccion] = useState(user.direccion); 
    const [pass, setPass] = useState(user.password);
    

    const guardarUsuario = () => {
        const usuario = {
          nombre: nombre,
          correo: correo,
          telefono: telefono,
          correoPaypal: correoPaypal,
          direccion: direccion,
          password: pass
        };
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

      };

    return(<div>
        <h2>Editar Usuario</h2>
        <div>
            <div className="inputsforms">
                <input placeholder={correo} onChange={e => setCorreo(e.target.value)}></input>
                <input placeholder={nombre} onChange={e => setNombre(e.target.value)}></input>
                <input placeholder={telefono} onChange={e => setTelefono(e.target.value)}></input>
                <input placeholder={direccion} onChange={e => setDireccion(e.target.value)}></input>
                <input placeholder={correoPaypal} onChange={e => setCorreoPaypal(e.target.value)}></input>
                <input placeholder={pass} onChange={e => setPass(e.target.value)}></input>
                <input placeholder="repetir contraseña"></input>
            </div>
            <button onClick={() => guardarUsuario()}>Editar</button>
        </div>
    </div>)
}