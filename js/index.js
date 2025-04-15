import { crearMenu } from './menu/menu.js';
import { formularioUsuario } from './Formularios/formularioUsuario.js';
import { formularioProducto } from './Formularios/formularioProducto.js';
import { formularioPibot } from './Formularios/pibot.js';
import { registroCoche } from './Formularios/registrocoche.js';
import { formularioReservarCoche } from './Formularios/formularioReservarCoche.js';
import { cargarPaginaPrincipal } from "./Formularios/cargarPaginaPrincipal.js";
import { registroCliente } from './Formularios/formularioCliente.js';

const acciones = {
  pibot: formularioPibot,
  usuario: formularioUsuario,
  producto: formularioProducto,
  registrarcoche : registroCoche, 
  reservarcoche : formularioReservarCoche,
  registrocliente : registroCliente,
};

crearMenu(acciones);
formularioPibot();

  // Mostrar también al hacer clic en el logo
/*
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("logo-link").addEventListener("click", (e) => {
    e.preventDefault();
    cargarPaginaPrincipal();
    document.getElementById("app").innerHTML = `
      <h1>Bienvenido a la Concesionaria</h1>
      <p>Esta es la página de inicio.</p>
    `;
  });

  // Puedes cargar también esa vista por defecto automáticamente
  document.getElementById("app").innerHTML = `
    <h1>Bienvenido a la Concesionaria</h1>
    <p>Esta es la página de inicio.</p>
  `;

});



*/document.addEventListener("DOMContentLoaded", () => {
  // Mostrar la página principal al cargar
  cargarPaginaPrincipal();

  // Mostrar también al hacer clic en el logo
  const logo = document.getElementById("logo-link");
  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      cargarPaginaPrincipal();
    });
  }
});