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
  reservarcoche : formularioReservarCoche
};

crearMenu(acciones);
formularioPibot();
