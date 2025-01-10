// FRONTEND/js/navbargestion.js
document.addEventListener("DOMContentLoaded", () => {
    const navbarContainer = document.getElementById("navGestContainer");
  
    // 1. Cargar el HTML del navbar + form + tablas separadas
    fetch("../componentes/navbargestion.html")
      .then((res) => res.text())
      .then((html) => {
        navbarContainer.innerHTML = html;
  
        // 2. Botón Cerrar Sesión
        const logoutBtn = document.getElementById("logout");
        if (logoutBtn) {
          logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("userRole");
            window.location.href = "/";
          });
        }
  
        // 3. Array de PRUEBA con datos de usuarios y sus equipos
        // Cada equipo tiene un "tipo" que usaremos para decidir a qué tabla va
        const usuariosData = [
          {
            cedula: "1029384756",
            nombre: "Ejemplo Persona",
            usuario: "e.persona",
            equipos: [
              {
                tipo: "Computador",
                mac: "00:11:22:33:44:55",
                ip: "10.0.0.1",
                puntoRed: "P-1234",
                // Campos extra (CPU, Disco, etc.) a futuro
              },
              {
                tipo: "Teléfono",
                mac: "00:AA:BB:CC:DD:EE",
                ip: "10.0.0.2",
                puntoRed: "P-1235",
                // Campos extra (extensión, modelo, etc.)
              },
              {
                tipo: "Laptop",
                mac: "00:99:88:77:66:55",
                ip: "10.0.0.3",
                puntoRed: "P-1236",
                // Campos extra
              },
              {
                tipo: "Impresora",
                mac: "00:FF:FF:FF:FF:FF",
                ip: "10.0.0.20",
                puntoRed: "P-1250",
                // Campos extra (tipo tóner, etc.)
              },
            ],
          },
          {
            cedula: "20775566",
            nombre: "Juan Pérez",
            usuario: "jperez",
            equipos: [
              {
                tipo: "Computador",
                mac: "11:22:33:44:55:66",
                ip: "192.168.1.10",
                puntoRed: "P-9999",
              },
              {
                tipo: "Teléfono",
                mac: "AA:BB:CC:DD:EE:FF",
                ip: "192.168.1.11",
                puntoRed: "P-9998",
              },
              // A este usuario no le asignamos laptop ni impresora
            ],
          },
        ];
  
        // 4. Manejo del formulario de búsqueda
        const formBuscar = document.getElementById("formBuscar");
        formBuscar.addEventListener("submit", (event) => {
          event.preventDefault();
          const valorBusqueda = document
            .getElementById("busqueda")
            .value.trim()
            .toLowerCase();
  
          // Filtramos en el array de usuarios
          // (Match en cédula, nombre o usuario)
          const usuarioEncontrado = usuariosData.find((u) => {
            const cedulaLow = u.cedula.toLowerCase();
            const nombreLow = u.nombre.toLowerCase();
            const userLow = u.usuario.toLowerCase();
            return (
              cedulaLow.includes(valorBusqueda) ||
              nombreLow.includes(valorBusqueda) ||
              userLow.includes(valorBusqueda)
            );
          });
  
          // Limpiar tablas antes de insertar nuevas filas
          limpiarTablasYSecciones();
  
          if (!usuarioEncontrado) {
            alert("No se encontró ningún usuario con ese criterio de búsqueda");
            return;
          }
  
          // Rellenar tabla de USUARIO
          rellenarTablaUsuario(usuarioEncontrado);
  
          // Procesar equipos por tipo
          usuarioEncontrado.equipos.forEach((eq) => {
            const tipo = eq.tipo.toLowerCase(); // ej: "computador", "teléfono", "laptop", "impresora"
            switch (tipo) {
              case "computador":
                mostrarSeccion("seccionComputadores");
                rellenarTabla(
                  "tablaComputadores",
                  eq.mac,
                  eq.ip,
                  eq.puntoRed
                );
                break;
  
              case "teléfono":
              case "telefono": // por si se escribe sin tilde
                mostrarSeccion("seccionTelefonos");
                rellenarTabla("tablaTelefonos", eq.mac, eq.ip, eq.puntoRed);
                break;
  
              case "laptop":
                mostrarSeccion("seccionLaptops");
                rellenarTabla("tablaLaptops", eq.mac, eq.ip, eq.puntoRed);
                break;
  
              case "impresora":
                mostrarSeccion("seccionImpresoras");
                rellenarTabla("tablaImpresoras", eq.mac, eq.ip, eq.puntoRed);
                break;
  
              default:
                console.warn("Tipo de equipo no reconocido:", eq.tipo);
                break;
            }
          });
        });
  
        // Funciones auxiliares:
        function limpiarTablasYSecciones() {
          // Limpia las tablas
          document.querySelector("#tablaUsuario tbody").innerHTML = "";
          document.querySelector("#tablaComputadores tbody").innerHTML = "";
          document.querySelector("#tablaTelefonos tbody").innerHTML = "";
          document.querySelector("#tablaLaptops tbody").innerHTML = "";
          document.querySelector("#tablaImpresoras tbody").innerHTML = "";
          // Oculta secciones
          ocultarSeccion("seccionComputadores");
          ocultarSeccion("seccionTelefonos");
          ocultarSeccion("seccionLaptops");
          ocultarSeccion("seccionImpresoras");
        }
  
        function rellenarTablaUsuario(userObj) {
          const tbody = document.querySelector("#tablaUsuario tbody");
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${userObj.cedula}</td>
            <td>${userObj.nombre}</td>
            <td>${userObj.usuario}</td>
          `;
          tbody.appendChild(tr);
        }
  
        function rellenarTabla(tablaID, mac, ip, puntoRed) {
          const tbody = document.querySelector(`#${tablaID} tbody`);
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${mac}</td>
            <td>${ip}</td>
            <td>${puntoRed}</td>
          `;
          tbody.appendChild(tr);
        }
  
        function mostrarSeccion(sectionID) {
          document.getElementById(sectionID).style.display = "block";
        }
  
        function ocultarSeccion(sectionID) {
          document.getElementById(sectionID).style.display = "none";
        }
      })
      .catch((err) => {
        console.error("Error cargando navbargestion.html:", err);
      });
  });
  