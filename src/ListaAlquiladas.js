import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function ListaAlquiladas(props) {

    const idLog = localStorage.getItem("idLog");

    let herramientasSinFiltro = props.tools;
    let reservasSinFiltro = props.reservas;
    let usuarios = props.usuarios;


    const fechaActual = new Date();
    let diaActual = fechaActual.getDate();
    let mesActual = fechaActual.getMonth() + 1;
    let anoActual = fechaActual.getFullYear();

    let misReservas = reservasSinFiltro.filter(reserva => reserva.usuarioReservado == idLog);

    let misReservasPorPagar = misReservas.filter(reserva => reserva.isPagado == false);

    let misReservasActuales = misReservas.filter(reserva => {
        if (reserva.isPagado == true && reserva.isValorado == false) {
            if (anoActual > reserva.anoIni) {
                return reserva;
            } else if (anoActual == reserva.anoIni && mesActual > reserva.mesIni) {
                return reserva;
            } else if (anoActual == reserva.anoIni && mesActual == reserva.mesIni && diaActual >= reserva.diaIni) {
                return reserva;
            }
        }
    });

    let misReservasActualesValoradas = misReservas.filter(reserva => {
        if (reserva.isPagado == true && reserva.isValorado == true) {
            if (anoActual > reserva.anoIni) {
                return reserva;
            } else if (anoActual == reserva.anoIni && mesActual > reserva.mesIni) {
                return reserva;
            } else if (anoActual == reserva.anoIni && mesActual == reserva.mesIni && diaActual >= reserva.diaIni) {
                return reserva;
            }
        }
    });

    let misReservasFuturas = misReservas.filter(reserva => {
        if (reserva.isPagado == true) {
            if (anoActual < reserva.anoIni) {
                return reserva;
            } else if (anoActual == reserva.anoIni && mesActual < reserva.mesIni) {
                return reserva;
            } else if (anoActual == reserva.anoIni && mesActual == reserva.mesIni && diaActual < reserva.diaIni) {
                return reserva;
            }
        }
    });

    const marcarValorado = (id) => {
        console.log(id)
        const reserva = {
            isValorado: true
        }
        fetch(`/api/valorarreservas/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reserva)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }

    return (<div>
        <p><b>Por confirmar y pagar</b></p>
        {misReservasPorPagar.map((item => {
            let herramientaList = herramientasSinFiltro.filter(herramienta => herramienta.id == item.herramientaId);
            let herramienta = herramientaList[0];
            let propietario = usuarios.filter(usuario => usuario.id == herramienta.userId);
            return (<div>
                <p>{herramienta.nombre}</p>
                <p>de {propietario[0].nombre}</p>
                <p>Fecha de alquiler: {item.diaIni}/{item.mesIni}/{item.anoIni} - {item.diaFin}/{item.mesFin}/{item.anoFin}</p>
                <Link to={`/confirmarypagar/${item.id}`}><button>Confirmar y pagar</button></Link>
            </div>)

        }))}
        <p><b>Actualmente en préstamo</b></p>
        {misReservasActuales.map((item) => {
            let herramientaList = herramientasSinFiltro.filter(herramienta => herramienta.id == item.herramientaId);
            let herramienta = herramientaList[0];
            let propietario = usuarios.filter(usuario => usuario.id == herramienta.userId);
            let idValorar = item.id;
            return (<div>
                <p>{herramienta.nombre}</p>
                <p>de {propietario[0].nombre}</p>
                <Link onClick={() => marcarValorado(idValorar)} to={`/valoracion/${propietario[0].id}`}><button>Valorar</button></Link>
            </div>
            )
        })}
        {misReservasActualesValoradas.map((item) => {
            let herramientaList = herramientasSinFiltro.filter(herramienta => herramienta.id == item.herramientaId);
            let herramienta = herramientaList[0];
            let propietario = usuarios.filter(usuario => usuario.id == herramienta.userId);
            return (<div>
                <p>{herramienta.nombre}</p>
                <p>de {propietario[0].nombre}</p>
            </div>
            )
        })}
        <p><b>Futuros préstamos</b></p>
        {misReservasFuturas.map((item) => {
            let herramientaList = herramientasSinFiltro.filter(herramienta => herramienta.id == item.herramientaId);
            let herramienta = herramientaList[0];
            let propietario = usuarios.filter(usuario => usuario.id == herramienta.userId);
            return (<div>
                <p>{herramienta.nombre}</p>
                <p>de {propietario[0].nombre}</p>
            </div>)
        })}
    </div>)
}

