import { Link } from "react-router-dom"

export default function ListaAlquiladas(props) {
    return(<div>
        <p>Nada por aquí ¡Comienza a alquilar!</p>
        <Link to={`/valoracion/${0}`}><button>Finalizar</button></Link> 
    </div>)
}
