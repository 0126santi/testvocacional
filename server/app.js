const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const guardarEnExcel = require("./excel-handler");

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/data", express.static(path.join(__dirname, "../data")));

app.post("/api/guardar", (req, res) => {
  guardarEnExcel(req.body);
  res.send({ status: "ok" });
});

app.listen(3000, () => console.log("Servidor activo en http://localhost:3000"));
