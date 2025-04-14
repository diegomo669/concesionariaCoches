export function formularioUsuario() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div id="container">
      <h2>Formulario Usuario</h2>
      <form id="formUsuario">
        <input type="text" name="nombre" placeholder="Nombre" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="tel" name="telefono" placeholder="Teléfono" required />

        <label for="preferencia">Auto Preferido:</label>
        <select name="preferencia" id="preferencia" class="form-select" required>
          <option value="" disabled selected>Seleccione un auto</option>
          <option value="Sedán">Sedán</option>
          <option value="SUV">SUV</option>
          <option value="Pickup">Pickup</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Deportivo">Deportivo</option>
        </select>

        <button type="submit" class="btn btn-primary mt-3">Guardar</button>
      </form>

      <div id="resultadoUsuario" class="mt-4"></div>
    </div>
  `;

  document.getElementById('formUsuario').onsubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      const resultado = document.getElementById("resultadoUsuario");

      if (result.success) {
        resultado.innerHTML = `
          <h4>Usuario Registrado:</h4>
          <p><strong>Nombre:</strong> ${data.nombre}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Teléfono:</strong> ${data.telefono}</p>
          <p><strong>Preferencia:</strong> ${data.preferencia}</p>
        `;
      } else {
        resultado.innerHTML = `<p style="color:red;">Error al registrar usuario.</p>`;
      }
    } catch (error) {
      console.error('Error al enviar usuario:', error);
      document.getElementById("resultadoUsuario").innerHTML = `<p style="color:red;">Error al conectar con el servidor.</p>`;
    }
  };
}
