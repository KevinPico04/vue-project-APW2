<template>
  <div>
    <nav>
      <router-link to="/estudiante">Uleam</router-link>
      <router-link to="/">Cerrar Sesión</router-link>
    </nav>
    <h1>Bienvenido al Sistema Estudiante</h1>
    <div id="contenedor">
      <!-- Imagen principal -->
      <img src="~@/images/avatar.png" alt="Imagen Principal" style="width: 300px; height: 200px; object-fit: cover; margin-right: 20px;">

      <!-- Recuadros de sección -->
      <div class="seccion" @click="$router.push('/perfil')">
        <h2>Perfil</h2>
      </div>
      <div class="seccion">
        <h2>Tutorías Pendientes</h2>
        <p>Tutorías: <span ref="numeroTutorias" class="numero">{{ practicasAsignadas.length }}</span></p>
      </div>
      <div class="seccion">
        <h2>Documentos</h2>
        <button @click="subirDocumento">Subir Documento</button>
        <p v-if="documentoSubido">
          Documento Subido: {{ documentoSubido }}
          <button @click="eliminarDocumento" class="eliminar-btn">Eliminar</button>
        </p>
        <a v-if="documentoSubido" :href="documentoSubido" download class="descargar-btn">Descargar</a>
      </div>
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">{{ header }}</div>

            <div class="card-body d-flex flex-column align-items-center justify-content-center">
              <h2 style="font-size: 1.5em; background-color: #ddd; padding: 10px; border-radius: 5px;">{{ currentTime }}</h2>
              <p style="font-size: 1em; margin-top: -10px;">{{ currentDate }}</p>
            </div>
          </div>
        </div>
      </div>
      <router-link to="/verview" class="agregar-tutoria-link">Ver Tutorías</router-link>
    </div>
  </div>
</template>
  
  <script>
  export default {
    // ... (resto del componente) ...
  };
  </script>
  
  <style scoped>
  /* ... (otros estilos) ... */
  
  #contenedor {
    margin-top: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .seccion {
    width: 150px;
    padding: 20px;
    margin-right: 20px;
    background-color: #ccc7c7;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  .seccion h2 {
    font-size: 1.2em; /* Ajusta el tamaño de letra según tu preferencia */
  }
  
  .seccion:hover {
    background-color: #d3d0d0;
  }
  
  .seccion h2 {
    margin-top: 10px;
  }
  
  .seccion p {
    margin: 10px;
  }
  
  .numero {
    font-size: 24px;
    font-weight: bold;
    color: #3498db;
  }
  </style>
  
  <script>
export default {
  data() {
    return {
      practicaSeleccionada: null,
    };
  },
  mounted() {
    // Verifica si hay datos en el almacenamiento local al cargar el componente
    const practicaAlmacenada = JSON.parse(localStorage.getItem('practicaSeleccionada'));

    if (practicaAlmacenada) {
      this.practicaSeleccionada = practicaAlmacenada;
    }
  },
  methods: {
    cerrarDetalle() {
      // Cierra el recuadro y reinicia la información
      this.practicaSeleccionada = null;
      localStorage.removeItem('practicaSeleccionada');
    },
  },
};
</script>

<script>
export default {
  data() {
    return {
      practicaSeleccionada: null,
      practicasAsignadas: [],
      documentoSubido: null,
    };
  },
  mounted() {
    this.cargarPracticas();
    this.cargarDocumento();
  },
  methods: {
    agregarPractica(event) {
      event.preventDefault();

      const nombreEstudiante = this.$refs.nombreEstudiante.value;
      const duracion = this.$refs.duracion.value.split('/').reverse().join('-');
      const duracion2 = this.$refs.duracion2.value.split('/').reverse().join('-');
      const empresa = this.$refs.empresa.value;
      const encargado = this.$refs.encargado.value;
      const contacto = this.$refs.contacto.value;
      const Hora = this.$refs.Hora.value;

      // Validar que ninguno de los campos esté vacío
      if (nombreEstudiante && duracion && duracion2 && empresa && encargado && contacto) {
        this.practicasAsignadas.push({
          alumno: nombreEstudiante,
          empresa: empresa,
          estado: "En Progreso",
          duracion: duracion,
          duracion2: duracion2,
          encargado: encargado,
          contacto: contacto,
          Hora: Hora,
        });

        // Limpiar campos del formulario
        this.$refs.nombreEstudiante.value = '';
        this.$refs.duracion.value = '';
        this.$refs.duracion2.value = '';
        this.$refs.empresa.value = '';
        this.$refs.encargado.value = '';
        this.$refs.contacto.value = '';
        this.$refs.Hora.value = '';

        // Mostrar u ocultar la cabecera de la tabla según la cantidad de prácticas
        if (this.practicasAsignadas.length === 1) {
          document.getElementById('tabla-practicas').querySelector('thead').style.display = 'table-header-group';
        }

        // Actualizar el número de tutorías pendientes
        this.$refs.numeroTutorias.innerText = this.practicasAsignadas.length;

        // Actualizar el almacenamiento local
        localStorage.setItem('practicas', JSON.stringify(this.practicasAsignadas));
      } else {
        alert('Por favor completa todos los campos.');
      }
    },
    subirDocumento() {
      const archivoInput = document.createElement('input');
      archivoInput.type = 'file';
      archivoInput.accept = 'application/pdf'; // Cambia el tipo de archivo según tus necesidades

      archivoInput.addEventListener('change', (event) => {
        const archivo = event.target.files[0];

        // Guardar el archivo en el local storage
        const lector = new FileReader();
        lector.onload = (e) => {
          const contenido = e.target.result;
          localStorage.setItem('documento', contenido);
          this.documentoSubido = archivo.name;
        };

        lector.readAsDataURL(archivo);
      });

      archivoInput.click();
    },

    eliminarDocumento() {
      localStorage.removeItem('documento');
      this.documentoSubido = null;
    },

    cargarDocumento() {
      const contenido = localStorage.getItem('documento');
      if (contenido) {
        this.documentoSubido = contenido;
      }
    },

    eliminarPractica(nombreEstudiante) {
      this.practicasAsignadas = this.practicasAsignadas.filter(practica => practica.alumno !== nombreEstudiante);

      // Actualizar el número de tutorías pendientes
      this.$refs.numeroTutorias.innerText = this.practicasAsignadas.length;

      // Actualizar el almacenamiento local
      localStorage.setItem('practicas', JSON.stringify(this.practicasAsignadas));
    },

    cargarPracticas() {
      const storedPracticas = JSON.parse(localStorage.getItem('practicas'));

      if (storedPracticas) {
        this.practicasAsignadas = storedPracticas;
      }
    },
  },
};
</script>
  
  
  <script setup>
  let currentDate = new Date().toLocaleDateString();
  let currentTime = new Date().toLocaleTimeString();
  
  const updateDateTime = () => {
    const now = new Date();
    currentDate = now.toLocaleDateString();
    currentTime = now.toLocaleTimeString();
  };
  
  updateDateTime(); // Actualiza la fecha y hora al renderizar el componente
  setInterval(updateDateTime, 1000); // Actualiza cada segundo
  </script>
  
  <style scoped>
  body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    position: relative;
    background-size: cover;
    background-position: center;
    height: 100vh;
    overflow: hidden;
  }
  
  .container {
    margin-top: 30px; /* Ajusta según sea necesario */
  }
  
  h1 {
    font-size: 2em; /* Tamaño del encabezado principal */
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
  
  .card {
    background-color: #ddd; /* Fondo gris para la tarjeta */
  }
  
  .card-body {
    text-align: center;
  }
  </style>
  <style scoped>
  body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    position: relative;
    background-size: cover;
    background-position: center;
    height: 100vh;
    overflow: hidden;
  }
  
  .container {
    margin-top: 30px;
  }
  
  h1 {
    font-size: 2em;
  }
  
  
  .card {
    background-color: #ddd;
  }
  
  .card-body {
    text-align: center;
  }
  
  #tabla-practicas {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
  }
  
  #tabla-practicas th, #tabla-practicas td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  #tabla-practicas th {
    background-color: #f2f2f2;
  }
  
  .form-register {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .form-register h2 {
    font-size: 1.5em;
    margin-bottom: 15px;
  }
  
  .controls {
    margin-bottom: 10px;
    padding: 8px;
    width: 100%;
  }
  
  .controls[type="date"] {
    width: calc(100% - 18px);
  }
  
  button {
    border: none;
    color: white;
    font-size: 16px;
    background: #1a2537;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background: cadetblue;
  }
  .eliminar-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-left: 10px;
  border-radius: 3px;
  cursor: pointer;
}

.descargar-btn {
  background-color: #2ecc71;
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  margin-left: 10px;
  border-radius: 3px;
  cursor: pointer;
}

.eliminar-btn:hover,
.descargar-btn:hover {
  opacity: 0.8;
}
  </style>
  
  <style scoped>
  /* ... (otros estilos) ... */
  
  .agregar-tutoria-link {
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 16px;
    padding: 10px 20px;
    background-color: #4CAF50; /* Color verde */
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .agregar-tutoria-link:hover {
    background-color: #45a049; /* Cambio de color al pasar el mouse */
  }
  
  /* ... (otros estilos) ... */
  </style>
  
  <style>
       #contenedor {
        margin-top: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
  
      #datos-personales {
        width: 300px;
        padding: 20px;
        margin-right: 20px;
        background-color: #e4dede;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
  
      #tutorias-pendientes {
        width: 300px;
        padding: 20px;
        background-color: #e4dede;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
  
      h2 {
        margin-top: 10px;
      }
  
      p {
        margin: 10px;
      }
  
      .numero {
        font-size: 24px;
        font-weight: bold;
        color: #3498db;
      }
    </style>