import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import moment from "moment";

export default function Alquilar(props) {

    const [diaIni, setDiaIni] = useState(1);
    const [mesIni, setMesIni] = useState(1);
    const [anoIni, setAnoIni] = useState(2023);
    const [diaFin, setDiaFin] = useState(1);
    const [mesFin, setMesFin] = useState(1);
    const [anoFin, setAnoFin] = useState(2023);
    const [correoUsuarioReservado, setUsuarioReservado] = useState(null);

    let { herramientaId } = useParams();
    let herramientas = props.tools.filter(tool => tool.id == herramientaId);
    let herramienta = herramientas[0];

    const guardarReserva = () => {
        let stringFechaIni = `${anoIni}-${mesIni}-${diaIni}`;
        let stringFechaFin = `${anoFin}-${mesFin}-${diaFin}`;
        const fechaSeleccionadaIniObjeto = moment(stringFechaIni);
        const fechaSeleccionadaFinObjeto = moment(stringFechaFin);
        let usuarioReservado = props.usuarios.filter(usuario => usuario.correo == correoUsuarioReservado);
        let reservasHerramienta = props.reservas.filter(reserva => reserva.herramientaId == herramientaId);
        reservasHerramienta.map((reserva) => {
            const stringFechaInicio = `${reserva.anoIni}-${reserva.mesIni}-${reserva.diaIni}`;
            const stringFechaFin = `${reserva.anoFin}-${reserva.mesFin}-${reserva.diaFin}`;
            const fechaInicioObjeto = moment(stringFechaInicio);
            const fechaFinObjeto = moment(stringFechaFin);
            if (fechaSeleccionadaIniObjeto.isSameOrAfter(fechaInicioObjeto) &&
                fechaSeleccionadaIniObjeto.isBefore(fechaFinObjeto) &&
                fechaSeleccionadaFinObjeto.isAfter(fechaInicioObjeto)) {
                return alert("Fecha usada");
            }
        })
        if (usuarioReservado.length == 0){
            return(
                alert("Escribe un correo válido")
            )
        }
        let idUsuarioReservado = usuarioReservado[0].id;

        const reserva = {
            herramientaId: herramientaId,
            usuarioReservado: idUsuarioReservado,
            diaIni: diaIni,
            mesIni: mesIni,
            anoIni: anoIni,
            diaFin: diaFin,
            mesFin: mesFin,
            anoFin: anoFin
        }
        fetch("/api/reservas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reserva)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        window.location.href = '/dashboard';
    }


    return (<div>
        <h2>Alquilar {herramienta.nombre}</h2>
        <img height="200px" width="200px" src={herramienta.foto}></img>
        <div class="correoAlquilado">
        <label>Correo del alquilado</label>
        </div>
        <input className="filtroPrecio" onChange={e => setUsuarioReservado(e.target.value)}></input>
        <p>Fecha de inicio del alquiler:</p>
        <select className="botonDisponibilidadFecha" onChange={e => setDiaIni(e.target.value)}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
            <option>21</option>
            <option>22</option>
            <option>23</option>
            <option>24</option>
            <option>25</option>
            <option>27</option>
            <option>28</option>
            <option>29</option>
            <option>30</option>
            <option>31</option>
        </select>

        <select className="botonDisponibilidadFecha" onChange={e => setMesIni(e.target.value)}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
        </select>
       
        <select className="botonDisponibilidadFecha" onChange={e => setAnoIni(e.target.value)}>
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
        </select>
        <p>Fecha de fin del alquiler</p>
        <select className="botonDisponibilidadFecha" onChange={e => setDiaFin(e.target.value)}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
            <option>21</option>
            <option>22</option>
            <option>23</option>
            <option>24</option>
            <option>25</option>
            <option>27</option>
            <option>28</option>
            <option>29</option>
            <option>30</option>
            <option>31</option>
        </select>
        
        <select className="botonDisponibilidadFecha" onChange={e => setMesFin(e.target.value)}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
        </select>
        
        <select className="botonDisponibilidadFecha" onChange={e => setAnoFin(e.target.value)}>
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
        </select>
        <div class="ButtonConfirmarAlquiler">
        <button id="BotonConfirmarAlquiler" onClick={() => guardarReserva()}>Confirmar alquiler</button>
        </div>
    </div>)
}