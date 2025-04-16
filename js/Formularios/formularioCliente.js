


let app = "";


let Lista_cliente = [];
let modalEditar; // Global dentro de la función principal




export async function registroCliente() {
  
    app = document.getElementById('app');
    await listar();
    sitio();
}
async function listar() {
    try {
      // Usamos Promise.all() para ejecutar todas las solicitudes en paralelo
      const resultados = await Promise.all([
          fetch(`https://apicon-sa5n.onrender.com/cliente`),
      ]);
  
      // Convertimos las respuestas a JSON
      const [cliente] = await Promise.all(
        resultados.map(res => res.json())  // Convertimos todas las respuestas a JSON
      );
  
      // Asignamos los resultados a las variables correspondientes
      Lista_cliente = cliente;
     
      console.log(Lista_cliente);
  
    } catch (error) {
      console.error("Error al listar datos: ", error);
      throw error; // Propaga el error para que pueda ser capturado por el .catch()
    }
  }
  


async function sitio() {
  let view = `
    <!-- Sección de Registro de Cliente -->
    <div class="mb-5">
      <form id="formRegistrarCliente" class="p-4 border rounded bg-light">
        <h4 class="mb-4 text-center">Registrar Cliente</h4>
        <div class="row">
          <div class="mb-3 col-md-4">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" id="nombre" class="form-control" required>
          </div>
          <div class="mb-3 col-md-4">
            <label for="documento_tipo" class="form-label">Tipo de Documento</label>
            <select id="documento_tipo" class="form-select" required>
              <option value="DNI">DNI</option>
              <option value="RUC">RUC</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
          </div>
          <div class="mb-3 col-md-4">
            <label for="documento_numero" class="form-label">Número de Documento</label>
            <input type="text" id="documento_numero" class="form-control" required>
          </div>
          <div class="mb-3 col-md-4">
            <label for="telefono" class="form-label">Teléfono</label>
            <input type="text" id="telefono" class="form-control" required>
          </div>
          <div class="mb-3 col-md-4">
            <label for="direccion" class="form-label">Dirección</label>
            <input type="text" id="direccion" class="form-control">
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary mt-3 px-5">Registrar Cliente</button>
        </div>
      </form>

      <!-- Tabla de Clientes -->
      <div class="table-responsive mt-4">
        <table class="table table-bordered table-hover align-middle">
          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Tipo Doc</th>
              <th>N° Documento</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Funciones</th>
            </tr>
          </thead>
          <tbody id="tablaClientes"></tbody>
        </table>
      </div>
    </div>

    <!-- Divider -->
    <hr class="my-5" />

    <!-- Sección de Registro de Visita -->
    <div id="container" class="p-4 border rounded bg-light">
      <h4 class="mb-4 text-center">Registrar Visita</h4>
      <form id="formRegistro" class="row g-3">
        <div class="col-md-4">
          <input type="text" name="nombre" placeholder="Nombre" class="form-control" required />
        </div>
        <div class="col-md-4">
          <input type="email" name="email" placeholder="Email" class="form-control" required />
        </div>
        <div class="col-md-4">
          <input type="date" name="fecha" class="form-control" required />
        </div>
        <div class="col-md-12">
          <input type="text" name="motivo" placeholder="Motivo de la visita" class="form-control" required />
        </div>
        <div class="text-center mt-3">
          <button type="submit" class="btn btn-success px-5">Guardar Visita</button>
        </div>
      </form>

      <!-- Aquí podrías agregar una tabla de visitas más adelante -->
    </div>

    <!-- Modal de Edición de Cliente -->
    ... <!-- Tu modalEditarCliente permanece igual -->
  `;

  app.innerHTML = view;

  // Eventos
  const form = document.getElementById(`formRegistrarCliente`);
  document.getElementById(`formRegistrarCliente`).addEventListener('submit', registrarCliente);
 
  document.getElementById("formRegistro").addEventListener("submit", registrarVisita);

  cargarClientes(Lista_cliente);


  document.getElementById("formEditarCliente").addEventListener("submit", actualizarCliente);
}


async function registrarCliente(e) {
    e.preventDefault();
  
    const data = {
      nombre: document.getElementById("nombre").value.trim(),
      documento_tipo: document.getElementById("documento_tipo").value,
      documento_numero: document.getElementById("documento_numero").value.trim(),
      telefono: document.getElementById("telefono").value.trim(),
      direccion: document.getElementById("direccion").value.trim(),
    };
  
    // Validación simple
    if (!data.nombre || !data.documento_tipo || !data.documento_numero || !data.telefono) {
      alert("Por favor, complete los campos obligatorios.");
      return;
    }
  
    try {
      const response = await fetch("https://apicon-sa5n.onrender.com/cliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Error al registrar cliente");
      }
  
      const result = await response.json();
      console.log(result);
      alert(result.success ? "Cliente registrado correctamente" : "Error: " + result.error);
  
      // Recargar lista después de registrar
      const responseGET = await fetch("https://apicon-sa5n.onrender.com/cliente");
      const listaClientes = await responseGET.json();
      cargarClientes(listaClientes); // Esta función debes definirla como hiciste con `cargarCoches`
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      alert("Error en la conexión con el servidor.");
    }
  }
  
  


async function registrarVisita(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());

  try {
    const response = await fetch('http://localhost:3000/visitas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      alert('✅ Visita registrada correctamente');
      e.target.reset();
    } else {
      alert('❌ Error al registrar visita: ' + result.error);
    }
  } catch (error) {
    console.error('Error al enviar la visita:', error);
    alert('❌ No se pudo conectar con el servidor');
  }
}



  async function cargarClientes(data) {
    try {
      if (data.success && Array.isArray(data.resultado)) {
        const tabla = document.getElementById("tablaClientes");
        tabla.innerHTML = ""; // Limpiar tabla
  
        data.resultado.forEach(cliente => {
          const fila = document.createElement("tr");
          fila.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.documento_tipo}</td>
            <td>${cliente.documento_numero}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.direccion}</td>
            <td>
              <button class="btn btn-sm btn-warning me-2" data-id="${cliente.id}" data-action="editar">Editar</button>
              <button class="btn btn-sm btn-danger" data-id="${cliente.id}" data-action="eliminar">Eliminar</button>
            </td>
          `;
          tabla.appendChild(fila);
  
          fila.querySelectorAll("button").forEach(btn => {
            btn.addEventListener("click", async () => {
              const id = btn.dataset.id;
              const action = btn.dataset.action;
  
              if (action === "eliminar") {
                if (confirm("¿Estás seguro de que quieres eliminar este cliente?")) {
                  await eliminarCliente(id);
                }
              } else if (action === "editar") {
                await editarCliente(id);
              }
            });
          });
        });
      } else {
        console.error("La API no devolvió datos válidos:", data);
        alert("No se pudieron cargar los clientes. Verifica la respuesta del servidor.");
      }
    } catch (error) {
      console.error("Error al cargar clientes:", error);
      alert("Error al conectar con el servidor.");
    }
  }
  
  async function eliminarCliente(id) {
    try {
      const response = await fetch(`https://apicon-sa5n.onrender.com/cliente/${id}`, {
        method: "DELETE"
      });
  
      const result = await response.json();
      alert(result.success ? "Cliente eliminado correctamente." : "Error al eliminar cliente: " + result.error);
  
      const responseGET = await fetch("https://apicon-sa5n.onrender.com/cliente");
      const lista = await responseGET.json();
      cargarClientes(lista);
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      alert("Error al conectar con el servidor.");
    }
  }
  
  async function editarCliente(id) {
    try {
      const res = await fetch(`https://apicon-sa5n.onrender.com/cliente/${id}`);
      console.log("Respuesta:", res);
  
      if (!res.ok) {
        throw new Error(`Respuesta no OK: ${res.status}`);
      }
  
      const data = await res.json();
      console.log("Data:", data);
  
      if (data.success && data.resultado) {
        const cliente = data.resultado;
        console.log("Cliente:", cliente);
  
        document.getElementById("edit_id_cliente").value = cliente.id;
        document.getElementById("edit_nombre").value = cliente.nombre;
        document.getElementById("edit_documento_tipo").value = cliente.documento_tipo;
        document.getElementById("edit_documento_numero").value = cliente.documento_numero;
        document.getElementById("edit_telefono").value = cliente.telefono;
        document.getElementById("edit_direccion").value = cliente.direccion;
  
        const modalElement = document.getElementById("modalEditarCliente");
        modalEditar = bootstrap.Modal.getOrCreateInstance(modalElement);
        modalEditar.show();
      } else {
        alert("No se pudo cargar el cliente para editar.");
      }
    } catch (err) {
      console.error("Error al cargar datos del cliente:", err);
      alert("Error al obtener los datos del cliente.");
    }
  }
  
  
  
  
  async function actualizarCliente(e) {
    e.preventDefault();
  
    const data = {
      id_cliente: parseInt(document.getElementById("edit_id_cliente").value),
      nombre: document.getElementById("edit_nombre").value,
      documento_tipo: document.getElementById("edit_documento_tipo").value,
      documento_numero: document.getElementById("edit_documento_numero").value,
      telefono: document.getElementById("edit_telefono").value,
      direccion: document.getElementById("edit_direccion").value,
    };
  
    try {
      const response = await fetch(`https://apicon-sa5n.onrender.com/cliente/${data.id_cliente}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (result.success) {
        alert("Cliente actualizado correctamente.");
        modalEditar.hide();
        const res = await fetch("https://apicon-sa5n.onrender.com/cliente");
        const lista = await res.json();
        cargarClientes(lista);
      } else {
        alert("Error al actualizar el cliente: " + result.error);
      }
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
      alert("Error en la conexión con el servidor.");
    }
  }
  
  
  



