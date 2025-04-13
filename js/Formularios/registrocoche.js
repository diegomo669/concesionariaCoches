


let app = "";


let Lista_coche = [];
let list_modelo = [];
let list_marca = [];
let list_tipo = [];
let list_tipoCombustible = [];
let list_estadocoche = [];
let modalEditar; // Global dentro de la función principal



export async function registroCoche() {
  
    app = document.getElementById('app');
    await listar();
    sitio();
}
async function listar() {
    try {
      // Usamos Promise.all() para ejecutar todas las solicitudes en paralelo
      const resultados = await Promise.all([
          fetch(`http://localhost:3000/modelo`),
          fetch(`http://localhost:3000/marca`),
          fetch(`http://localhost:3000/tipo`),
          fetch(`http://localhost:3000/tipocombustible`),
          fetch(`http://localhost:3000/estadocoche`),
          fetch("http://localhost:3000/coche")
      ]);
  
      // Convertimos las respuestas a JSON
      const [modelo, marca, tipo, tipoCombustible, estadoCoche, coches] = await Promise.all(
        resultados.map(res => res.json())  // Convertimos todas las respuestas a JSON
      );
  
      // Asignamos los resultados a las variables correspondientes
      list_modelo = modelo;
      list_marca = marca;
      list_tipo = tipo;
      list_tipoCombustible = tipoCombustible;
      list_estadocoche = estadoCoche;
      Lista_coche = coches;
  
      console.log(list_modelo, list_marca, list_tipo, list_tipoCombustible, list_estadocoche, Lista_coche);
  
    } catch (error) {
      console.error("Error al listar datos: ", error);
      throw error; // Propaga el error para que pueda ser capturado por el .catch()
    }
  }
  


async function sitio() {
  let view = `
        <form id="formRegistrarCoche" class="p-4 border rounded bg-light">
        <h4 class="mb-4 text-center">Registrar Coche</h4>

        <div class="row">
            <div class="mb-3 col-md-4">
            <label for="id_modelo" class="form-label">Modelo</label>
            <select id="id_modelo" class="form-select" required></select>
            </div>

            <div class="mb-3 col-md-4">
            <label for="id_marca" class="form-label">Marca</label>
            <select id="id_marca" class="form-select" required></select>
            </div>

            <div class="mb-3 col-md-4">
            <label for="id_tipo_vehiculo" class="form-label">Tipo Vehículo</label>
            <select id="id_tipo_vehiculo" class="form-select" required></select>
            </div>

            <div class="mb-3 col-md-4">
            <label for="id_tipo_combustible" class="form-label">Tipo Combustible</label>
            <select id="id_tipo_combustible" class="form-select" required></select>
            </div>

            <div class="mb-3 col-md-4">
            <label for="id_estado_vehiculo" class="form-label">Estado Vehículo</label>
            <select id="id_estado_vehiculo" class="form-select" required></select>
            </div>

            <div class="mb-3 col-md-4">
            <label for="color" class="form-label">Color</label>
            <input type="text" class="form-control" id="color" required>
            </div>

            <div class="mb-3 col-md-4">
            <label for="kilometraje" class="form-label">Kilometraje</label>
            <input type="number" step="0.01" class="form-control" id="kilometraje" required>
            </div>

            <div class="mb-3 col-md-4">
            <label for="num_puertas" class="form-label">Número de Puertas</label>
            <input type="number" class="form-control" id="num_puertas" required>
            </div>

            <div class="mb-3 col-md-4">
            <label for="num_asientos" class="form-label">Número de Asientos</label>
            <input type="number" class="form-control" id="num_asientos" required>
            </div>
        </div>

        <div class="text-center">
            <button type="submit" class="btn btn-primary mt-3 px-5">Registrar Coche</button>
        </div>
        </form>

        <div class="table-responsive mt-4">
            <table class="table table-bordered table-hover align-middle">
                <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Modelo</th>
                    <th>Marca</th>
                    <th>Tipo Vehículo</th>
                    <th>Tipo Combustible</th>
                    <th>Estado</th>
                    <th>Color</th>
                    <th>Kilometraje</th>
                    <th>N° Puertas</th>
                    <th>N° Asientos</th>
                    <th>Funciones</th>
                </tr>
                </thead>
                <tbody id="tablaCoches">
                <!-- Filas dinámicas aquí -->
                </tbody>
            </table>
        </div>
        <!-- Modal de Edición -->
       <!-- Modal de Edición -->
        <div class="modal fade" id="modalEditarCoche" tabindex="-1" aria-labelledby="modalEditarLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">
            <form id="formEditarCoche">
                <div class="modal-header">
                <h5 class="modal-title" id="modalEditarLabel">Editar Coche</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body row g-3">
                <input type="hidden" id="edit_id_coche" />

                <div class="col-md-4">
                    <label class="form-label">Modelo</label>
                    <select id="edit_id_modelo" class="form-select" required></select>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Marca</label>
                    <select id="edit_id_marca" class="form-select" required></select>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Tipo Vehículo</label>
                    <select id="edit_id_tipo_vehiculo" class="form-select" required></select>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Tipo Combustible</label>
                    <select id="edit_id_tipo_combustible" class="form-select" required></select>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Estado Vehículo</label>
                    <select id="edit_id_estado_vehiculo" class="form-select" required></select>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Color</label>
                    <input type="text" id="edit_color" class="form-control" required />
                </div>
                <div class="col-md-4">
                    <label class="form-label">Kilometraje</label>
                    <input type="number" step="0.01" id="edit_kilometraje" class="form-control" required />
                </div>
                <div class="col-md-4">
                    <label class="form-label">N° Puertas</label>
                    <input type="number" id="edit_num_puertas" class="form-control" required />
                </div>
                <div class="col-md-4">
                    <label class="form-label">N° Asientos</label>
                    <input type="number" id="edit_num_asientos" class="form-control" required />
                </div>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                </div>
            </form>
            </div>
        </div>
        </div>

    `;
    app.innerHTML = view;
    await cargarSelect(list_marca,"id_marca", "marca_coche", "id_marca");
    await cargarSelect(list_modelo,"id_modelo", "modelo_coche", "id_modelo");
    await cargarSelect(list_tipo,"id_tipo_vehiculo", "tipo", "id_tipo_vehiculo");
    await cargarSelect(list_tipoCombustible,"id_tipo_combustible", "combustible", "id_tipo_combustible");
    await cargarSelect(list_estadocoche,"id_estado_vehiculo", "estado", "id_estado_vehiculo");

    const form = document.getElementById(`formRegistrarCoche`);
    form.addEventListener('submit',registrar);
    cargarCoches(Lista_coche);

    await cargarSelect(list_marca,"edit_id_marca", "marca_coche", "id_marca");
    await cargarSelect(list_modelo,"edit_id_modelo", "modelo_coche", "id_modelo");
    await cargarSelect(list_tipo,"edit_id_tipo_vehiculo", "tipo", "id_tipo_vehiculo");
    await cargarSelect(list_tipoCombustible,"edit_id_tipo_combustible", "combustible", "id_tipo_combustible");
    await cargarSelect(list_estadocoche,"edit_id_estado_vehiculo", "estado", "id_estado_vehiculo");

    document.getElementById("formEditarCoche").addEventListener("submit", actualizarCoche);

}
async function registrar(e) {
    e.preventDefault();
  
    const data = {
      id_modelo: parseInt(document.getElementById("id_modelo").value),
      id_marca: parseInt(document.getElementById("id_marca").value),
      id_tipo_vehiculo: parseInt(document.getElementById("id_tipo_vehiculo").value),
      id_tipo_combustible: parseInt(document.getElementById("id_tipo_combustible").value),
      id_estado_vehiculo: parseInt(document.getElementById("id_estado_vehiculo").value),
      color: document.getElementById("color").value,
      kilometraje: parseFloat(document.getElementById("kilometraje").value),
      num_puertas: parseInt(document.getElementById("num_puertas").value),
      num_asientos: parseInt(document.getElementById("num_asientos").value),
    };
  
    // Validar los datos antes de enviarlos
    if (!data.id_modelo || !data.id_marca || !data.id_tipo_vehiculo || !data.id_tipo_combustible || !data.id_estado_vehiculo || !data.color || isNaN(data.kilometraje) || isNaN(data.num_puertas) || isNaN(data.num_asientos)) {
      alert("Por favor, complete todos los campos correctamente.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/coche", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Error al registrar coche");
      }
  
      const result = await response.json();
      console.log(result);
      alert(result.success ? "Coche registrado correctamente" : "Error: " + result.error);
      const responseGET = await fetch("http://localhost:3000/coche");
      const Lista = await responseGET.json();
      cargarCoches(Lista);
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      alert("Error en la conexión con el servidor.");
    }
  }
  
async function cargarSelect(lista, selectId, labelField = "nombre", valueField = "id") {
    try {
      const data = lista;
      const select = document.getElementById(selectId);
        console.log(data);
      data.resultado.forEach(item => {
        const option = document.createElement("option");
        option.value = item[valueField];
        option.textContent = item[labelField];
        select.appendChild(option);
      });
    } catch (err) {
      console.error("Error al cargar", selectId, err);
    }

  } 


  async function cargarCoches(data) {
    try {
        

        if (data.success && Array.isArray(data.resultado)) { // Asegúrate de que data.resultado sea el nombre correcto
            const tabla = document.getElementById("tablaCoches");
            tabla.innerHTML = ""; // Limpiar tabla

            data.resultado.forEach(coche => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${coche.id_coche}</td>
                    <td>${coche.modelo || coche.id_modelo}</td>
                    <td>${coche.marca || coche.id_marca}</td>
                    <td>${coche.tipo_vehiculo || coche.id_tipo_vehiculo}</td>
                    <td>${coche.tipo_combustible || coche.id_tipo_combustible}</td>
                    <td>${coche.estado_vehiculo || coche.id_estado_vehiculo}</td>
                    <td>${coche.color}</td>
                    <td>${coche.kilometraje}</td>
                    <td>${coche.num_puertas}</td>
                    <td>${coche.num_asientos}</td>
                    <td>
                        <button class="btn btn-sm btn-warning me-2" data-id="${coche.id_coche}" data-action="editar">Editar</button>
                        <button class="btn btn-sm btn-danger" data-id="${coche.id_coche}" data-action="eliminar">Eliminar</button>
                    </td>
                `;
                tabla.appendChild(fila);
                fila.querySelectorAll("button").forEach(btn => {
                    btn.addEventListener("click", async () => {
                        const id = btn.dataset.id;
                        const action = btn.dataset.action;
                
                        if (action === "eliminar") {
                            if (confirm("¿Estás seguro de que quieres eliminar este coche?")) {
                                await eliminarCoche(id);
                            }
                        } else if (action === "editar") {
                            await editarCoche(id);
                        }
                    });
                });
            });
            
        } else {
            console.error("La API no devolvió datos válidos:", data);
            alert("No se pudieron cargar los coches. Verifica la respuesta del servidor.");
        }
    } catch (error) {
        console.error("Error al cargar coches:", error);
        alert("Error al conectar con el servidor.");
    }
    
}

async function eliminarCoche(id) {
    try {
        const response = await fetch(`http://localhost:3000/coche/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();
        alert(result.success ? "Coche eliminado correctamente." : "Error al eliminar coche: " + result.error);
        const responseGET = await fetch("http://localhost:3000/coche");
        const Lista = await responseGET.json();
        cargarCoches(Lista);
    } catch (error) {
        console.error("Error al eliminar coche:", error);
        alert("Error al conectar con el servidor.");
    }
}

async function editarCoche(id) {
    try {
      const res = await fetch(`http://localhost:3000/coche/${id}`);
      console.log("Respuesta:", res);
  
      if (!res.ok) {
        throw new Error(`Respuesta no OK: ${res.status}`);
      }
  
      const data = await res.json();
      console.log("Data:", data);
  
      if (data.success && data.resultado) {
        const coche = data.resultado;
        console.log("Coche:", coche);
  
        document.getElementById("edit_id_coche").value = coche.id_coche;
        document.getElementById("edit_id_modelo").value = coche.id_modelo;
        document.getElementById("edit_id_marca").value = coche.id_marca;
        document.getElementById("edit_id_tipo_vehiculo").value = coche.id_tipo_vehiculo;
        document.getElementById("edit_id_tipo_combustible").value = coche.id_tipo_combustible;
        document.getElementById("edit_id_estado_vehiculo").value = coche.id_estado_vehiculo;
        document.getElementById("edit_color").value = coche.color;
        document.getElementById("edit_kilometraje").value = coche.kilometraje;
        document.getElementById("edit_num_puertas").value = coche.num_puertas;
        document.getElementById("edit_num_asientos").value = coche.num_asientos;
  
        const modalElement = document.getElementById("modalEditarCoche");
        modalEditar = bootstrap.Modal.getOrCreateInstance(modalElement);
        modalEditar.show();
      } else {
        alert("No se pudo cargar el coche para editar.");
      }
    } catch (err) {
      console.error("Error al cargar datos del coche:", err);
      alert("Error al obtener los datos del coche.");
    }
  }
  
  
  
  
  async function actualizarCoche(e) {
    e.preventDefault();
  
    const data = {
      id_coche: parseInt(document.getElementById("edit_id_coche").value),
      id_modelo: parseInt(document.getElementById("edit_id_modelo").value),
      id_marca: parseInt(document.getElementById("edit_id_marca").value),
      id_tipo_vehiculo: parseInt(document.getElementById("edit_id_tipo_vehiculo").value),
      id_tipo_combustible: parseInt(document.getElementById("edit_id_tipo_combustible").value),
      id_estado_vehiculo: parseInt(document.getElementById("edit_id_estado_vehiculo").value),
      color: document.getElementById("edit_color").value,
      kilometraje: parseFloat(document.getElementById("edit_kilometraje").value),
      num_puertas: parseInt(document.getElementById("edit_num_puertas").value),
      num_asientos: parseInt(document.getElementById("edit_num_asientos").value),
    };
  
    try {
      const response = await fetch(`http://localhost:3000/coche/${data.id_coche}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (result.success) {
        alert("Coche actualizado correctamente.");
        modalEditar.hide();
        const res = await fetch("http://localhost:3000/coche");
        const Lista = await res.json();
        cargarCoches(Lista);
      } else {
        alert("Error al actualizar el coche: " + result.error);
      }
    } catch (error) {
      console.error("Error al actualizar coche:", error);
      alert("Error en la conexión con el servidor.");
    }
  }
  



