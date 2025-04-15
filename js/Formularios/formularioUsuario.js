export function formularioUsuario() {
  const app = document.getElementById('app');


  app.innerHTML = `
    <div id="container">
      <h2>Formulario Usuario</h2>
      <form id="formValidacion">
        <input type="email" id="emailValidar" placeholder="Email" required />
        <button type="submit" class="btn btn-warning">Validar Correo</button>
      </form>


      <div id="codigoSeccion" class="mt-3" style="display: none;">
        <input type="text" id="codigoIngreso" placeholder="Ingresa el código de verificación">
        <button id="verificarCodigo" class="btn btn-success">Verificar Código</button>
      </div>


      <form id="formUsuario" style="display: none;" class="mt-4">
        <input type="text" name="nombre" placeholder="Nombre" required />
        <input type="email" name="email" id="emailFinal" readonly />
        <input type="tel" name="telefono" placeholder="Teléfono" required />


        <label for="preferencia">Auto Preferido:</label>
        <select name="preferencia" class="form-select" required>
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


  let emailTemporal = "";
  let codigoEnviado = "";


  document.getElementById('formValidacion').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('emailValidar').value.trim();


    try {
      const res = await fetch('http://localhost:3000/verificar-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });


      const data = await res.json();


      if (data.success) {
        codigoEnviado = data.codigo;
        emailTemporal = email;
        document.getElementById('codigoSeccion').style.display = 'block';
        alert('Se ha enviado un código de verificación a tu correo.');
      } else {
        alert('No se pudo enviar el correo. Intenta nuevamente.');
      }
    } catch (err) {
      console.error('Error al validar correo:', err);
    }
  });


  document.getElementById('verificarCodigo').addEventListener('click', () => {
    const codigoIngresado = document.getElementById('codigoIngreso').value.trim();


    if (codigoIngresado === codigoEnviado) {
      document.getElementById('formUsuario').style.display = 'block';
      document.getElementById('emailFinal').value = emailTemporal;
      alert('Correo verificado correctamente.');
    } else {
      alert('Código incorrecto.');
    }
  });


  document.getElementById('formUsuario').onsubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());


    try {
      const res = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });


      const result = await res.json();
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
    }
  };
}


