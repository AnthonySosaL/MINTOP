// navbargestion.js

document.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navGestContainer");
  let currentRow = null; // Para manejar la fila en edición
  let currentModalId = null; // Para identificar el modal activo

  // Carga dinámica del HTML parcial
  fetch("../componentes/navbargestion.html")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error al cargar navbargestion.html: ${res.status}`);
      }
      return res.text();
    })
    .then((html) => {
      // Inserta el HTML cargado dinámicamente en el contenedor
      navbarContainer.innerHTML = html;

      // Ejecuta el código que interactúa con los elementos cargados
      inicializarEventos();
    })
    .catch((err) => {
      console.error("Error cargando navbargestion.html:", err);
    });

  // Función para inicializar eventos y lógica después de cargar el HTML
  function inicializarEventos() {
    // Evento para el botón "Cerrar Sesión"
    const logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        window.location.href = "/";
      });
    }

    // Datos simulados (sin backend)
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
            nombreComputador: "PC-01",
            puntoRed: "P-1234",
          },
          {
            tipo: "Teléfono",
            mac: "00:AA:BB:CC:DD:EE",
            ip: "10.0.0.2",
            extension: "101",
            modelo: "Cisco-2020",
            puntoRed: "P-1235",
          },
          {
            tipo: "Laptop Alámbrica",
            mac: "11:22:33:44:77:88",
            ip: "10.0.0.6",
            nombreLaptop: "LaptopAlambrica-01",
            puntoRed: "P-1240",
          },
          {
            tipo: "Laptop Inalámbrica",
            mac: "11:22:33:44:66:77",
            ip: "10.0.0.3",
            nombreLaptop: "LaptopInalambrica-01",
            puntoRed: "P-1236",
          },
          {
            tipo: "Tablet",
            mac: "44:55:66:77:88:99",
            ip: "10.0.0.5",
            nombre: "Tablet-01",
            ap: "AP-01",
          },
          {
            tipo: "Impresora",
            mac: "33:44:55:66:77:88",
            ip: "10.0.0.4",
            nombre: "Printer-01",
            modelo: "HP-1234",
            puntoRed: "P-5678",
          },
        ],
      },
    ];
    

    // Formulario de búsqueda
    const formBuscar = document.getElementById("formBuscar");
    formBuscar.addEventListener("submit", (event) => {
      event.preventDefault();

      const valorBusqueda = document
        .getElementById("busqueda")
        .value.trim()
        .toLowerCase();

      limpiarTablasYSecciones();

      const usuarioEncontrado = usuariosData.find((u) =>
        [u.cedula, u.nombre.toLowerCase(), u.usuario.toLowerCase()].some((campo) =>
          campo.includes(valorBusqueda)
        )
      );

      if (!usuarioEncontrado) {
        alert("No se encontró ningún usuario con ese criterio de búsqueda");
        return;
      }

      rellenarTablaUsuario(usuarioEncontrado);

      usuarioEncontrado.equipos.forEach((eq) => {
        if (eq.tipo.toLowerCase() === "computador") {
          mostrarSeccion("seccionEquiposAlambricos");
          rellenarTablaConBotonComputador(eq);
        } else if (eq.tipo.toLowerCase() === "teléfono") {
          mostrarSeccion("seccionEquiposAlambricos");
          rellenarTablaConBotonTelefono(eq);
        } else if (eq.tipo.toLowerCase() === "impresora") {
          mostrarSeccion("seccionEquiposAlambricos");
          rellenarTablaConBotonImpresora(eq);
        } else if (eq.tipo.toLowerCase() === "laptop alámbrica") {
          mostrarSeccion("seccionEquiposAlambricos");
          rellenarTablaConBotonLaptopEP(eq); // Función específica para laptops alámbricas
        } else if (eq.tipo.toLowerCase() === "laptop inalámbrica") {
          mostrarSeccion("seccionEquiposInalambricos");
          rellenarTablaConBotonLaptop(eq); // Laptops inalámbricas
        } else if (eq.tipo.toLowerCase() === "tablet") {
          mostrarSeccion("seccionEquiposInalambricos");
          rellenarTablaConBotonTablet(eq);
        }
      });
      
      
    });
    document.getElementById("editarComputadorModal").addEventListener("show.bs.modal", (event) => {
      const button = event.relatedTarget;
      const tipo = button.getAttribute("data-tipo"); // Obtener tipo
      const mac = button.getAttribute("data-mac");
      const ip = button.getAttribute("data-ip");
      const nombreComputador = button.getAttribute("data-nombre-computador");
      const puntoRed = button.getAttribute("data-punto-red");
    
      console.log("Datos capturados para el modal Computador:", { tipo, mac, ip, nombreComputador, puntoRed });
    
      // Mostrar el tipo en el título del modal
      document.getElementById("editarComputadorModalLabel").textContent = `Editar ${tipo}`;
    
      document.getElementById("inputMacComputador").value = mac;
      document.getElementById("inputIpComputador").value = ip;
      document.getElementById("inputNombreComputador").value = nombreComputador;
      document.getElementById("inputPuntoRedComputador").value = puntoRed;
    });
    
    document.getElementById("editarTelefonoModal").addEventListener("show.bs.modal", (event) => {
      const button = event.relatedTarget;
      const mac = button.getAttribute("data-mac");
      const ip = button.getAttribute("data-ip");
      const extension = button.getAttribute("data-extension");
      const modelo = button.getAttribute("data-modelo");
      const puntoRed = button.getAttribute("data-punto-red");
    
      console.log("Datos capturados para el modal Teléfono:", { mac, ip, extension, modelo, puntoRed });
    
      document.getElementById("inputMacTelefono").value = mac;
      document.getElementById("inputIpTelefono").value = ip;
      document.getElementById("inputExtensionTelefono").value = extension;
      document.getElementById("inputModeloTelefono").value = modelo;
      document.getElementById("inputPuntoRedTelefono").value = puntoRed;
    });
    document.getElementById("editarLaptopModal").addEventListener("show.bs.modal", (event) => {
      const button = event.relatedTarget;
      const mac = button.getAttribute("data-mac");
      const ip = button.getAttribute("data-ip");
      const nombreLaptop = button.getAttribute("data-nombre-laptop");
      const puntoRed = button.getAttribute("data-punto-red");
    
      console.log("Datos capturados para el modal Laptop Alámbrica:", { mac, ip, nombreLaptop, puntoRed });
    
      document.getElementById("inputMacLaptop").value = mac;
      document.getElementById("inputIpLaptop").value = ip;
      document.getElementById("inputNombreLaptop").value = nombreLaptop;
      document.getElementById("inputPuntoRedLaptop").value = puntoRed;
    });
    document.getElementById("editarLaptopAlambricaModal").addEventListener("show.bs.modal", (event) => {
      const button = event.relatedTarget;
      const mac = button.getAttribute("data-mac");
      const ip = button.getAttribute("data-ip");
      const nombreLaptop = button.getAttribute("data-nombre-laptop");
      const puntoRed = button.getAttribute("data-punto-red");
    
      console.log("Datos capturados para el modal Laptop Alámbrica:", { mac, ip, nombreLaptop, puntoRed });
    
      document.getElementById("inputMacLaptopAlambrica").value = mac;
      document.getElementById("inputIpLaptopAlambrica").value = ip;
      document.getElementById("inputNombreLaptopAlambrica").value = nombreLaptop;
      document.getElementById("inputPuntoRedLaptopAlambrica").value = puntoRed;
    });
    
    
    document.getElementById("editarImpresoraModal").addEventListener("show.bs.modal", (event) => {
      const button = event.relatedTarget; // Botón que abrió el modal
    
      // Capturar datos de los atributos `data-*`
      const mac = button.getAttribute("data-mac");
      const ip = button.getAttribute("data-ip");
      const nombre = button.getAttribute("data-nombre");
      const modelo = button.getAttribute("data-modelo");
      const puntoRed = button.getAttribute("data-punto-red");
    
      console.log("Datos capturados para el modal Impresora:", { mac, ip, nombre, modelo, puntoRed });
    
      // Asignar los datos a los campos del formulario en el modal
      document.getElementById("inputMacImpresora").value = mac;
      document.getElementById("inputIpImpresora").value = ip;
      document.getElementById("inputNombreImpresora").value = nombre;
      document.getElementById("inputModeloImpresora").value = modelo;
      document.getElementById("inputPuntoRedImpresora").value = puntoRed;
    });
    
    document.getElementById("editarTabletModal").addEventListener("show.bs.modal", (event) => {
      const button = event.relatedTarget; // Botón que abrió el modal
    
      // Capturar datos de los atributos `data-*`
      const mac = button.getAttribute("data-mac");
      const ip = button.getAttribute("data-ip");
      const nombre = button.getAttribute("data-nombre");
      const ap = button.getAttribute("data-ap");
    
      console.log("Datos capturados para el modal Tablet:", { mac, ip, nombre, ap });
    
      // Asignar los datos a los campos del formulario en el modal
      document.getElementById("inputMacTablet").value = mac;
      document.getElementById("inputIpTablet").value = ip;
      document.getElementById("inputNombreTablet").value = nombre;
      document.getElementById("inputApTablet").value = ap;
    });
    
    
    
    

    // Manejo de eventos para modales
    document.getElementById("editarUsuarioModal").addEventListener("show.bs.modal", (event) => {
      const button = event.relatedTarget;
      const cedula = button.getAttribute("data-cedula");
      const nombre = button.getAttribute("data-nombre");
      const usuario = button.getAttribute("data-usuario");

      console.log("Datos capturados para el modal Usuario:", { cedula, nombre, usuario });

      document.getElementById("inputCedula").value = cedula;
      document.getElementById("inputNombre").value = nombre;
      document.getElementById("inputUsuario").value = usuario;
    });

    document.querySelectorAll('.btn-primary[id^="guardar"]').forEach((guardarBtn) => {
      guardarBtn.addEventListener("click", () => {
        const confirmarModal = new bootstrap.Modal(document.getElementById("confirmarModal"));
        confirmarModal.show();
        currentModalId = guardarBtn.closest(".modal").id;
      });
    });

    document.getElementById("confirmarGuardar").addEventListener("click", () => {
      if (!currentModalId) {
        console.error("No se identificó el modal activo para guardar.");
        return;
      }
    
      // Realizar la acción de guardar basada en el modal actual
      if (currentModalId === "editarUsuarioModal") {
        guardarUsuario();
      } else if (currentModalId === "editarComputadorModal") {
        guardarComputador();
      } else if (currentModalId === "editarTelefonoModal") {
        guardarTelefono();
      } else if (currentModalId === "editarLaptopModal") {
        guardarLaptop();
      }
    
      // Cerrar el modal actual después de guardar
      const activeModal = bootstrap.Modal.getInstance(document.getElementById(currentModalId));
      activeModal.hide();
    
      // También cerrar el modal de confirmación (si sigue visible)
      const confirmarModal = bootstrap.Modal.getInstance(document.getElementById("confirmarModal"));
      if (confirmarModal) {
        confirmarModal.hide();
      }
    
      // Resetear la variable currentModalId
      currentModalId = null;
    });
    
  }

  // Funciones auxiliares para limpiar y mostrar datos
  function limpiarTablasYSecciones() {
    document.querySelector("#tablaUsuario tbody").innerHTML = "";
    document.querySelector("#tablaComputadores tbody").innerHTML = "";
    document.querySelector("#tablaTelefonos tbody").innerHTML = "";
    document.querySelector("#tablaLaptops tbody").innerHTML = "";
    ocultarSeccion("seccionEquiposAlambricos");
    ocultarSeccion("seccionEquiposInalambricos");
  }

  function rellenarTablaUsuario(userObj) {
    const tbody = document.querySelector("#tablaUsuario tbody");
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${userObj.cedula}</td>
      <td>${userObj.nombre}</td>
      <td>${userObj.usuario}</td>
      <td>
        <button
          class="btn btn-success btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#editarUsuarioModal"
          data-cedula="${userObj.cedula}"
          data-nombre="${userObj.nombre}"
          data-usuario="${userObj.usuario}"
        >
          <i class="bi bi-pencil"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  }

  
  function rellenarTablaConBotonTablet(equipo) {
    const tbody = document.querySelector("#tablaTablets tbody");
    const tr = document.createElement("tr");
  
    tr.innerHTML = `
      <td>${equipo.mac}</td>
      <td>${equipo.ip}</td>
      <td>${equipo.nombre}</td>
      <td>${equipo.ap}</td>
      <td>
        <button
          class="btn btn-success btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#editarTabletModal"
          data-mac="${equipo.mac}"
          data-ip="${equipo.ip}"
          data-nombre="${equipo.nombre}"
          data-ap="${equipo.ap}"
        >
          <i class="bi bi-pencil"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  }
  function rellenarTablaConBotonTablet(equipo) {
    const tbody = document.querySelector("#tablaTablets tbody");
    const tr = document.createElement("tr");
  
    tr.innerHTML = `
      <td>${equipo.mac}</td>
      <td>${equipo.ip}</td>
      <td>${equipo.nombre}</td>
      <td>${equipo.ap}</td>
      <td>
        <button
          class="btn btn-success btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#editarTabletModal"
          data-mac="${equipo.mac}"
          data-ip="${equipo.ip}"
          data-nombre="${equipo.nombre}"
          data-ap="${equipo.ap}"
        >
          <i class="bi bi-pencil"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  }
  

  function rellenarTablaConBotonComputador(equipo) {
    const tbody = document.querySelector("#tablaComputadores tbody");
    const tr = document.createElement("tr");
  
    tr.innerHTML = `
      <td>${equipo.mac}</td>
      <td>${equipo.ip}</td>
      <td>${equipo.nombreComputador}</td>
      <td>${equipo.puntoRed}</td>
      <td>
        <button
          class="btn btn-success btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#editarComputadorModal"
          data-mac="${equipo.mac}"
          data-ip="${equipo.ip}"
          data-nombre-computador="${equipo.nombreComputador}"
          data-punto-red="${equipo.puntoRed}"
          data-tipo="Computador"
        >
          <i class="bi bi-pencil"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  }
  function rellenarTablaConBotonLaptopEP(equipo) {
    const tbody = document.querySelector("#tablaLaptopsEP tbody");
    const tr = document.createElement("tr");
  
    tr.innerHTML = `
      <td>${equipo.mac}</td>
      <td>${equipo.ip}</td>
      <td>${equipo.nombreLaptop}</td>
      <td>${equipo.puntoRed}</td>
      <td>
        <button
          class="btn btn-success btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#editarLaptopModal"
          data-mac="${equipo.mac}"
          data-ip="${equipo.ip}"
          data-nombre-laptop="${equipo.nombreLaptop}"
          data-punto-red="${equipo.puntoRed}"
          data-tipo="Laptop Alámbrica"
        >
          <i class="bi bi-pencil"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  }
  

  function rellenarTablaConBotonTelefono(equipo) {
    const tbody = document.querySelector("#tablaTelefonos tbody");
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${equipo.mac}</td>
      <td>${equipo.ip}</td>
      <td>${equipo.extension}</td>
      <td>${equipo.modelo}</td>
      <td>${equipo.puntoRed}</td>
      <td>
        <button
          class="btn btn-success btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#editarTelefonoModal"
          data-mac="${equipo.mac}"
          data-ip="${equipo.ip}"
          data-extension="${equipo.extension}"
          data-modelo="${equipo.modelo}"
          data-punto-red="${equipo.puntoRed}"
          data-tipo="Teléfono"

        >
          <i class="bi bi-pencil"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  }

  function rellenarTablaConBotonLaptop(equipo) {
    const tbody = document.querySelector("#tablaLaptops tbody");
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${equipo.mac}</td>
      <td>${equipo.ip}</td>
      <td>${equipo.nombreLaptop}</td>
      <td>${equipo.puntoRed}</td>
      <td>
        <button
          class="btn btn-success btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#editarLaptopModal"
          data-mac="${equipo.mac}"
          data-ip="${equipo.ip}"
          data-nombre-laptop="${equipo.nombreLaptop}"
          data-punto-red="${equipo.puntoRed}"
          data-tipo="Laptop"

        >
          <i class="bi bi-pencil"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  }
  function rellenarTablaConBotonImpresora(equipo) {
    const tbody = document.querySelector("#tablaImpresoras tbody");
    const tr = document.createElement("tr");
  
    tr.innerHTML = `
      <td>${equipo.mac}</td>
      <td>${equipo.ip}</td>
      <td>${equipo.nombre}</td>
      <td>${equipo.modelo}</td>
      <td>${equipo.puntoRed}</td>
      <td>
        <button
          class="btn btn-success btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#editarImpresoraModal"
          data-mac="${equipo.mac}"
          data-ip="${equipo.ip}"
          data-nombre="${equipo.nombre}"
          data-modelo="${equipo.modelo}"
          data-punto-red="${equipo.puntoRed}"
        >
          <i class="bi bi-pencil"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  }

  function mostrarSeccion(sectionID) {
    const seccion = document.getElementById(sectionID);
    if (seccion) {
      seccion.style.display = "block";
    }
  }

  function ocultarSeccion(sectionID) {
    const seccion = document.getElementById(sectionID);
    if (seccion) {
      seccion.style.display = "none";
    }
  }

  // Funciones para guardar cambios
  function guardarUsuario() {
    const cedula = document.getElementById("inputCedula").value;
    const nombre = document.getElementById("inputNombre").value;
    const usuario = document.getElementById("inputUsuario").value;

    console.log("Guardando cambios para Usuario:", { cedula, nombre, usuario });

  }

  function guardarComputador() {
    const mac = document.getElementById("inputMacComputador").value;
    const ip = document.getElementById("inputIpComputador").value;
    const nombreComputador = document.getElementById("inputNombreComputador").value;
    const puntoRed = document.getElementById("inputPuntoRedComputador").value;

    console.log("Guardando cambios para Computador:", { mac, ip, nombreComputador, puntoRed });

  }

  function guardarTelefono() {
    const mac = document.getElementById("inputMacTelefono").value;
    const ip = document.getElementById("inputIpTelefono").value;
    const extension = document.getElementById("inputExtensionTelefono").value;
    const modelo = document.getElementById("inputModeloTelefono").value;
    const puntoRed = document.getElementById("inputPuntoRedTelefono").value;

    console.log("Guardando cambios para Teléfono:", { mac, ip, extension, modelo, puntoRed });

  }

  function guardarLaptop() {
    const mac = document.getElementById("inputMacLaptop").value;
    const ip = document.getElementById("inputIpLaptop").value;
    const nombreLaptop = document.getElementById("inputNombreLaptop").value;
    const puntoRed = document.getElementById("inputPuntoRedLaptop").value;

    console.log("Guardando cambios para Laptop:", { mac, ip, nombreLaptop, puntoRed });

  }
});
