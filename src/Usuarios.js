export default function Usuarios(props){


    const guardarUsuario = () => {
        const usuario = {
          nombre: "EJEMPLO",
          correo: "EJEMPLO",
          telefono: 12345,
          correoPaypal: "EJEMPLO@",
          direccion: "c/EJEMPLO"
        };

        fetch("/api/usuarios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(usuario)
        })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error));
      };

    return(<div>
        <ul>
            {props.users.map((item) => {
                return(
                    <p>{item.nombre}</p>
                )
            })}
        </ul>
        <button onClick={() => guardarUsuario()}>AÑAdir</button>
    </div>)
}
