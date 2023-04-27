import { Link } from "react-router-dom"
import { useEffect, useState } from "react";

export default function Register() {

  const [fotoUser, setFoto] = useState(null);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState();
  const [correoPaypal, setCorreoPaypal] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [imagenUrl, setImagenUrl] = useState(null);
  const [direccion, setDireccion] = useState("");
  const [carga, setCarga] = useState(false);
  const [posicion, setPosition] = useState([1, 1]);

  const uploadImage = async (archivo) => {
    const formData = new FormData();
    formData.append('file', archivo);

    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.text();
        console.log(data);
        console.log(archivo);
        setImagenUrl(`http://localhost:8080/api/images/${archivo.name}`);
        setFoto(`http://localhost:8080/api/images/${archivo.name}`);
      } else {
        console.log('Error al subir la imagen.');
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function getCoordinates(address) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`);
    const data = await response.json();
    if (data.length === 0) {
      throw new Error('No se encontraron coordenadas para la dirección proporcionada');
    }
    return {
      lat: data[0].lat,
      lon: data[0].lon,
    };
  }

  async function fetchData(dir) {
    try {
      setPosition(await getCoordinates(dir));
    } catch (error) {
      console.log(error);
    }
  }

  const sacaLatyLon = (dir) => {
    setDireccion(dir);
    fetchData(dir);
  }

  const guardarUsuario = () => {

    console.log(posicion)

    const usuario = {
      fotoUser: fotoUser,
      nombre: nombre,
      correo: correo,
      telefono: telefono,
      correoPaypal: correoPaypal,
      direccion: direccion,
      lat: posicion.lat,
      lon: posicion.lon,
      password: pass
    };

    if (nombre == "" | correo == "" | telefono == "" | correoPaypal == "" | direccion == "" | pass == "") {
      alert("Rellena todos los campos")
    } else if (pass != repass) {
      alert('Las contraseñas no coinciden!')
    } else {

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

        window.location.href = '/login';
    }
  };

  return (<div id="registro">
    <h2>Registro</h2>
    <div className="formularioLogin">
      <div className="inputsforms">
        <input placeholder="correo" onChange={e => setCorreo(e.target.value)}></input>
        <input placeholder="nombre" onChange={e => setNombre(e.target.value)}></input>
        <input placeholder="tlf" type="number" onChange={e => setTelefono(e.target.value)}></input>
        <input placeholder="dirección" onChange={e => sacaLatyLon(e.target.value)}></input>
        <input placeholder="correo paypal" onChange={e => setCorreoPaypal(e.target.value)}></input>
        <input type="file" onChange={e => setArchivo(e.target.files[0])}></input>
        <img src={imagenUrl} width="50px" height="50px"></img>
        <button onClick={() => uploadImage(archivo)}>Adjuntar imagen seleccionada</button>
        <input placeholder="contraseña" onChange={e => setPass(e.target.value)} type="password"></input>
        <input placeholder="repetir contraseña" onChange={e => setRepass(e.target.value)} type="password"></input>
      </div>
      <div>
        <button className="registerSignIn" onClick={() => guardarUsuario()}>Registrarse</button>
        <p>¿Ya tienes cuenta?</p>
        <Link to={"/login"}><button className="loginEnter">Login</button></Link>
      </div>
    </div>
  </div>)
}