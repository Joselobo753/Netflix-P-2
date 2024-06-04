import { obtenerPeliculasDeLS } from "../utils.js";
import { editarCategoria, eliminarCategoria, eliminarPelicula } from "./abm.js";
import { mostrarCategorias } from "./app.js";
import { pelicula } from "./objs/Pelicula.js";

export const agregarPeliculaALS = (pelicula) => {
  const peliculas = obtenerPeliculasDeLS();
  peliculas.push(pelicula);
  localStorage.setItem("peliculas", JSON.stringify(peliculas));
};

const cargarFilaTabla = (pelicula, indice) => {
  const $tbody = document.getElementById("tbody-peliculas");

  const $tr = document.createElement("tr");

  const $tdIndice = document.createElement("td");
  $tdIndice.textContent = indice;
  $tr.appendChild($tdIndice);

  const $tdImagen = document.createElement("td");
  const $imagen = document.createElement("img");
  $imagen.src = pelicula.caratula;
  $imagen.alt = pelicula.titulo;
  $imagen.classList.add("imagen-tabla");
  $tdImagen.appendChild($imagen);
  $tr.appendChild($tdImagen);

  const $tdTitulo = document.createElement("td");
  $tdTitulo.textContent = pelicula.titulo;
  $tr.appendChild($tdTitulo);

  const $tdTipo = document.createElement("td");
  $tdTipo.textContent = pelicula.tipo;
  $tr.appendChild($tdTipo);

  const $tdCategoria = document.createElement("td");
  $tdCategoria.textContent = pelicula.categoria;
  $tr.appendChild($tdCategoria);

  const $tdTrailer = document.createElement("td");
  const $aTrailer = document.createElement("a");
  $aTrailer.href = `${pelicula.trailer}`;
  $aTrailer.textContent = "Trailer";
  $tdTrailer.appendChild($aTrailer);
  $tr.appendChild($tdTrailer);

  const $tdDescripcion = document.createElement("td");
  $tdDescripcion.textContent = pelicula.descripcion;
  $tr.appendChild($tdDescripcion);

  const $tdAcciones = document.createElement("td");
  const $btnEditar = document.createElement("button");
  const $btnEliminar = document.createElement("button");
  const $destacada = document.createElement("button");

  $btnEditar.classList.add("btn", "btn-sm", "bred", "m-1");
  $btnEliminar.classList.add("btn", "btn-sm", "bred", "m-1");
  $destacada.classList.add("btn", "btn-sm", "bred", "m-1");
  $btnEditar.textContent = "Editar";
  $btnEliminar.textContent = "Eliminar";
  $destacada.textContent = "Destacar";
  $btnEditar.onclick = () => {
    prepararEdicionPelicula(pelicula);
  };
  $btnEliminar.onclick = () => {
    eliminarPelicula(pelicula.codigo);
  };
  $destacada.onclick = () => {
    destacar(pelicula.codigo);
  };
  $tdAcciones.appendChild($btnEditar);
  $tdAcciones.appendChild($btnEliminar);
  $tdAcciones.appendChild($destacada);
  $tr.appendChild($tdAcciones);

  $tbody.appendChild($tr);
};

export const cargarTablaPeliculas = () => {
  const peliculas = obtenerPeliculasDeLS();

  const $tbody = document.getElementById("tbody-peliculas");
  $tbody.innerHTML = ``;

  peliculas.forEach((pelicula, indice) => {
    cargarFilaTabla(pelicula, indice + 1);
  });
};

export const prepararEdicionPelicula = (pelicula) => {
  const $inputNombre = document.getElementById("nombre");
  const $inputTipo = document.getElementById("tipo");
  const $inputCaratula = document.getElementById("caratula");
  const $inputTrailer = document.getElementById("trailer");
  const $inputDescripcion = document.getElementById("descripcion");

  // 2. Cargar la info
  $inputNombre.value = pelicula.titulo;
  $inputTipo.value = pelicula.tipo;
  $inputCaratula.value = pelicula.caratula;
  $inputTrailer.value = pelicula.trailer;
  $inputDescripcion.value = pelicula.descripcion;

  // 3. Guardar código
  sessionStorage.setItem("codigoPelicula", pelicula.codigo);

  // 4. Mostrar alert
  const $alert = document.getElementById("alert-edicion-peli");
  const $spanPelicula = document.getElementById("peli-edicion");
  $alert.classList.remove("d-none");
  $spanPelicula.textContent = pelicula.titulo;

  // 5. Mostrar boton
  const $button = document.getElementById("button-cancelar");
  $button.classList.remove("d-none");
};

export const estaEditando = () => {
  const verificar = document.getElementById("alert-edicion-peli");
  return !!verificar.classList.contains("d-none");
};
export function cargartabla() {
  const categorias = leerCategorias();
  const tbody = document
    .getElementById("tablaCategorias")
    .querySelector("tbody");
  tbody.innerHTML = "";
  categorias.forEach((categoria) => {
    const tr = document.createElement("tr");

    const tdNombre = document.createElement("td");
    tdNombre.textContent = categoria.nombre;
    tr.appendChild(tdNombre);

    const tdCalificacion = document.createElement("td");
    tdCalificacion.textContent = categoria.calificacion;
    tr.appendChild(tdCalificacion);

    const tdAcciones = document.createElement("td");
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.onclick = () => editarCategoria(categoria.codigo);
    tdAcciones.appendChild(btnEditar);

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = () => {
      eliminarCategoria(categoria.codigo, categoria.nombre);
      mostrarCategorias();
    };
    tdAcciones.appendChild(btnEliminar);

    tr.appendChild(tdAcciones);
    tbody.appendChild(tr);
  });
}

export function leerCategorias() {
  return cargarCategorias();
}
export function cargarCategorias() {
  const categoriasJSON = localStorage.getItem("categorias");
  return categoriasJSON ? JSON.parse(categoriasJSON) : [];
}

export function guardarCategorias(categorias) {
  localStorage.setItem("categorias", JSON.stringify(categorias));
}
function destacar(codigo) {
  let peliculas = JSON.parse(localStorage.getItem("peliculas"));

  peliculas.forEach((pelicula) => {
    if (pelicula.codigo !== codigo) {
      pelicula.destacada = false;
    } else {
      pelicula.destacada = true;
    }
  });

  localStorage.setItem("peliculas", JSON.stringify(peliculas));
}
