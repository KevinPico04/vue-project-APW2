<template>
    <div>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/logines">Estudiante</router-link> |
        <router-link to="/register">Register Profesor</router-link> |
      </nav>
      <form class="formulario">
        <img alt="Vue logo" src="~@/images/imagen.png" class="logo" style="width: 150px;">
        <h2>Sistema de Tutorías de Titulación</h2>
        <h2>Regístrate</h2>
        <h1>Estudiante</h1>
        <div class="contenedor">
          <div class="input-contenedor">
            <i class="fas fa-user icon"></i>
            <input v-model="nombreCompleto" type="text" placeholder="Nombre Completo">
            <p v-if="!nombreCompleto && submitted" class="error">Por favor, ingrese su nombre completo.</p>
          </div>
  
          <div class="input-contenedor">
            <i class="fas fa-envelope icon"></i>
            <input v-model="correoElectronico" type="text" placeholder="Correo Electrónico">
            <p v-if="!validarCorreo && submitted" class="error">
              {{ correoElectronico ? 'Ingrese un correo electrónico válido.' : 'Por favor, ingrese su correo electrónico.' }}
            </p>
          </div>
  
          <div class="input-contenedor">
            <i class="fas fa-key icon"></i>
            <input v-model="contrasena" type="password" placeholder="Contraseña">
            <p v-if="!contrasena && submitted" class="error">Por favor, ingrese su contraseña.</p>
          </div>
  
          <div class="input-contenedor">
            <i class="fas fa-key icon"></i>
            <input v-model="carrera" type="text" placeholder="Carrera">
            <p v-if="!carrera && submitted" class="error">Por favor, ingrese su carrera.</p>
          </div>
  
          <div class="input-contenedor">
            <i class="fas fa-key icon"></i>
            <input v-model="direccion" type="text" placeholder="Dirección">
            <p v-if="!direccion && submitted" class="error">Por favor, ingrese su dirección.</p>
          </div>
          <input type="submit" value="Regístrate" class="button" @click.prevent="validateAndRegister">
          <p>Al registrarte, aceptas nuestras Condiciones de uso y Política de privacidad.</p>
          <router-link to="/logines" class="link">¿Ya tienes una cuenta? Iniciar Sesión</router-link>
  
          <!-- Mensaje de éxito después del formulario -->
          <div v-if="registroExitoso" class="mensaje-exito">
            Usuario registrado correctamente. Redirigiendo a la página de inicio de sesión...
          </div>
        </div>
      </form>
    </div>
  </template>
  
  
  <script>
  import bcrypt from 'bcryptjs';
  
  export default {
    data() {
      return {
        nombreCompleto: '',
        correoElectronico: '',
        contrasena: '',
        carrera: '',
        direccion: '',
        submitted: false,
        registroExitoso: false,
      };
    },
    computed: {
      validarCorreo() {
        // Expresión regular para validar el formato de correo electrónico
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexCorreo.test(this.correoElectronico);
      },
    },
    methods: {
      validateAndRegister() {
        // Marcar como enviado para mostrar mensajes de error
        this.submitted = true;
  
        // Validar que todos los campos estén llenos y que el correo sea válido
        if (
          !this.nombreCompleto ||
          !this.validarCorreo ||
          !this.contrasena ||
          !this.carrera ||
          !this.direccion
        ) {
          // No mostrar alertas aquí
          return;
        }
  
        // Hashear la contraseña antes de almacenarla
        const hashedPassword = bcrypt.hashSync(this.contrasena, 10);
  
        // Almacenar datos en el almacenamiento local
        const userData = {
          nombreCompleto: this.nombreCompleto,
          correoElectronico: this.correoElectronico,
          contrasena: hashedPassword, // Almacenar la contraseña hasheada
          carrera: this.carrera,
          direccion: this.direccion,
        };
  
        localStorage.setItem('userData', JSON.stringify(userData));
  
        // Aquí puedes realizar la lógica de registro, por ejemplo, enviar una solicitud al servidor
        this.registroExitoso = true;
  
        // Después del registro exitoso, redirige al usuario a homeview
        this.$router.push('/logines');
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
  /* ... (mantén los estilos originales) */
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
      margin-top: 150px;
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
  nav a.router-link-exact-active {
    color: #42b983;
  }
  .mensaje-exito {
    text-align: center;
    color: #28a745; /* Verde para indicar éxito */
    font-size: 18px;
    margin-bottom: 15px;
  }
  
  </style>