const xlsx = require("xlsx");
const fs = require("fs");

module.exports = function (data) {
  const file = "./resultados.xlsx";
  let workbook, hoja;

  if (fs.existsSync(file)) {
    workbook = xlsx.readFile(file);
    hoja = workbook.Sheets[workbook.SheetNames[0]];
  } else {
    hoja = xlsx.utils.aoa_to_sheet([["Nombre", "Cédula", "Curso", "Resultado"]]);
    workbook = xlsx.utils.book_new();
  }

  // Añadir nueva fila
  const nuevaFila = [[data.nombre, data.cedula, data.curso, data.resultado]];
  xlsx.utils.sheet_add_aoa(hoja, nuevaFila, { origin: -1 });

  // Asegurar que hoja se asigne nuevamente antes de escribir
  workbook.Sheets["Respuestas"] = hoja;
  if (!workbook.SheetNames.includes("Respuestas")) {
    workbook.SheetNames.push("Respuestas");
  }

  xlsx.writeFile(workbook, file);
};
