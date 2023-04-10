import { useState } from "react";
import { useParams } from "react-router-dom";

export default function EditarHerramientas(props) {

  let { productId } = useParams();

  let herramientas = props.tools.filter(product => product.id == productId);
  let herramienta = herramientas[0];
  console.log(herramienta)

  const [nombre, setNombre] = useState(herramienta.nombre);
  const [categoria, setCategoria] = useState(herramienta.categoria);
  const [estadoDesgaste, setEstadoDesgaste] = useState(herramienta.estadoDesgaste);
  const [precio, setPrecio] = useState(herramienta.precio);
  const [descripcion, setDescripcion] = useState(herramienta.descripcion);
  const [foto, setFoto] = useState(herramienta.foto);

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
    fetch(`/api/herramientas/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(herramienta)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  return (<div id="editarUsuario">
    <h2>Editar herramienta</h2>
    <div className="formularioEditar">
      <div className="inputsforms">
        <div className="inputEditar">
          <label>Nombre:</label>
          <input placeholder={herramienta.nombre} onChange={e => setNombre(e.target.value)}></input>
        </div>
        <div className="inputEditar">
          <label>Categoría:</label>
          <input placeholder={herramienta.categoria} onChange={e => setCategoria(e.target.value)}></input>
        </div>
        <div className="inputEditar">
          <label>Desgaste:</label>
          <input placeholder={herramienta.estadoDesgaste} onChange={e => setEstadoDesgaste(e.target.value)}></input>
        </div>
        <div className="inputEditar">
          <label>Precio (€/día):</label>
          <input placeholder={herramienta.precio} onChange={e => setPrecio(e.target.value)}></input>
        </div>
        <div className="inputEditar">
          <label>Descripción de la herramienta:</label>
          <input placeholder={herramienta.descripcion} onChange={e => setDescripcion(e.target.value)}></input>
        </div>
        <div className="inputEditar">
          <label>URL de la foto de la herramienta</label>
          <input placeholder={herramienta.foto} onChange={e => setFoto(e.target.value)}></input></div>
        <button className="loginEnter" onClick={() => guardarHerramienta()}>Editar</button>
      </div>
    </div>
  </div>)
}