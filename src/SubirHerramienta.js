import { useState } from "react";

export default function SubirHerramienta() {

  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [estadoDesgaste, setEstadoDesgaste] = useState();
  const [precio, setPrecio] = useState();
  const [descripcion, setDescripcion] = useState("");
  const [foto, setFoto] = useState("");

  const guardarHerramienta = () => {
    const herramienta = {
      nombre: nombre,
      categoria: categoria,
      estadoDesgaste: estadoDesgaste,
      userId: 1,
      precio: precio,
      descripcion: descripcion,
      foto: foto
    }
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
  }

  return (<div id="registro">
    <h2>Nueva herramienta</h2>
    <div className="formularioLogin">
      <div className="inputsforms">
        <input placeholder="Nombre de la herramienta" onChange={e => setNombre(e.target.value)}></input>
        <input placeholder="Categoría de la herramienta" onChange={e => setCategoria(e.target.value)}></input>
        <input placeholder="Estado de desgaste (1 a 3)" onChange={e => setEstadoDesgaste(e.target.value)}></input>
        <input placeholder="precio de alquiler /día" onChange={e => setPrecio(e.target.value)}></input>
        <input placeholder="descripción del producto" onChange={e => setDescripcion(e.target.value)}></input>
        <input placeholder="enlace a la foto del producto" onChange={e => setFoto(e.target.value)}></input>
      </div>
      <button className="loginEnter" onClick={() => guardarHerramienta()}>Subir</button>
    </div>
  </div>)
}