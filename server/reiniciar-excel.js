const fs = require("fs");
const xlsx = require("xlsx");
const path = require("path");

function reiniciarExcel() {
  const ruta = path.join(__dirname, "../resultados.xlsx");

  const hoja = xlsx.utils.aoa_to_sheet([["Nombre", "Apellido", "Edad", "Cédula", "Curso", "Unidad Educativa", "Resultado Principal", "Porcentaje", "Resultado Secundario"]]);
  const libro = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(libro, hoja, "Respuestas");

  xlsx.writeFile(libro, ruta);
  console.log("🧼 Excel reiniciado con encabezados");
}

module.exports = reiniciarExcel;
