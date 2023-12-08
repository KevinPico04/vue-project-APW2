<template>
    <div>
      <nav>
        <router-link to="/home">Regresar</router-link>
        <router-link to="/">Cerrar Sesión</router-link>
      </nav>
      <div class="container">
        <h2>Tutorías Asignadas</h2>
        <table id="tabla-practicas">
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Fecha de inicio</th>
              <th>Fecha de fin</th>
              <th>Nombre del tutor</th>
              <th>Materia</th>
              <th>Motivo</th>
              <th>Hora</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="lista-practicas">
            <!-- Aquí se llenarán dinámicamente las prácticas asignadas -->
          </tbody>
        </table>
        <div class="form-container">
        <section class="form-register">
            <section class="form-register">
          <form @submit.prevent="agregarPractica">
            <h2>Agregar Nueva Tutoría</h2>
            <div class="form-group">
              <label for="nombre-estudiante">Nombre del estudiante</label>
              <input class="controls" type="text" name="nombre-estudiante" id="nombre-estudiante" placeholder="Nombre del estudiante">
            </div>
            <div class="form-group">
              <label for="duracion">Fecha de inicio</label>
              <input class="controls" type="date" name="duracion" id="duracion">
            </div>
            <div class="form-group">
              <label for="duracion2">Fecha de fin</label>
              <input class="controls" type="date" name="duracion2" id="duracion2">
            </div>
            <div class="form-group">
              <label for="empresa">Nombre del tutor</label>
              <input class="controls" type="text" name="Empresa" id="empresa" placeholder="Nombre del tutor">
            </div>
            <div class="form-group">
              <label for="encargado">Materia</label>
              <input class="controls" type="text" name="encargado" id="encargado" placeholder="Materia">
            </div>
            <div class="form-group">
              <label for="contacto">Motivo</label>
              <input class="controls" type="text" name="Contacto" id="contacto" placeholder="Motivo">
            </div>
            <div class="form-group">
              <label for="Hora">Hora</label>
              <input class="controls" type="text" name="Hora" id="Hora" placeholder="Hora">
            </div>
            <button type="submit">Agregar</button>
          </form>
        </section>
        </section>
      </div>
      </div>
    </div>
  </template>
  

<script>
const practicasAsignadas = [];

function cargarPracticas() {
    const listaPracticas = document.getElementById('lista-practicas');
    const storedPracticas = JSON.parse(localStorage.getItem('practicas'));

    if (storedPracticas) {
        practicasAsignadas.push(...storedPracticas);
    }

    practicasAsignadas.forEach(practica => {
        const fila = document.createElement('tr');
        fila.dataset.nombreEstudiante = practica.alumno;

        const celdas = [
            practica.alumno,
            practica.duracion,
            practica.duracion2,
            practica.empresa,
            practica.encargado,
            practica.contacto,
            practica.Hora,
            '<button class="eliminar-button">Eliminar</button>'
        ];

        celdas.forEach((texto, index) => {
            const celda = document.createElement('td');
            celda.innerHTML = texto;
            fila.appendChild(celda);

            // Asociar evento de clic al botón eliminar
            if (index === celdas.length - 1) {
                const botonEliminar = celda.querySelector('.eliminar-button');
                botonEliminar.addEventListener('click', () => eliminarPractica(practica.alumno));
            }
        });

        listaPracticas.appendChild(fila);
    });
}


function agregarPractica(event) {
  event.preventDefault();

  const nombreEstudiante = document.getElementById('nombre-estudiante').value;
  const duracion = document.getElementById('duracion').value.split('/').reverse().join('-');
  const duracion2 = document.getElementById('duracion2').value.split('/').reverse().join('-');
  const empresa = document.getElementById('empresa').value;
  const encargado = document.getElementById('encargado').value;
  const contacto = document.getElementById('contacto').value;
  const Hora = document.getElementById('Hora').value;

  // Validar que ninguno de los campos esté vacío
  if (nombreEstudiante && duracion && duracion2 && empresa && encargado && contacto) {
    practicasAsignadas.push({
      alumno: nombreEstudiante,
      empresa: empresa,
      estado: "En Progreso",
      duracion: duracion,
      duracion2: duracion2,
      encargado: encargado,
      contacto: contacto,
      Hora: Hora,
    });

    const listaPracticas = document.getElementById('lista-practicas');
    const fila = document.createElement('tr');

    const celdas = [
      nombreEstudiante,
      duracion,
      duracion2,
      empresa,
      encargado,
      contacto,
      Hora,
      '<button class="eliminar-button">Eliminar</button>'
    ];

    celdas.forEach((texto, index) => {
      const celda = document.createElement('td');
      celda.innerHTML = texto;
      fila.appendChild(celda);

      // Asociar evento de clic al botón eliminar
      if (index === celdas.length - 1) {
        const botonEliminar = celda.querySelector('.eliminar-button');
        botonEliminar.addEventListener('click', () => eliminarPractica(nombreEstudiante));
      }
    });

    listaPracticas.appendChild(fila);

    // Limpiar campos del formulario
    document.getElementById('nombre-estudiante').value = '';
    document.getElementById('duracion').value = '';
    document.getElementById('duracion2').value = '';
    document.getElementById('empresa').value = '';
    document.getElementById('encargado').value = '';
    document.getElementById('contacto').value = '';
    document.getElementById('Hora').value = '';

    // Mostrar u ocultar la cabecera de la tabla según la cantidad de prácticas
    if (practicasAsignadas.length === 1) {
      document.getElementById('tabla-practicas').querySelector('thead').style.display = 'table-header-group';
    }

    if (practicasAsignadas.length === 0) {
      document.getElementById('tabla-practicas').querySelector('thead').style.display = 'none';
    }

    // Actualizar el almacenamiento local
    localStorage.setItem('practicas', JSON.stringify(practicasAsignadas));

    // Almacena la práctica seleccionada en el local storage
    localStorage.setItem('practicaSeleccionada', JSON.stringify(practicasAsignadas[practicasAsignadas.length - 1]));

    // Redirige a /home con los parámetros de la práctica seleccionada
    this.$router.push({
      name: 'home', // Asegúrate de tener un nombre para la ruta /home en tu archivo de configuración de rutas
      params: { practica: practicasAsignadas[practicasAsignadas.length - 1] },
    });
  } else {
    alert('Por favor completa todos los campos.');
  }
}

const eliminarPractica = (nombreEstudiante) => {
    practicasAsignadas.forEach((practica, index) => {
        if (practica.alumno === nombreEstudiante) {
            practicasAsignadas.splice(index, 1);
        }
    });

    const listaPracticas = document.getElementById('lista-practicas');
    const fila = listaPracticas.querySelector(`[data-nombre-estudiante="${nombreEstudiante}"]`);
    
    if (fila) {
        fila.remove();
    }

    // Actualizar el almacenamiento local
    localStorage.setItem('practicas', JSON.stringify(practicasAsignadas));
};

window.onload = cargarPracticas;
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
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
}

h2 {
  color: #1a2537;
}

#tabla-practicas {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  overflow-x: auto;
}

#tabla-practicas th,
#tabla-practicas td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

#tabla-practicas th {
  background-color: #f2f2f2;
}

.form-register {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.controls {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.controls[type="date"] {
  width: calc(100% - 22px);
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
.form-container {
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-top: 100px;
}
</style>