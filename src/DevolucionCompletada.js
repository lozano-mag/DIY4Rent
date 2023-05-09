import { useParams } from "react-router-dom";
import { useState } from "react";

import { useEffect } from "react";
export default function DevolucionCompletada(props) {
    useEffect(
        () => {
            const token = localStorage.getItem("token");
            if (!token) {

                window.location.href = "/login";
            }

        }, []

    )

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
                <ul key={index} onClick={() => handleClick(reserva.id, index)}>
                    <ol style={style}>
                        <p>Correo del usuario: {correoAlquilado}</p>
                        <p>Periodo de la reserva: {`${reserva.diaIni}/${reserva.mesIni}/${reserva.anoIni} - ${reserva.diaFin}/${reserva.mesFin}/${reserva.anoFin}`}</p>
                    </ol>
                </ul>)
        })}
        <button id="botonconfirmarDevolucion" onClick={() => eliminarReserva(reservaSeleccionada)}>Confirmar</button>
    </div>)
}
