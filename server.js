const express = require("express");
const { getPackedSettings } = require("http2");
const path = require("path");

const app = express();
const PORT = 8080;

// Servir archivos estáticos (CSS, JS, etc.)
app.use(express.static(path.join(__dirname)));

// Ruta principal (login)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "paginas", "login.html"));
});

// Ruta para servir la PÁGINA de gestión (HTML “vacío”, sin datos sensibles).
// Aquí no validamos nada todavía, solo devolvemos el HTML con <script> que hará el fetch protegido.
app.get("/gestion", (req, res) => {
  res.sendFile(path.join(__dirname, "paginas", "gestion.html"));
});

// Ruta protegida de verdad, donde se exigen credenciales (aquí simuladas).
app.get("/api/gestion", (req, res) => {
  const token = req.headers["x-auth-token"];

  // Si no mandan encabezado "x-auth-token", es no autorizado
  if (!token) {
    return res.status(401).send("Acceso no autorizado. Por favor, inicie sesión.");
  }

  // (En un entorno real, aquí validarías el token con JWT, base de datos, etc.)
  console.log("Token recibido:", token);

});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).send("Página no encontrada");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});