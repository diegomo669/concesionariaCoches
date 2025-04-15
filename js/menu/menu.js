export function crearMenu(acciones) {
    const menu = document.getElementById('menu');
    const toggleBtn = document.getElementById('toggleMenu');
    const sidebar = document.getElementById('sidebar');
  
    menu.innerHTML = '';
  
    const botones = [
      { texto: 'pibot', accion: 'pibot' },
      { texto: 'Formulario Usuario', accion: 'usuario' },
      { texto: 'Formulario Producto', accion: 'producto' },
      { texto: 'Registrar Coche', accion: 'registrarcoche' },
      { texto: 'Reservar Coche', accion: 'reservarcoche' },
      { texto: 'Registrar Cliente', accion: 'registrocliente' },
      { texto: 'Solicitar factura', accion: 'factura' },
    ];
  
    botones.forEach(btn => {
      const a = document.createElement('a');
      a.href = '#';
      a.className = 'nav-link';
      a.textContent = btn.texto;
      a.onclick = (e) => {
        e.preventDefault();
        acciones[btn.accion]();
        sidebar.classList.add('oculto'); // oculta el menú al hacer clic
      };
      menu.appendChild(a);
    });
  
    toggleBtn.onclick = () => {
      sidebar.classList.toggle('oculto');
    };
  }

  