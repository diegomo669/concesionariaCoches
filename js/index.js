import { crearMenu } from './menu/menu.js';
import { formularioUsuario } from './Formularios/formularioUsuario.js';
import { formularioProducto } from './Formularios/formularioProducto.js';
import { formularioPibot } from './Formularios/pibot.js';
const app = document.getElementById('app');

function mostrarInicio() {
  app.innerHTML = `BIENVENIDO`;
    
}



function listarCoche(){
    document.getElementById("mostrar-lista").addEventListener("click", async () => {
        const response = await fetch("http://localhost:3000/listar-coches");
        const data = await response.json();
        const listaAutos = document.getElementById("lista-autos");
    
        if (data.success) {
            listaAutos.innerHTML = "<h2>Lista de Autos</h2>";
            data.coches.forEach(coche => {
                listaAutos.innerHTML += `<p><strong>${coche.modelo}</strong> - Posición: ${coche.posicion}, Valor: ${coche.valor}</p>`;
            });
        } else {
            listaAutos.innerHTML = "<p style='color:red;'>Error al obtener la lista de autos.</p>";
        }
    });
}
const acciones = {
  pibot: formularioPibot,
  usuario: formularioUsuario,
  producto: formularioProducto
};

crearMenu(acciones);
formularioPibot();
