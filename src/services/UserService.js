import axios from 'axios';

const LoginMethod=(
  correo,
  password

)=>{


  // use axios to call backend api
  axios.post('http://localhost:8080/login', {
    correo: correo,
    password: password
  })
  .then(function (response) {
    console.log(response.data.data.token);
    localStorage.setItem("token",response.data.data.token);
    window.location.href = "/dashboard";

  }
  )
  .catch(function (error) {
    console.log(error);
    alert("Usuario o contraseña incorrectos");
  }
  );



}


export default LoginMethod;
