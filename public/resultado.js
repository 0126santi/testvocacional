window.addEventListener("DOMContentLoaded", () => {
  const nombre = localStorage.getItem("nombreEstudiante");
  const resultado = localStorage.getItem("resultadoFinal");
  const porcentaje = localStorage.getItem("resultadoPorcentaje");
  const segundo = localStorage.getItem("resultadoSecundario");
  const porcentajeSecundario = localStorage.getItem("porcentajeSecundario");

  document.getElementById("nombre").textContent = `${nombre}, tu resultado sugiere inclinación hacia:`;

  document.getElementById("carrera").textContent = resultado
    ? `${resultado} (${porcentaje})`
    : "Sin resultado disponible.";

  //document.getElementById("secundario").textContent = `Segunda inclinación detectada: ${segundo} (${porcentajeSecundario})`;
  document.getElementById("secundario").innerHTML = `
    <hr style="margin-top:20px; margin-bottom:12px; border: none; border-top: 1px solid #ccc;">
    <span style="display:block;">Segunda inclinación detectada:</span>
    <br>
    <span style="display:block;">${segundo} (${porcentajeSecundario})</span>
  `;
  console.log("Nombre:", nombre);
  console.log("Resultado:", resultado);
});
