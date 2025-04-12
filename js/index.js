import { crearMenu } from './menu/menu.js';
import { formularioUsuario } from './Formularios/formularioUsuario.js';
import { formularioProducto } from './Formularios/formularioProducto.js';
import { formularioPibot } from './Formularios/pibot.js';
import { formularioRegistroCoche } from './Formularios/formularioRegistroCoche.js';
import { formularioReservarCoche } from './Formularios/formularioReservarCoche.js';

const acciones = {
  pibot: formularioPibot,
  usuario: formularioUsuario,
  producto: formularioProducto,
  registrarcoche : formularioRegistroCoche, 
  reservarcoche : formularioReservarCoche,
};

crearMenu(acciones);
formularioPibot();

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("logo-link").addEventListener("click", (e) => {
    e.preventDefault();
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
