import { useState } from "react";
import { Link } from "react-router-dom";


export default function ListaMisHerramientas(props) {
    console.log(props.tools);
    const [herramientas, setHerramientas] = useState(props.tools);
    const eliminarHerramienta = (id) => {

        let hayReservas = props.reservas.filter(reserva => reserva.herramientaId == id);
        console.log(hayReservas)
        if (hayReservas.length == 0) {
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
            let herramientasRestantes = herramientas.filter(product => product.id != id);
            setHerramientas(herramientasRestantes);
        } else {
            alert("No se pueden borrar herramientas que tienes reservadas!");
        }
    }

    return (<div>
        {herramientas.map((item) => {

            return (<div className="herramientaLista">
                <Link to={`/herramientas/${item.id}`}>
                    <img src={item.foto} height="100px" width='100px'></img>
                    <p>{item.nombre}</p>
                </Link>
                <div className="botonesListaMisHerramientas">
                    <Link to={"/herramienta_edit/" + item.id}><button className="loginEnter">Editar</button></Link>
                    <button className="loginRegister" onClick={() => eliminarHerramienta(item.id)}>Eliminar</button>
                    <Link to={`/alquilar/${item.id}`}><button className="loginEnter">Alquilar</button></Link>
                    <Link to={`/devolver/${item.id}`}><button className="loginRegister">Confirmar Devolución</button></Link>
                </div>
            </div>)
        })}
    </div>)
}
