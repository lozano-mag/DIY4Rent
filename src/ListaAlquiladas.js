import { useState } from "react";
import { Link } from "react-router-dom";

export default function ListaAlquiladas(props) {

    let listaSinValorar = [];

    let herramientasSinFiltro = props.tools;
    let reservasSinFiltro = props.reservas;
    let usuarios = props.usuarios;

    const fechaActual = new Date();
    let diaActual = fechaActual.getDate();
    let mesActual = fechaActual.getMonth() + 1;
    let anoActual = fechaActual.getFullYear();
    let misReservas = reservasSinFiltro.filter(reserva => reserva.usuarioReservado == 1);
    let idsHerramientasActuales = misReservas.map(reserva => {
        if (reserva.isValorado == false) {
            if (anoActual > reserva.anoIni) {
                listaSinValorar.push(reserva.id);
                return reserva.herramientaId;
            } else if (anoActual == reserva.anoIni && mesActual > reserva.mesIni) {
                listaSinValorar.push(reserva.id);
                return reserva.herramientaId
            } else if (anoActual == reserva.anoIni && mesActual == reserva.mesIni && diaActual >= reserva.diaIni) {
                listaSinValorar.push(reserva.id);
                return reserva.herramientaId
            }
        }
    });
    console.log(idsHerramientasActuales);
    let idsHerramientasActualesValoradas = misReservas.map(reserva => {
        if (reserva.isValorado == true) {
            if (anoActual > reserva.anoIni) {
                return reserva.herramientaId;
            } else if (anoActual == reserva.anoIni && mesActual > reserva.mesIni) {
                return reserva.herramientaId
            } else if (anoActual == reserva.anoIni && mesActual == reserva.mesIni && diaActual >= reserva.diaIni) {
                return reserva.herramientaId
            }
        }
    });

    let idsHerramientasFuturas = misReservas.map(reserva => {
        if (anoActual < reserva.anoIni) {
            return reserva.herramientaId
        } else if (anoActual == reserva.anoIni && mesActual < reserva.mesIni) {
            return reserva.herramientaId
        } else if (anoActual == reserva.anoIni && mesActual == reserva.mesIni && diaActual < reserva.diaIni) {
            return reserva.herramientaId
        }
    })

    let misHerramientasActuales = herramientasSinFiltro.filter(herramienta => idsHerramientasActuales.includes(herramienta.id));
    let misHerramientasActualesValoradas = herramientasSinFiltro.filter(herramienta => idsHerramientasActualesValoradas.includes(herramienta.id));
    let misHerramientasfuturas = herramientasSinFiltro.filter(herramienta => idsHerramientasFuturas.includes(herramienta.id));
    
    let n = listaSinValorar.length - 1;
    console.log(n)
    const marcarValorado = (id) => {
        console.log(id)
        const reserva = {
            isValorado: true
        }
        fetch(`/api/reservas/${id}`, {
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
        <p><b>Actualmente en préstamo</b></p>
        {misHerramientasActuales.map((item) => {
            let propietario = usuarios.filter(usuario => usuario.id == item.userId);
            let idValorar = listaSinValorar[n];
            n--;
            return (<div>
                <p>{item.nombre}</p>
                <p>de {propietario[0].nombre}</p>
                <Link onClick={() => marcarValorado(idValorar)} to={`/valoracion/${propietario[0].id}`}><button>Valorar</button></Link>
            </div>
            )
        })}
        {misHerramientasActualesValoradas.map((item) => {
            let propietario = usuarios.filter(usuario => usuario.id == item.userId);
            return (<div>
                <p>{item.nombre}</p>
                <p>de {propietario[0].nombre}</p>
            </div>
            )
        })}
        <p><b>Futuros préstamos</b></p>
        {misHerramientasfuturas.map((item) => {
            let propietario = usuarios.filter(usuario => usuario.id == item.userId);
            return (<div>
                <p>{item.nombre}</p>
                <p>de {propietario[0].nombre}</p>
            </div>)
        })}
    </div>)
}