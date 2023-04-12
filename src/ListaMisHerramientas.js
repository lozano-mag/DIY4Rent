import { useState } from "react";
import { Link } from "react-router-dom";

export default function ListaMisHerramientas(props) {

    const [herramientasSinFiltro, setHerramientas] = useState(props.tools);

    const eliminarHerramienta = (id) => {
        fetch(`/api/herramientas/${id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        let herramientasRestantes = herramientasSinFiltro.filter(product => product.id != id);
        setHerramientas(herramientasRestantes);
    }

    let misherramientas = herramientasSinFiltro.filter(product => product.userId == 1);

    return (<div>
        {misherramientas.map((item) => {
            return (<div className="herramientaLista">
                <Link to={`/herramientas/${item.id}`}>
                    <img src={item.foto} height="100px" width='100px'></img>
                    <p>{item.nombre}</p>
                </Link>
                <div className="botonesListaMisHerramientas">
                    <Link to={"/herramienta_edit/" + item.id}><button className="loginEnter">Editar</button></Link>
                    <button className="loginRegister" onClick={() => eliminarHerramienta(item.id)}>Eliminar</button>
                </div>
            </div>)
        })}
    </div>)
}
