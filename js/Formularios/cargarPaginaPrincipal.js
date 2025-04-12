export function cargarPaginaPrincipal() {
    const app = document.getElementById("app");
  
    app.innerHTML = `
      <h1>Bienvenido a la Concesionaria</h1>
      <p>Esta es la página de inicio.</p>
  
      <hr>
  
      <h2>Filtrar Coches por Tipo</h2>
      <form id="form-busqueda">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="Sedán" id="tipoSedan">
          <label class="form-check-label" for="tipoSedan">Sedán</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="SUV" id="tipoSUV">
          <label class="form-check-label" for="tipoSUV">SUV</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="Pickup" id="tipoPickup">
          <label class="form-check-label" for="tipoPickup">Pickup</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="Hatchback" id="tipoHatchback">
          <label class="form-check-label" for="tipoHatchback">Hatchback</label>
        </div>
        <button type="submit" class="btn btn-primary mt-3">Buscar</button>
      </form>
  
      <div id="resultadoBusqueda" class="mt-4"></div>
    `;
  
    document.getElementById("form-busqueda").addEventListener("submit", function (e) {
      e.preventDefault();
  
      const seleccionados = Array.from(document.querySelectorAll('input[type=checkbox]:checked'))
                                 .map(cb => cb.value);
  
      const resultado = document.getElementById("resultadoBusqueda");
      if (seleccionados.length === 0) {
        resultado.innerHTML = `<p>No seleccionaste ningún tipo de coche.</p>`;
      } else {
        resultado.innerHTML = `
          <p><strong>Buscando coches de tipo:</strong> ${seleccionados.join(", ")}</p>
        `;
        // Aquí podrías llamar al backend en el futuro si quieres filtrar de verdad
      }
    });
  }
  