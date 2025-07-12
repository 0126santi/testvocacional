window.addEventListener("DOMContentLoaded", () => {
  const resultado = localStorage.getItem("resultadoFinal");
  const nombre = localStorage.getItem("nombreEstudiante");

  document.getElementById("nombre").textContent = `${nombre}, tu resultado Sugiere inclinación hacia:`;
  document.getElementById("carrera").textContent = resultado ? resultado : "Sin resultado disponible.";
});
