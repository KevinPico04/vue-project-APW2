<template>
    <div>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/login">¿Profesor?</router-link> |
      </nav>
      <form class="formulario">
        <img alt="Vue logo" src="~@/images/imagen.png" class="logo" style="width: 150px;">
        <h2>Bienvenido Al Sistema de Tutorías de Titulación </h2>
        <h1>Estudiante</h1>
        <h2>Inicia Sesión</h2>
        <div class="contenedor">
          <div class="input-contenedor">
            <i class="fas fa-envelope icon"></i>
            <input v-model="correoElectronico" type="text" placeholder="Correo Electrónico">
            <p v-if="!esCorreoValido && submitted" class="error">
              {{ correoElectronico ? 'Ingrese un correo electrónico válido.' : 'Por favor, ingrese su correo electrónico.' }}
            </p>
          </div>
          <div class="input-contenedor">
            <i class="fas fa-key icon"></i>
            <input v-model="contrasena" type="password" placeholder="Contraseña">
            <p v-if="!contrasena && submitted" class="error">Por favor, ingrese su contraseña.</p>
          </div>
          <p class="error" v-if="mensajeError">{{ mensajeError }}</p>
          <input type="submit" value="Login" class="button" @click.prevent="validateAndLogin">
          <router-link to="/registeres" class="link">¿No tienes una cuenta? Regístrate</router-link>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import bcrypt from 'bcryptjs';
  export default {
    data() {
      return {
        correoElectronico: '',
        contrasena: '',
        submitted: false,
        mensajeError: '',
      };
    },
    computed: {
      esCorreoValido() {
        const expresionRegularCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return expresionRegularCorreo.test(this.correoElectronico);
      },
    },
    methods: {
    validateAndLogin() {
      // Marcar como enviado para mostrar mensajes de error
      this.submitted = true;
  
      // Validar que ambos campos estén llenos y que el correo sea válido
      if (!this.correoElectronico || !this.contrasena || !this.esCorreoValido) {
        // No mostrar alertas aquí
        return;
      }
  
      // Obtener los datos del usuario almacenados en localStorage
      const storedUserData = JSON.parse(localStorage.getItem('userData'));
  
      // Verificar si las credenciales coinciden con las almacenadas
      if (
        this.correoElectronico === storedUserData.correoElectronico &&
        bcrypt.compareSync(this.contrasena, storedUserData.contrasena)
      ) {
        // Autenticación exitosa, redirige al usuario a homeview
        this.$router.push('/estudiante');
      } else {
        this.mensajeError = 'Usuario no registrado o contraseña incorrecta';
      }
    },
  },
  };
  </script>
    
    <style scoped>
    /* Agregamos estilos para los mensajes de error */
    .error {
      color: red;
      margin-top: 5px;
      font-size: 14px;
    }
    
    /* Estilos restantes */
    </style>
    
    
  <style scoped>
  body {
      font-family: Arial, Helvetica, sans-serif;
      margin: 0;
      background-size: cover;
      background-attachment: fixed;
  }
  * {
      box-sizing: border-box;
  }
  .contenedor{
      width: 100%;
      padding: 15px;
  }
  .formulario{
      background: #fff;
      margin-top: 30px;
      padding: 3px;
  }
  h1{
      text-align: center;
      color: #1a2537;
      font-size: 40px;
  }
  input[type="text"],
  input[type="password"]{
      font-size: 20px;
      width: 82%;
      padding: 10px;
      border: none;
  }
  .input-contenedor{
      margin-bottom: 15px;
      border: 1px solid #aaa;
  }
  .icon{
      min-width: 50px;
      text-align: center;
      color: #999;
  }
  .button{
      border: none;
      width: 100%;
      color: white;
      font-size: 20px;
      background:  #1a2537;
      padding: 15px 20px;
      border-radius: 5px;
      cursor: pointer;
  }
  .button:hover{
      background: cadetblue;
  }
  p{
      text-align: center;
  }
  .link{
      text-decoration: none;
        color: #1a2537;
      font-weight: 600;
  }
  .link:hover{
       color: cadetblue;
  }
  @media(min-width:768px)
  {
      .formulario{
          margin: auto;
          width: 500px;
          margin-top: 150px;
          border-radius: 2%;
      }
  }
  
  
  </style>