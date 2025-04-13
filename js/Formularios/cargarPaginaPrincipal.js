export function as() {
    const app = document.getElementById("app");
  
    app.innerHTML = `
     
    `;
  
    
  }
  


let app = "";


let Lista_coche = [];
let list_modelo = [];
let list_marca = [];
let list_tipo = [];
let list_tipoCombustible = [];
let list_estadocoche = [];
let modalEditar; // Global dentro de la función principal



export async function cargarPaginaPrincipal() {
  
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
    app.innerHTML = view;
    
    
   
    cargarCoches(Lista_coche);
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



async function cargarCoches(data) {
  try {
    if (data.success && Array.isArray(data.resultado)) {
      const contenedor = document.getElementById("resultadoBusqueda");
      contenedor.innerHTML = ""; // Limpiar antes de renderizar

      // Usamos un row de Bootstrap para alinear las cards
      const row = document.createElement("div");
      row.className = "row row-cols-1 row-cols-md-3 g-4";

      data.resultado.forEach(coche => {
        const col = document.createElement("div");
        col.className = "col";

        const card = document.createElement("div");
        card.className = "card h-100 shadow-sm";

        // Imagen dummy (puedes cambiar la URL a una real)
        const img = document.createElement("img");
        img.src = "https://via.placeholder.com/300x200?text=Coche";
        img.className = "card-img-top";
        img.alt = "Foto del coche";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        cardBody.innerHTML = `
          <h5 class="card-title">${coche.marca || coche.id_marca} - ${coche.modelo || coche.id_modelo}</h5>
          <p class="card-text">
            <strong>Tipo:</strong> ${coche.tipo_vehiculo || coche.id_tipo_vehiculo}<br>
            <strong>Combustible:</strong> ${coche.tipo_combustible || coche.id_tipo_combustible}<br>
            <strong>Estado:</strong> ${coche.estado_vehiculo || coche.id_estado_vehiculo}<br>
            <strong>Color:</strong> ${coche.color}<br>
            <strong>Kilometraje:</strong> ${coche.kilometraje} km<br>
            <strong>Puertas:</strong> ${coche.num_puertas} | <strong>Asientos:</strong> ${coche.num_asientos}
          </p>
          <button class="btn btn-primary" onclick="vender(${coche.id_coche})">Seleccionar</button>
        `;

        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        row.appendChild(col);
      });

      contenedor.appendChild(row);
    } else {
      console.error("La API no devolvió datos válidos:", data);
      alert("No se pudieron cargar los coches. Verifica la respuesta del servidor.");
    }
  } catch (error) {
    console.error("Error al cargar coches:", error);
    alert("Error al conectar con el servidor.");
  }
}


  



