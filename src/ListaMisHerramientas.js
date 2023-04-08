import { useState } from "react";
import { Link } from "react-router-dom";

export default function ListaMisHerramientas(props){

    const [herramientasSinFiltro, setHerramientas] = useState(props.tools);

    const eliminarHerramienta = (id) => {
        fetch(`/api/herramientas/${id}`, {
            method: "DELETE",
          })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        fetch('/api/herramientas')
            .then(response => response.json())
            .then(data => setHerramientas(data));
    }
    
    let misherramientas = herramientasSinFiltro.filter(product=>product.userId==1);

    return(<div>
        {misherramientas.map((item) => {
            return(<div className="herramientaLista">
                <img src={item.foto} height="100px" width='100px'></img>
                <p>{item.nombre}</p>
                <Link to={"/herramienta_edit/" + item.id}><button>Editar</button></Link>
                <button onClick={() => eliminarHerramienta(item.id)}>Eliminar</button>
            </div>)
        })}
    </div>)
}