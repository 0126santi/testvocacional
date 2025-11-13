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
  datosEstudiante.apellido = document.querySelector("input[name='apellido']").value;
  datosEstudiante.cedula = document.querySelector("input[name='cedula']").value;
  datosEstudiante.edad = document.querySelector("input[name='edad']").value;
  datosEstudiante.unidad = document.querySelector("input[name='unidad']").value;
  datosEstudiante.curso = document.querySelector("input[name='curso']").value;
  datosEstudiante.seccion = document.querySelector("input[name='seccion']").value;


  formUsuario.style.display = "none";
  formTest.style.display = "block";

  // Cargar las preguntas solo cuando se inicia el test
  fetch("/data/preguntas.json")
    .then((res) => res.json())
    .then((preguntas) => {
      const secciones = [
        { inicio: 1, fin: 10, titulo: "Intereses Generales y Estilo de Aprendizaje" },
        { inicio: 11, fin: 25, titulo: "Aptitudes para Ingeniería" },
        { inicio: 26, fin: 40, titulo: "Aptitudes para Medicina y Ciencias de la Salud" },
        { inicio: 41, fin: 55, titulo: "Aptitudes para Educación" },
        { inicio: 56, fin: 70, titulo: "Aptitudes para Derecho" },
        { inicio: 71, fin: 85, titulo: "Aptitudes para Ciencias Sociales" },
        { inicio: 86, fin: 100, titulo: "Preferencias Académicas y Futuras" }
      ];

      contenedorPreguntas.innerHTML = ""; // 💡 Limpia cualquier contenido anterior

      preguntas.forEach((p, i) => {
        const preguntaId = p.id;

        // Agregar subtítulo si empieza una nueva sección
        const seccion = secciones.find(s => s.inicio === preguntaId);
        if (seccion) {
          const encabezado = document.createElement("h3");
          encabezado.classList.add("seccion-subtitulo");
          encabezado.textContent = seccion.titulo;
          contenedorPreguntas.appendChild(encabezado);
        }

        const div = document.createElement("div");
        div.classList.add("pregunta-bloque");
        div.innerHTML = `<label><strong>${preguntaId}.</strong> ${p.pregunta}</label><br>`;
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

  const totalPreguntas = respuestas.length;

  const conteo = {};
  respuestas.forEach((r) => {
    conteo[r] = (conteo[r] || 0) + 1;
  });

  // Ordenar conteos por frecuencia
  const ordenado = Object.entries(conteo).sort((a, b) => b[1] - a[1]);

  const [opcion1, cantidad1] = ordenado[0];
  const [opcion2, cantidad2] = ordenado[1] || ["-", 0]; // Por si no hay segunda

  const resultado = {
    a: "Ingeniería",
    b: "Medicina/Ciencias de la Salud",
    c: "Educación",
    d: "Derecho o Ciencias Sociales con énfasis en políticas",
    e: "Derecho o Ciencias Sociales con énfasis en investigación",
  }[opcion1];

  const porcentajePrincipal = ((cantidad1 / totalPreguntas) * 100).toFixed(1) + "%";

  const resultadoSecundario = {
    a: "Ingeniería",
    b: "Medicina/Ciencias de la Salud",
    c: "Educación",
    d: "Derecho o Ciencias Sociales con énfasis en políticas",
    e: "Derecho o Ciencias Sociales con énfasis en investigación",
  }[opcion2] || "Sin segundo resultado";

  const porcentajeSecundario = ((cantidad2 / totalPreguntas) * 100).toFixed(1) + "%";


  // Guardar en localStorage 
  localStorage.setItem("resultadoPorcentaje", porcentajePrincipal);
  localStorage.setItem("resultadoSecundario", resultadoSecundario);
  localStorage.setItem("porcentajeSecundario", porcentajeSecundario);
  localStorage.setItem("nombreEstudiante", datosEstudiante.nombre + " " + datosEstudiante.apellido);
  localStorage.setItem("resultadoFinal", resultado);



  // Enviar datos al backend para guardarlos en Excel
  await fetch("/api/guardar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre: datosEstudiante.nombre,
      apellido: datosEstudiante.apellido,
      cedula: datosEstudiante.cedula,
      edad: datosEstudiante.edad,
      unidad: datosEstudiante.unidad,
      curso: datosEstudiante.curso,
      seccion: datosEstudiante.seccion,
      resultado,
      porcentaje: porcentajePrincipal,
      resultadoSecundario,
      porcentajeSecundario
    })
  });
  // Redirigir después de guardar
  window.location.href = "resultado.html";
});

