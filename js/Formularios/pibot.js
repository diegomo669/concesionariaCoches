export function formularioPibot() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <h1>Registrar Modelo de Coche</h1>
      <form id="formulario">
          <label for="modelo">Modelo del Coche:</label>
          <input type="text" id="modelo" required><br>
  
          <label for="posicion">Posición:</label>
          <input type="number" id="posicion" required><br>
  
          <label for="valor">Valor:</label>
          <input type="number" id="valor" required><br>
  
          <button type="submit">Guardar</button>
      </form>
      <p id="mensaje"></p>
      <button id="mostrar-lista">Mostrar lista</button>
      <div id="lista-autos"></div>
    `;
  
    document.getElementById('formulario').onsubmit = async (e) => {
      e.preventDefault();
      const modelo = document.getElementById("modelo").value.trim();
      const posicion = parseInt(document.getElementById("posicion").value);
      const valor = parseFloat(document.getElementById("valor").value);
  
      if (!modelo || isNaN(posicion) || isNaN(valor)) {
        document.getElementById("mensaje").textContent = "Todos los campos son obligatorios y válidos.";
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:3000/coches`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ modelo, posicion, valor })
        });
  
        const data = await response.json();
        const mensaje = document.getElementById("mensaje");
  
        if (data.success) {
          mensaje.style.color = "green";
          mensaje.textContent = "Coche agregado exitosamente.";
        } else {
          mensaje.style.color = "red";
          mensaje.textContent = "Error al agregar coche.";
        }
      } catch (error) {
        console.error("Error al hacer fetch:", error);
        document.getElementById("mensaje").textContent = "Error al conectar con el servidor.";
      }
    };

    document.getElementById("mostrar-lista").addEventListener("click", async () => {
        const response = await fetch("http://localhost:3000/coches");
        const data = await response.json();
        const listaAutos = document.getElementById("lista-autos");
        console.log(data)
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
  