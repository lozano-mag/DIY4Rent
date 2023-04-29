import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

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
        let usuarioReservado = props.usuarios.filter(usuario => usuario.correo == correoUsuarioReservado);
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
        <label>Correo del alquilado</label>
        <input onChange={e => setUsuarioReservado(e.target.value)}></input>
        <p>Fecha de inicio del alquiler:</p>
        <select onChange={e => setDiaIni(e.target.value)}>
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
        <p>/</p>
        <select onChange={e => setMesIni(e.target.value)}>
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
        <p>/</p>
        <select onChange={e => setAnoIni(e.target.value)}>
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
        </select>
        <p>Fecha de fin del alquiler</p>
        <select onChange={e => setDiaFin(e.target.value)}>
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
        <p>/</p>
        <select onChange={e => setMesFin(e.target.value)}>
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
        <p>/</p>
        <select onChange={e => setAnoFin(e.target.value)}>
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
        </select>
        <button onClick={() => guardarReserva()}>Confirmar alquiler</button>
    </div>)
}