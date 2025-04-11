export function formularioReservarCoche() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div id="container">
        <h2>Reservar Coche</h2>
        <form id="formReservarCoche">
          <input type="text" name="nombre" placeholder="Nombre del Cliente" required />
          <input type="text" name="modelo" placeholder="Modelo del Coche" required />
          <button type="submit">Reservar</button>
        </form>
      </div>
    `;

    document.getElementById('formReservarCoche').onsubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
        alert(`Reserva realizada para ${data.nombre} - Modelo: ${data.modelo}`);
    };

}