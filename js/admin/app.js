import {
  validateImg,
  validateTexto,
  validateUrl,
  validateNombre,
} from "../validadores.js";
import { agregarPelicula, crearCategoria, editarPelicula } from "./abm.js";
import {
  cargarTablaPeliculas,
  cargartabla,
  estaEditando,
  leerCategorias,
} from "./ultis.js";

cargarTablaPeliculas();

const $form = document.getElementById("formulario");
const $inputNombre = document.getElementById("nombre");
const $inputTipo = document.getElementById("tipo");
const $inputCategoria = document.getElementById("categoria");
const $inputCaratula = document.getElementById("caratula");
const $inputTrailer = document.getElementById("trailer");
const $inputDescripcion = document.getElementById("descripcion");

$inputNombre.addEventListener("blur", () => {
  validateNombre($inputNombre);
});
$inputCaratula.addEventListener("blur", () => {
  validateImg($inputCaratula);
});
$inputTrailer.addEventListener("blur", () => {
  validateUrl($inputTrailer);
});
$inputDescripcion.addEventListener("blur", () => {
  validateTexto($inputDescripcion);
});

$form.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    !validateNombre($inputNombre) ||
    !validateImg($inputCaratula) ||
    !validateUrl($inputTrailer) ||
    !validateTexto($inputDescripcion)
  ) {
    alert("Revisar los campos");
    return;
  }
  const titulo = $inputNombre.value;
  const tipo = $inputTipo.value;
  const categoria = $inputCategoria.value;
  const caratula = $inputCaratula.value;
  const trailer = $inputTrailer.value;
  const descripcion = $inputDescripcion.value;
  if (estaEditando()) {
    console.log(descripcion);
    agregarPelicula(titulo, tipo, categoria, caratula, trailer, descripcion);
  } else {
    editarPelicula(titulo, tipo, categoria, caratula, trailer, descripcion);
  }

  document.getElementById("formularioPeliculas").reset();
  $inputNombre.classList.remove("is-valid", "is-invalid");
  $inputTipo.classList.remove("is-valid", "is-invalid");
  $inputCaratula.classList.remove("is-valid", "is-invalid");
  $inputTrailer.classList.remove("is-valid", "is-invalid");
  $inputDescripcion.classList.remove("is-valid", "is-invalid");

  cargarTablaPeliculas();

  let mensaje = `Nueva pelicula creada`;

  swal.fire({
    title: "Exito",
    text: mensaje,
    icon: "success",
    showConfirmButton: true,
    showCancelButton: false,
    confirmButtonText: "Genial",
  });
});

document
  .getElementById("categoriaForm")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const nombre = document.getElementById("nombreCat").value;
    const calificacion = document.getElementById("calificacion").value;
    crearCategoria(nombre, calificacion);
    mostrarCategorias();
    cargartabla();
    document.getElementById("categoriaForma").reset();
  });

export function mostrarCategorias() {
  const categorias = leerCategorias();
  const selectCategoria = document.getElementById("categoria");
  selectCategoria.innerHTML = "";
  categorias.forEach((categoria) => {
    const option = document.createElement("option");
    option.value = categoria.nombre;
    option.textContent = categoria.nombre;
    selectCategoria.appendChild(option);
  });
}
mostrarCategorias();
cargartabla();
