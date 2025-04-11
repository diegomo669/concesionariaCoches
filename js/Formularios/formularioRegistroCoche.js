export async function formularioRegistroCoche() {
    const app = document.getElementById('app');
    app.innerHTML = `
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
                </tr>
                </thead>
                <tbody id="tablaCoches">
                <!-- Filas dinámicas aquí -->
                </tbody>
            </table>
        </div>



    `;
  
    async function cargarSelect(url, selectId, labelField = "nombre", valueField = "id") {
        try {
          const res = await fetch(url);
          const data = await res.json();
          const select = document.getElementById(selectId);
          select.innerHTML = '<option value="">Seleccione</option>';
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
 
      await cargarSelect("http://localhost:3000/modelo", "id_modelo", "modelo_coche", "id_modelo");
      await cargarSelect("http://localhost:3000/marca", "id_marca", "marca_coche", "id_marca");
      await cargarSelect("http://localhost:3000/tipo", "id_tipo_vehiculo", "tipo", "id_tipo_vehiculo");
      await cargarSelect("http://localhost:3000/tipocombustible", "id_tipo_combustible", "combustible", "id_tipo_combustible");
      await cargarSelect("http://localhost:3000/estadocoche", "id_estado_vehiculo", "estado", "id_estado_vehiculo");
  
      // Carga la tabla de coches (con await)
      await cargarCoches();
  
      // Evento submit del formulario
      

    document.getElementById("formRegistrarCoche").addEventListener("submit", async function (e) {
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
    
        try {
        const response = await fetch("http://localhost:3000/coche", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
    
        const result = await response.json();
        console.log(result);
        alert(result.success ? "Coche registrado correctamente" : "Error: " + result.error);
        } catch (error) {
        console.error("Error al enviar formulario:", error);
        alert("Error en la conexión con el servidor.");
        }
    });

    async function cargarCoches() {
        try {
            const response = await fetch("http://localhost:3000/coche");
            const data = await response.json();
            console.log("Respuesta de la API:", data); // Para depuración
    
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
                    `;
                    tabla.appendChild(fila);
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
}