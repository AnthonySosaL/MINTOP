// FRONTEND/js/gestion.js
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
  
    if (!token || role !== 'gestor') {
      window.location.href = "/";
      return;
    }
  
    // Si hay token, hacemos fetch a la ruta protegida /api/gestion
    fetch("/api/gestion", {
      method: "GET",
      headers: {
        "x-auth-token": token
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("No autorizado");
      }
      return response.text();
    })
    .then(html => {
      // Insertar el HTML devuelto (o contenido que gustes)
      const gestionDiv = document.getElementById("gestionContent");
      gestionDiv.innerHTML = html;
    })
    .catch(error => {
      console.error(error);
      window.location.href = "/";
    });
  });
  