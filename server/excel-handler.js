const fs = require("fs");
const xlsx = require("xlsx");
const path = require("path");

module.exports = function (data) {
  // Ruta absoluta para compatibilidad con Railway
  const file = path.join(__dirname, "../resultados.xlsx");

  let workbook, hoja;

  if (fs.existsSync(file)) {
    workbook = xlsx.readFile(file);
    hoja = workbook.Sheets[workbook.SheetNames[0]];
  } else {
    hoja = xlsx.utils.aoa_to_sheet([["Nombre", "Cédula", "Curso", "Resultado"]]);
    workbook = xlsx.utils.book_new();
    workbook.SheetNames.push("Respuestas");
  }

  // Añadir nueva fila
  const nuevaFila = [[data.nombre, data.cedula, data.curso, data.resultado]];
  xlsx.utils.sheet_add_aoa(hoja, nuevaFila, { origin: -1 });

  // Asegurar que la hoja esté correctamente referenciada
  workbook.Sheets["Respuestas"] = hoja;

  // Guardar el archivo
  xlsx.writeFile(workbook, file);
  console.log("✅ Excel actualizado correctamente.");
};
