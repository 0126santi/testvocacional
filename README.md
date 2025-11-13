# Test Vocacional UC

Aplicación web sencilla para aplicar un test vocacional de 100 preguntas y registrar los resultados en un archivo Excel (`resultados.xlsx`). Incluye:

- Frontend estático (HTML/CSS/JS) en `public/`.
- API en Node.js con Express en `server/` para guardar y descargar resultados.
- Generación y actualización de Excel con la librería `xlsx`.

## Características
- Formulario inicial para datos del estudiante.
- Carga dinámica de preguntas desde `public/data/preguntas.json`.
- Cálculo de resultado principal y secundario basado en frecuencia de respuestas.
- Persistencia en `localStorage` para mostrar pantalla de resultados.
- Almacenamiento de cada intento en un Excel con encabezados.
- Endpoint para descargar el Excel y otro para reiniciarlo.

## Estructura del proyecto
```
public/
  index.html          # Pantalla inicial y formulario
  script.js           # Lógica de preguntas y envío
  resultado.html      # Pantalla de resultados
  resultado.js        # Render de resultados
  styles.css          # Estilos globales
  data/preguntas.json # Banco de preguntas
server/
  app.js              # Servidor Express y rutas
  excel-handler.js    # Añadir fila al Excel
  reiniciar-excel.js  # Reiniciar Excel a solo encabezados
package.json          # Metadatos y dependencias
.gitignore            # Archivos a excluir del control de versiones
README.md             # Este archivo
```

## Requisitos
- Node.js >= 16

## Instalación
```bash
npm install
```

## Ejecución
```bash
npm start
```
Servidor por defecto en `http://localhost:3000`.

## Endpoints principales
- `POST /api/guardar` Guarda una fila en el Excel.
- `GET /descargar` Descarga `resultados.xlsx` si existe.
- `GET /reiniciar` Reinicia el archivo Excel con solo encabezados.

## Excel generado
No se versiona (`resultados.xlsx` está en `.gitignore`). Se crea automáticamente al primer guardado o al reinicio.

## Mejoras futuras (ideas)
- Validaciones más estrictas del formulario.
- Prevención de múltiples envíos.
- Exportación a PDF.
- Reemplazar almacenamiento en Excel por base de datos.

## Licencia
ISC (puedes adaptarla si lo deseas).

---
Hecho para fines demostrativos como parte de tu portafolio.
