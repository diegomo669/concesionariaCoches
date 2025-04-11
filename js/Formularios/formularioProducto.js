export function formularioProducto() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <h2>Formulario Producto</h2>
      <form id="formProducto">
        <input type="text" name="modelo" placeholder="Modelo" required />
        <input type="number" name="valor" placeholder="Valor" required />
        <button type="submit">Registrar</button>
      </form>
    `;
  
    document.getElementById('formProducto').onsubmit = (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target).entries());
      alert(`Producto: ${data.modelo} - $${data.valor}`);
    };
  }
  