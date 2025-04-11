export function formularioUsuario() {
    const app = document.getElementById('app');
    app.innerHTML = `
     <div id="container">
      <h2>Formulario Usuario</h2>
      <form id="formUsuario">
        <input type="text" name="nombre" placeholder="Nombre" required />
        <input type="email" name="email" placeholder="Email" required />
        <button type="submit">Guardar</button>
      </form>
        </div>
        <table>

    `;
  
    document.getElementById('formUsuario').onsubmit = (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target).entries());
      alert(`Usuario: ${data.nombre} - ${data.email}`);
    };
  }
  