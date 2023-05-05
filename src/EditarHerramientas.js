import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function EditarHerramientas(props) {
  useEffect(
    () => {
      const token = localStorage.getItem("token");
      if (!token) {

          window.location.href = "/login";
      }

    }, []

)

const idLog = localStorage.getItem("idLog");

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
    window.location.href = '/dashboard';
  }

  return (<div id="editarUsuario">
    <h2>Editar herramienta</h2>
    <div className="formularioEditar">
      <div className="inputsforms">
        <div className="inputEditar">
          <label>Nombre:</label>
          <input placeholder={herramienta.nombre} onChange={e => setNombre(e.target.value)}></input>
        </div>
        <div className="SelectorEditar">
          <label>Categoría:</label>
          <select onChange={e => setCategoria(e.target.value)}>
            <option>Sierra</option>
            <option>Pelacables</option>
            <option>Taladro</option>
            <option>Silicona</option>
            <option>Engalletadora</option>
            <option>Medición</option>
            <option>Corte</option>
            <option>Sujección</option>
            <option>Seguridad</option>
            <option>Acabados</option>
          </select>
        </div>
        <div className="SelectorEditar">
          <label>Estado de desgaste:</label>
          <select onChange={e => setEstadoDesgaste(e.target.value)}>
            <option value={1}>Excelente</option>
            <option value={2}>Bueno</option>
            <option value={3}>Regular</option>
          </select>
        </div>
        <div className="inputEditar">
          <label>Precio (€/día):</label>
          <input placeholder={herramienta.precio} onChange={e => setPrecio(e.target.value)}></input>
        </div>
        <div className="inputEditar">
          <label>Descripción de la herramienta:</label>
          <input placeholder={herramienta.descripcion} onChange={e => setDescripcion(e.target.value)}></input>
        </div>
        <div className="SelectorEditar">
          <input type="file" onChange={e => setArchivo(e.target.files[0])}></input>
          <img src={imagenUrl} width="50px" height="50px"></img>
          <button onClick={() => uploadImage(archivo)}>Adjuntar imagen seleccionada</button>
        </div>
        <button className="loginEnter" onClick={() => guardarHerramienta()}>Editar</button>
      </div>
    </div>
  </div>)
}
