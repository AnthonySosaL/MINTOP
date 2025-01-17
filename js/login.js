document.addEventListener('DOMContentLoaded', () => {
  // Cargar la barra de navegación
  fetch('../componentes/navbar.html')
    .then((res) => res.text())
    .then((html) => {
      document.getElementById('navbar').innerHTML = html;

      // Asegúrate de que los estilos se actualicen correctamente después de cargar la navbar
      const navbar = document.querySelector('nav.navbar');
      if (navbar) {
        navbar.classList.add('bg-primary');
      }
    });

  // Mostrar/ocultar contraseña
  const passwordField = document.getElementById('password');
  const togglePassword = document.getElementById('togglePassword');

  togglePassword.addEventListener('click', function () {
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.classList.toggle('bi-eye');
    this.classList.toggle('bi-eye-slash');
  });

  // Datos de prueba
  const users = [
    { username: 'gestor', password: '12345', role: 'gestor' },
    { username: 'admin', password: 'admin123', role: 'admin' }
  ];

  // Función para mostrar modal
  const showModal = (message) => {
    const modalBody = document.getElementById('notificationModalBody');
    modalBody.textContent = message;
    const modal = new bootstrap.Modal(document.getElementById('notificationModal'));
    modal.show();
  };

  // Manejo de login
  document.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();

    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      // Simular un token “falso”
      const token = `${user.username}-${Date.now()}`;

      // Guardar en localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', user.role);

      // Solo el rol "gestor" ingresa
      if (user.role === 'gestor') {
        window.location.href = '/gestion';
      } else if (user.role === 'admin') {
          window.location.href = '/admin';
      } else {
          showModal('Rol no autorizado para esta acción.');
      }
    
    } else {
      showModal('Usuario o contraseña incorrectos.');
    }
  });
});
