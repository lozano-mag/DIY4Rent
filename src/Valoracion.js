import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function Valoracion(props) {
  let { userId } = useParams();
  let usuarioList = props.users.filter((user) => user.id == userId);
  let user = usuarioList[0];

  const [selectedStar, setSelectedStar] = useState(-1);

  const handleStarClick = (index) => {
    setSelectedStar(index + 1);
  };

  const renderStar = (index) => {
    let imgSrc =
      selectedStar > index ? "/estrellaAmarilla.png" : "/estrellaGris.png";
    return (
      <button onClick={() => handleStarClick(index)}>
        <img src={imgSrc} alt={`Estrella ${index}`} />
      </button>
    );
  };

  const guardarPuntuacion = () => {
    const puntuar = {
      userId: user.id,
      puntuacion: selectedStar,
    };
    fetch("/api/puntuaciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(puntuar),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

      window.location.href='/dashboard';
  };

  const getStars = () => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(renderStar(i));
    }
    return stars;
  };

  return (
    <div>
      <h2>Valorar a {user.nombre}</h2>
      <img src={user.fotoUser} height="100px" width="100px"></img>
      <p> Valore su experiencia:</p>
      {getStars()}
      <button onClick={guardarPuntuacion}>Valorar</button>
    </div>
  );
}