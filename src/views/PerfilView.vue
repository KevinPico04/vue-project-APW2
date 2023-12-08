<template>
  <div>
    <nav>
      <router-link to="/home">Regresar</router-link>
      <router-link to="/">Cerrar Sesión</router-link>
    </nav>
    <div class="container">
      <h1>Perfil de Usuario</h1>
      <form @submit.prevent="actualizarPerfil">
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input v-model="nombre" type="text" id="nombre" required>
        </div>
        <div class="form-group">
          <label for="correo">Correo Electrónico:</label>
          <input v-model="correo" type="email" id="correo" required>
        </div>
        <div class="form-group">
          <label for="direccion">Dirección:</label>
          <input v-model="direccion" type="text" id="direccion" required>
        </div>
        <div class="form-group">
          <label for="carrera">Carrera:</label>
          <input v-model="carrera" type="text" id="carrera" required>
        </div>
        <div class="form-group">
          <label for="numero">Telefono:</label>
          <input v-model="numero" type="text" id="numero">
        </div>
        <button type="submit">Actualizar Perfil</button>
        <p v-if="perfilActualizado" style="color: green; margin-top: 10px;">Perfil actualizado exitosamente.</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre: 'Nombre de Usuario',
      correo: 'usuario@example.com',
      direccion: 'Dirección de Usuario',
      carrera: 'Carrera de Usuario',
      numero: '0968367235',
      perfilActualizado: false, // Nueva variable para controlar el mensaje de éxito
    };
  },
  methods: {
    actualizarPerfil() {
      const datosUsuario = {
        nombre: this.nombre,
        correo: this.correo,
        direccion: this.direccion,
        carrera: this.carrera,
        numero: this.numero,
      };

      localStorage.setItem('usuario', JSON.stringify(datosUsuario));

      console.log('Perfil actualizado:', datosUsuario);

      // Mostrar el mensaje de éxito
      this.perfilActualizado = true;

      // Ocultar el mensaje después de unos segundos (puedes ajustar el tiempo)
      setTimeout(() => {
        this.perfilActualizado = false;
      }, 3000); // 3000 milisegundos = 3 segundos
    },
  },
  created() {
    const datosGuardados = localStorage.getItem('usuario');

    if (datosGuardados) {
      const datosUsuario = JSON.parse(datosGuardados);

      this.nombre = datosUsuario.nombre;
      this.correo = datosUsuario.correo;
      this.direccion = datosUsuario.direccion;
      this.carrera = datosUsuario.carrera;
      this.numero = datosUsuario.numero;
    }
  },
};
</script>
  
  <style scoped>
  /* Agrega estilos según sea necesario */
  .container {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: auto;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    font-weight: bold;
  }
  
  input {
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
  }
  
  button {
    background-color: #1a2537;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  nav {
  background-color: #1a2537;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a {
  color: white;
  text-decoration: none;
  margin-right: 15px;
  font-weight: bold;
  font-size: 16px;
  margin-right: 15px; /* Ajusta según sea necesario */
}
  </style>
  