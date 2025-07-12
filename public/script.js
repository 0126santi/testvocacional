// Elementos del DOM
const formUsuario = document.getElementById("form-usuario");
const formTest = document.getElementById("form-test");
const contenedorPreguntas = document.getElementById("contenedor-preguntas");
const resultadoDiv = document.getElementById("resultado");

let datosEstudiante = {}; // Guarda los datos ingresados

// Al enviar datos del estudiante
formUsuario.addEventListener("submit", function (e) {
  e.preventDefault();

  datosEstudiante.nombre = document.querySelector("input[name='nombre']").value;
  datosEstudiante.cedula = document.querySelector("input[name='cedula']").value;
  datosEstudiante.curso = document.querySelector("input[name='curso']").value;

  formUsuario.style.display = "none";
  formTest.style.display = "block";

  // Cargar las preguntas solo cuando se inicia el test
  fetch("/data/preguntas.json")
    .then((res) => res.json())
    .then((preguntas) => {
      console.log("Preguntas cargadas:", preguntas);
      preguntas.forEach((p, i) => {
        const div = document.createElement("div");
        div.classList.add("pregunta-bloque");
        div.innerHTML = `<label><strong>${p.id}.</strong> ${p.pregunta}</label><br>`;
        Object.entries(p.opciones).forEach(([clave, texto]) => {
          div.innerHTML += `
            <label>
              <input type="radio" name="pregunta${i}" value="${clave}" required />
              ${clave}) ${texto}
            </label><br>
          `;
        });
        contenedorPreguntas.appendChild(div);
      });
    })
    .catch((error) => {
      contenedorPreguntas.innerHTML = `<p style="color:red;">No se pudieron cargar las preguntas. Verifica el archivo preguntas.json</p>`;
      console.error("Error al cargar preguntas:", error);
    });
});

// Al enviar el test
formTest.addEventListener("submit", async function (e) {
  e.preventDefault();

  const respuestas = Array.from(formTest.elements)
    .filter((el) => el.checked)
    .map((el) => el.value);

  const conteo = {};
  respuestas.forEach((r) => {
    conteo[r] = (conteo[r] || 0) + 1;
  });
  const mayor = Object.entries(conteo).sort((a, b) => b[1] - a[1])[0][0];

  const resultado = {
    a: "Ingeniería",
    b: "Medicina/Ciencias de la Salud",
    c: "Educación",
    d: "Derecho o Ciencias Sociales con énfasis en políticas",
    e: "Derecho o Ciencias Sociales con énfasis en investigación",
  }[mayor];

  // Guardar en localStorage (si quieres seguir usando)
  localStorage.setItem("resultadoFinal", resultado);
  localStorage.setItem("nombreEstudiante", datosEstudiante.nombre);

  // ✅ Enviar datos al backend para guardarlos en Excel
  await fetch("/api/guardar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre: datosEstudiante.nombre,
      cedula: datosEstudiante.cedula,
      curso: datosEstudiante.curso,
      resultado
    })
  });

  // Redirigir después de guardar
  window.location.href = "resultado.html";
});

