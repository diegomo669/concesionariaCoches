export async function formularioReservarCoche() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div id="container" class="container mt-4">
        <h2 class="text-center mb-4">Reservar Coche</h2>
        <form id="formReservarCoche" class="row g-3">
          <div class="col-md-6">
            <label for="nombre_cliente" class="form-label">Nombre del Cliente</label>
            <input type="text" id="nombre_cliente" name="nombre_cliente" class="form-control" placeholder="Nombre del Cliente" required />
          </div>
          <div class="col-md-6">
            <label for="apellido_paterno" class="form-label">Apellido Paterno (Opcional)</label>
            <input type="text" id="apellido_paterno" name="apellido_paterno" class="form-control" placeholder="Apellido Paterno" />
          </div>
          <div class="col-md-6">
            <label for="apellido_materno" class="form-label">Apellido Materno (Obligatorio)</label>
            <input type="text" id="apellido_materno" name="apellido_materno" class="form-control" placeholder="Apellido Materno" required/>
          </div>
          <div class="col-md-6">
            <label for="nro_documento" class="form-label">Nro Documento Identidad</label>
            <input type="text" id="nro_documento" name="nro_documento" class="form-control" placeholder="Nro Documento Identidad" required />
          </div>
          <div class="col-md-6">
            <label for="telefono" class="form-label">Teléfono</label>
            <input type="text" id="telefono" name="telefono" class="form-control" placeholder="Teléfono" />
          </div>
          <div class="col-md-6">
            <label for="gmail" class="form-label">Gmail</label>
            <input type="email" id="gmail" name="gmail" class="form-control" placeholder="Gmail" required />
          </div>
          <div class="col-md-6">
            <label for="monto_deposito" class="form-label">Monto de Depósito</label>
            <input type="number" id="monto_deposito" name="monto_deposito" class="form-control" placeholder="Monto de Depósito" value="300" required />
          </div>
          <div class="col-md-6">
            <label for="id_coche" class="form-label">Seleccione un Coche</label>
            <select id="id_coche" name="id_coche" class="form-select" required></select>
          </div>
          <div class="col-12 text-center">
            <button type="submit" class="btn btn-primary mt-3">Solicitar Reserva</button>
          </div>
        </form>
      </div>
    `;

    // Cargar opciones de coches desde la base de datos
    const selectCoche = document.getElementById('id_coche');
    try {
        const response = await fetch('http://localhost:3000/coche');
        const data = await response.json();
        if (data.success) {
            data.resultado.forEach(coche => {
                const option = document.createElement('option');
                option.value = coche.id_coche;
                option.textContent = `${coche.modelo} - ${coche.marca} (${coche.color})`;
                selectCoche.appendChild(option);
            });
        } else {
            alert('Error al cargar los coches.');
        }
    } catch (error) {
        console.error('Error al cargar coches:', error);
    }

    // Manejar el envío del formulario
    document.getElementById('formReservarCoche').onsubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
        try {
            const response = await fetch('http://localhost:3000/reservas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (result.success) {
                alert('Reserva realizada con éxito.');
            } else {
                alert('Error al realizar la reserva: ' + result.error);
            }
        } catch (error) {
            console.error('Error al enviar la reserva:', error);
        }
    };
}