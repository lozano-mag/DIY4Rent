import { useParams } from "react-router-dom";
import { useState } from "react";

export default function DevolucionCompletada(props) {

    let { herramientaId } = useParams();
    let herramientas = props.tools.filter(tool => tool.id == herramientaId);
    let herramienta = herramientas[0];

    const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
    const [reservaActiva, setReservaActiva] = useState(null);


    let listaReservas = props.reservas.filter(reserva => reserva.herramientaId == herramientaId);

    const eliminarReserva = (id) => {
        fetch(`/api/reservas/${id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));

        window.location.href = '/dashboard';
    }

    const handleClick = (idReserva, index) => {
        setReservaSeleccionada(idReserva);
        setReservaActiva(index);
    }

    return (<div>
        <h2>Confirmar devolución de {herramienta.nombre}</h2>
        <img height="200px" width="200px" src={herramienta.foto}></img>
        <p><b>Lista de alquileres:</b></p>
        {listaReservas.map((reserva, index) => {
            let alquiladoList = props.users.filter(usuario => usuario.id == reserva.usuarioReservado);
            let correoAlquilado = alquiladoList[0].correo;
            const style = index === reservaActiva ? { border: '2px solid red' } : {};
            return (
                <li key={index} onClick={() => handleClick(reserva.id, index)}>
                    <ul style={style}>
                        <p>{correoAlquilado}</p>
                        <p>{reserva.diaIni}</p>
                        <p>/</p>
                        <p>{reserva.mesIni}</p>
                        <p>/</p>
                        <p>{reserva.anoIni}</p>
                        <p>-</p>
                        <p>{reserva.diaFin}</p>
                        <p>/</p>
                        <p>{reserva.mesFin}</p>
                        <p>/</p>
                        <p>{reserva.anoFin}</p>
                    </ul>
                </li>)
        })}
        <button onClick={() => eliminarReserva(reservaSeleccionada)}>Confirmar</button>
    </div>)
}