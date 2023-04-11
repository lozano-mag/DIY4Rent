import { Link } from "react-router-dom"
import ListaAlquiladas from "./ListaAlquiladas"
import ListaMisHerramientas from "./ListaMisHerramientas"
import { useEffect, useState } from "react";

export default function Dashboard(props) {

    let herramientas = props.tools.filter(product => product.userId == 1);
    return (<div id="dashboard">
        <div className="dashboardZona1">
            <img className="profilePhoto" src={props.users[0].fotoUser} width="250px" height="250px"></img>
            <div id="dashboardDatos">
                <h2>{props.users[0].nombre}</h2>
                <Link to={'/edituser/1'}><button className="loginEnter">Editar datos</button></Link>
            </div>
        </div>
        <div id="subirDashboard">
            <Link to={'/herramienta_upload'}><button className="loginSubirDashboard"><b>Subir herramienta</b></button></Link>
        </div>
        <div id="dashboardZona2">
            <p id="tituloDashboardZona2"><b>Herramientas alquiladas:</b></p>
            <ListaAlquiladas users={props.users} tools={props.tools} />
        </div>
        <div id="dashboardZona3">
            <p id="tituloDashboardZona3"><b>Mis herramientas:</b></p>
            <ListaMisHerramientas tools={herramientas} />
        </div>
    </div>)
}