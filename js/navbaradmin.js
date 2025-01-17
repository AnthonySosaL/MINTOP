document.addEventListener("DOMContentLoaded", () => {
    const navbarContainer = document.getElementById("navAdminContainer");
  
    // Carga dinámica del navbar admin
    fetch("../componentes/navbaradmin.html")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error al cargar navbaradmin.html: ${res.status}`);
        }
        return res.text();
      })
      .then((html) => {
        navbarContainer.innerHTML = html;
  
        // Evento para el botón "Cerrar Sesión"
        const logoutBtn = document.getElementById("logout");
        if (logoutBtn) {
          logoutBtn.addEventListener("click", () => {
            // Elimina tokens del localStorage
            localStorage.removeItem("authToken");
            localStorage.removeItem("userRole");
            // Redirige a la página principal
            window.location.href = "/";
          });
        }
      })
      .catch((err) => console.error("Error cargando navbaradmin.html:", err));
  });
  