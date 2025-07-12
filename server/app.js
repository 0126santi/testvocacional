const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const guardarEnExcel = require("./excel-handler");
const fs = require("fs");

const app = express();

// 👉 Servir frontend
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/data", express.static(path.join(__dirname, "../public/data")));

// 👉 Recibir respuestas y guardar en Excel
app.post("/api/guardar", (req, res) => {
  const datos = req.body;
  console.log("📥 Respuesta recibida:", datos);
  try {
    guardarEnExcel(datos);
    res.send({ status: "ok" });
  } catch (error) {
    console.error("❌ Error al guardar en Excel:", error);
    res.status(500).send({ status: "error", error: error.message });
  }
});

// 👉 Ruta pública para descargar el Excel
app.get("/descargar", (req, res) => {
  const ruta = path.join(__dirname, "../resultados.xlsx");
  if (fs.existsSync(ruta)) {
    res.download(ruta);
  } else {
    res.status(404).send("Archivo no encontrado");
  }
});

// 👉 Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor activo en http://localhost:${PORT}`);
});
