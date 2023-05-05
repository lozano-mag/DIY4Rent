import { useParams } from "react-router-dom";
import moment from "moment/moment";

export default function ConfirmarYPagar(props) {

    let { reservaId } = useParams();

    let reservaList = props.reservas.filter(reserva => reserva.id == reservaId);
    let reserva = reservaList[0];

    let herramientaList = props.tools.filter(herramienta => herramienta.id == reserva.herramientaId);
    let herramienta = herramientaList[0];

    const fecha1 = moment(`${reserva.anoIni}-${reserva.mesIni}-${reserva.diaIni}`);
    const fecha2 = moment(`${reserva.anoFin}-${reserva.mesFin}-${reserva.diaFin}`);

    let diasEntreFechas = fecha2.diff(fecha1, 'days');

    let precio = herramienta.precio * diasEntreFechas;

    const marcarPagado = (id) => {
        console.log(id)
        const reserva = {
            isPagado: true
        }
        fetch(`/api/pagarreservas/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reserva)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));

            window.location.href = "/dashboard";
    }

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

    return (<div>
        <h2>Confirmar reserva de: {herramienta.nombre}</h2>
        <img src={herramienta.foto} height="200px" width="200px"></img>
        <p>Periodo de alquiler: <b>{reserva.diaIni}/{reserva.mesIni}/{reserva.anoIni} - {reserva.diaFin}/{reserva.mesFin}/{reserva.anoFin}</b></p>
        <p>Total a pagar: <b>{precio}€</b> ({herramienta.precio}€/día durante {diasEntreFechas} días)</p>
        <button onClick={() => marcarPagado(reserva.id)}>Pagar</button>
        <button onClick={() => eliminarReserva(reserva.id)}>Eliminar</button>
    </div>)
}