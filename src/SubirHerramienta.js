import { useState } from "react";

import { useEffect } from "react";
export default function SubirHerramienta() {
  useEffect(
    () => {
      const token = localStorage.getItem("token");
      if (!token) {

          window.location.href = "/login";
      }

    }, []

)
const idLog = localStorage.getItem("idLog");

  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [estadoDesgaste, setEstadoDesgaste] = useState(1);
  const [precio, setPrecio] = useState();
  const [descripcion, setDescripcion] = useState("");
  const [foto, setFoto] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [imagenUrl, setImagenUrl] = useState(null);

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

  const guardarHerramienta = () => {
    const herramienta = {
      nombre: nombre,
      categoria: categoria,
      estadoDesgaste: estadoDesgaste,
      userId: idLog,
      precio: precio,
      descripcion: descripcion,
      foto: foto
    }

    if (nombre == "" | categoria == "" | precio == "" | descripcion == "" | foto == "") {
      alert("Rellena todos los campos")
    } else {
      fetch("/api/herramientas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(herramienta)
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

      window.location.href = '/dashboard';
    }
  }

  return (<div id="registro">
    <h2>Nueva herramienta</h2>
    <div className="formularioLogin">
      <div className="inputsforms">
        <input placeholder="Nombre de la herramienta" onChange={e => setNombre(e.target.value)}></input>
        <input placeholder="Categoría de la herramienta" onChange={e => setCategoria(e.target.value)}></input>
        <div className="SelectorEditar">
          <label>Estado de desgaste:</label>
          <select onChange={e => setEstadoDesgaste(e.target.value)}>
            <option value={1}>Excelente</option>
            <option value={2}>Bueno</option>
            <option value={3}>Regular</option>
          </select>
        </div>
        <input placeholder="precio de alquiler /día" type="number" onChange={e => setPrecio(e.target.value)}></input>
        <input placeholder="descripción del producto" onChange={e => setDescripcion(e.target.value)}></input>
        <input type="file" onChange={e => setArchivo(e.target.files[0])}></input>
        <img src={imagenUrl} width="50px" height="50px"></img>
        <button onClick={() => uploadImage(archivo)}>Adjuntar imagen seleccionada</button>
      </div>
      <button className="loginEnter" onClick={() => guardarHerramienta()}>Subir</button>
    </div>
  </div>)
}
