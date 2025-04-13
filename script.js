document.getElementById("btnSolicitarFactura").addEventListener("click", () => {
  document.getElementById("formulario").style.display = "block";
});

document.getElementById("btnGenerarFactura").addEventListener("click", () => {
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const chasis = document.getElementById("chasis").value;
  const precio = document.getElementById("precio").value;
  const fecha = document.getElementById("fecha").value;

  if (!marca || !modelo || !chasis || !precio || !fecha) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const detalles = `
    <strong>Marca:</strong> ${marca}<br>
    <strong>Modelo:</strong> ${modelo}<br>
    <strong>Nro Chasis:</strong> ${chasis}<br>
    <strong>Precio:</strong> $${precio}<br>
    <strong>Fecha de Compra:</strong> ${fecha}
  `;

  document.getElementById("detalleFactura").innerHTML = detalles;
  document.getElementById("factura").style.display = "block";
});

document.getElementById("btnEnviarCorreo").addEventListener("click", () => {
  alert("Simulación: La factura se ha enviado al correo electrónico.");
});
