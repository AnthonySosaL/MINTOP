document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
  
    // Validar que el usuario haya iniciado sesión y que su rol sea 'admin'
    if (!token || role !== 'admin') {
      window.location.href = "/";
      return;
    }
  
    // Datos precargados
    const data = [
      {
        rack: "Rack-1",
        sw: "SW-1",
        vlan: "100",
        puerto: "01",
        mac: "AA:BB:CC:DD:EE:FF",
        ip: "192.168.0.1",
        usuario: "Juan Pérez",
        cedula: "1234567890",
      },
      {
        rack: "Rack-2",
        sw: "SW-2",
        vlan: "200",
        puerto: "02",
        mac: "FF:EE:DD:CC:BB:AA",
        ip: "192.168.0.2",
        usuario: "María Gómez",
        cedula: "0987654321",
      },
      {
        rack: "Rack-3",
        sw: "SW-3",
        vlan: "300",
        puerto: "03",
        mac: "AA:AA:AA:AA:AA:AA",
        ip: "192.168.1.1",
        usuario: "Luis Martínez",
        cedula: "1122334455",
      },
      {
        rack: "Rack-4",
        sw: "SW-4",
        vlan: "400",
        puerto: "04",
        mac: "BB:BB:BB:BB:BB:BB",
        ip: "192.168.1.2",
        usuario: "Ana López",
        cedula: "2233445566",
      },
      {
        rack: "Rack-5",
        sw: "SW-5",
        vlan: "500",
        puerto: "05",
        mac: "CC:CC:CC:CC:CC:CC",
        ip: "192.168.2.1",
        usuario: "Carlos Sánchez",
        cedula: "3344556677",
      },
    ];
  
    // Referencias al DOM
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const resultsTableBody = document.querySelector("#resultsTable tbody");
  
    // Precargar datos
    function loadInitialData() {
      data.forEach((item) => {
        const row = `
          <tr>
            <td>${item.rack}</td>
            <td>${item.sw}</td>
            <td>${item.vlan}</td>
            <td>${item.puerto}</td>
            <td>${item.mac}</td>
            <td>${item.ip}</td>
            <td>${item.usuario}</td>
            <td>${item.cedula}</td>
          </tr>
        `;
        resultsTableBody.insertAdjacentHTML("beforeend", row);
      });
    }
  
    // Llamar a la función de precarga
    loadInitialData();
  
    // Evento de búsqueda
    searchButton.addEventListener("click", () => {
      const query = searchInput.value.trim().toLowerCase();
  
      // Filtrar datos
      const results = data.filter(
        (item) => item.mac.toLowerCase().includes(query) || item.ip.toLowerCase().includes(query)
      );
  
      // Limpiar tabla
      resultsTableBody.innerHTML = "";
  
      // Mostrar resultados
      results.forEach((item) => {
        const row = `
          <tr>
            <td>${item.rack}</td>
            <td>${item.sw}</td>
            <td>${item.vlan}</td>
            <td>${item.puerto}</td>
            <td>${item.mac}</td>
            <td>${item.ip}</td>
            <td>${item.usuario}</td>
            <td>${item.cedula}</td>
          </tr>
        `;
        resultsTableBody.insertAdjacentHTML("beforeend", row);
      });
  
      // Mensaje si no hay resultados
      if (results.length === 0) {
        resultsTableBody.innerHTML = `
          <tr>
            <td colspan="8" class="text-center">No se encontraron resultados</td>
          </tr>
        `;
      }
    });
  });
  