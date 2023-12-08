<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Profesor</router-link> |
      <router-link to="/logines">Estudiante</router-link> |
    </nav>
    <h1>Bienvenido al Sistema de Tutorías de Titulación Uleam</h1>
    <h3>Escoja el Rol que le pertenece para iniciar sesión o registrarte</h3>
    <h4>Ingrese para asignar sus tutorías o ver sus tutorías</h4>
    <div class="title-cards">
      <h2>Plataformas</h2>
    </div>
    <div class="container-card">
      <div class="card">
        <figure>
          <img src="~@/images/Aulav.png">
        </figure>
        <div class="contenido-card">
          <h3>Aula Virtual</h3>
          <p>Clic aqui para ingresar en Aula virtual.</p>
          <a href="https://aulavirtual.uleam.edu.ec/">Ir al sitio</a>
        </div>
      </div>
      <div class="card">
        <figure>
          <img src="~@/images/Moodle.png">
        </figure>
        <div class="contenido-card">
          <h3>Moodle Uleam</h3>
          <p>Clic aqui para ingresar a Moodle Uleam.</p>
          <a href="https://aulavirtualmoodle.uleam.edu.ec/">Ir al sitio</a>
        </div>
      </div>
      <div class="card">
        <figure>
          <img src="~@/images/Elibro.png">
        </figure>
        <div class="contenido-card">
          <h3>Biblioteca Uleam</h3>
          <p>Clic aqui para ingresar a la Biblioteca Uleam.</p>
          <a href="https://elibro.net/es/lc/uleam/login_usuario/">Ir al sitio</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
}
/*Cards*/
.container-card{
	width: 100%;
	display: flex;
	max-width: 1100px;
	margin: auto;
}
.title-cards{
	width: 100%;
	max-width: 1080px;
	margin: auto;
	padding: 20px;
	margin-top: 20px;
	text-align: center;
	color: #7a7a7a;
}
.card{
	width: 100%;
	margin: 20px;
	border-radius: 6px;
	overflow: hidden;
	background:#fff;
	box-shadow: 0px 1px 10px rgba(0,0,0,0.2);
	transition: all 400ms ease-out;
	cursor: default;
}
.card:hover{
	box-shadow: 5px 5px 20px rgba(0,0,0,0.4);
	transform: translateY(-3%);
}
.card img{
	width: 100%;
	height: 210px;
}
.card .contenido-card{
	padding: 15px;
	text-align: center;
}
.card .contenido-card h3{
	margin-bottom: 15px;
	color: #7a7a7a;
}
.card .contenido-card p{
	line-height: 1.8;
	color: #6a6a6a;
	font-size: 14px;
	margin-bottom: 5px;
}
.card .contenido-card a{
	display: inline-block;
	padding: 10px;
	margin-top: 10px;
	text-decoration: none;
	color: #2fb4cc;
	border: 1px solid #2fb4cc;
	border-radius: 4px;
	transition: all 400ms ease;
	margin-bottom: 5px;
}
.card .contenido-card a:hover{
	background: #2fb4cc;
	color: #fff;
}
@media only screen and (min-width:320px) and (max-width:768px){
	.container-card{
		flex-wrap: wrap;
	}
	.card{
		margin: 15px;
	}
}
/*Fin-Cards*/
</style>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px; /* Increased top margin for spacing */
}

nav {
  padding: 20px; /* Reduced padding for a more compact look */
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 30px; /* Increased font size */
  margin-right: 15px; /* Increased right margin for spacing between links */
}

nav a.router-link-exact-active {
  color: #42b983;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  background-image: url('~@/images/fondo.jpg');
  background-size: cover;
  height: 100vh;
  overflow: hidden;

  /* Agrega la siguiente línea para especificar la posición inicial de la imagen de fondo */
  background-position: center;

  /* Agrega una animación para mover la imagen de fondo */
  animation: moveBackground 20s linear infinite; /* Puedes ajustar la duración y el tipo de animación según tus preferencias */
}

/* Define la animación llamada "moveBackground" */
@keyframes moveBackground {
  from {
    background-position: 0% center; /* La posición inicial de la imagen de fondo */
  }
  to {
    background-position: 100% center; /* La posición final de la imagen de fondo */
  }
}

.boxes-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.box {
  width: 250px; /* Adjust the width as needed */
  height: 180px; /* Adjust the height as needed */
  margin: 10px;
  padding: 20px;
  border: 1px solid #aaa;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: rgba(255, 255, 255, 0.9); /* Slightly transparent white background */
}

.box:hover {
  background-color: rgba(255, 255, 255, 0.7); /* Transparent white background on hover */
}

.box h2 {
  color: #2c3e50;
  font-size: 24px; /* Adjust the font size */
}

.box p {
  color: #34495e;
  font-size: 16px; /* Adjust the font size */
}
nav {
  background-color: #1a2537;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
}

nav a {
  color: white;
  text-decoration: none;
  margin-right: 15px;
  font-weight: bold;
  font-size: 16px;
}
</style>
