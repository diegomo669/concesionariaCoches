document.getElementById("formulario").addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita que la página se recargue

    const modelo = document.getElementById("modelo").value;
    const posicion = document.getElementById("posicion").value;
    const valor = document.getElementById("valor").value;

    const response = await fetch("http://localhost:3000/agregar-coche", {
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
});

// Mostrar la lista de autos
document.getElementById("mostrar-lista").addEventListener("click", async () => {
    const response = await fetch("http://localhost:3000/listar-coches");
    const data = await response.json();
    const listaAutos = document.getElementById("lista-autos");

    if (data.success) {
        listaAutos.innerHTML = "<h2>Lista de Autos</h2>";
        data.coches.forEach(coche => {
            listaAutos.innerHTML += `<p><strong>${coche.modelo}</strong> - Posición: ${coche.posicion}, Valor: ${coche.valor}</p>`;
        });
    } else {
        listaAutos.innerHTML = "<p style='color:red;'>Error al obtener la lista de autos.</p>";
    }
});
