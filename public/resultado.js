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

  document.getElementById("secundario").textContent = `🔎 Segunda inclinación detectada: ${segundo} (${porcentajeSecundario})`;
});
