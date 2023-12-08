<template>
    <div>
      <nav>
        <router-link to="/estudiante">Regresar</router-link>
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
      </div>
    </div>
  </template>
  

<script>
const practicasAsignadas = [];

function cargarPracticas() {
    const listaPracticas = document.getElementById('lista-practicas');

    // Verificar si el elemento existe antes de continuar
    if (listaPracticas) {
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
            ];

            celdas.forEach((texto, index) => {
                const celda = document.createElement('td');
                celda.innerHTML = texto;
                fila.appendChild(celda);

            });

            // Verificar nuevamente antes de intentar agregar al DOM
            if (listaPracticas) {
                listaPracticas.appendChild(fila);
            }
        });
    }
}

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