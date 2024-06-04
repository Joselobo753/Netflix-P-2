import { obtenerPeliculasDeLS } from "../utils.js";
import { mostrarCategorias } from "./app.js";
import { Categoria } from "./objs/Categoria.js";
import { pelicula } from "./objs/Pelicula.js";

import {
  agregarPeliculaALS,
  cargarCategorias,
  cargarTablaPeliculas,
  cargartabla,
  guardarCategorias,
  leerCategorias,
} from "./ultis.js";

export const agregarPelicula = (
  titulo,
  tipo,
  categoria,
  caratula,
  trailer,
  descripcion
) => {
  const peliculas = new pelicula(
    titulo,
    tipo,
    categoria,
    caratula,
    trailer,
    descripcion
  );

  agregarPeliculaALS(peliculas);
};

export const editarPelicula = (
  titulo,
  tipo,
  categoria,
  caratula,
  trailer,
  descripcion
) => {
  const peliculas = obtenerPeliculasDeLS();
  const codigoPelicula = sessionStorage.getItem("codigoPelicula");
  const posicionPelicula = peliculas.findIndex((pelicula) => {
    return pelicula.codigo === codigoPelicula;
  });
  if (posicionPelicula === -1) {
    alert("No se encontro la pelicula");
    sessionStorage.removeItem("codigoPelicula");
    return;
  }
  const nuevaPelicula = new pelicula(
    titulo,
    tipo,
    categoria,
    caratula,
    trailer,
    descripcion
  );
  peliculas.splice(posicionPelicula, 1, nuevaPelicula);

  localStorage.setItem("peliculas", JSON.stringify(peliculas));
};

export const eliminarPelicula = (idPelicula, nombrePelicula) => {
  swal
    .fire({
      title: "Atención",
      text: `¿Estás seguro que deseas eliminar la pelicula de ${nombrePelicula}? Esta acción es irreversible.`,
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, cancelar",
    })
    .then((result) => {
      if (result.isConfirmed) {
        const peliculas = obtenerPeliculasDeLS();

        const nuevasPelicula = peliculas.filter((pelicula) => {
          return pelicula.codigo !== idPelicula;
        });

        localStorage.setItem("peliculas", JSON.stringify(nuevasPelicula));

        cargarTablaPeliculas();
        swal.fire({
          title: "Exito",
          text: `Contacto ${nombrePelicula} eliminado correctamente`,
          icon: "success",
          showConfirmButton: true,
          showCancelButton: false,
          confirmButtonText: "Genial",
        });
      }
    });
};
export function crearCategoria(nombre, calificacion) {
  const categorias = cargarCategorias();
  const nuevaCategoria = new Categoria(nombre, calificacion);
  categorias.push(nuevaCategoria);
  guardarCategorias(categorias);
  return nuevaCategoria;
}

export function editarCategoria(codigo) {
  const categoria = leerCategorias().find((cat) => cat.codigo === codigo);
  if (categoria) {
    document.getElementById("nombreCat").value = categoria.nombre;
    document.getElementById("calificacion").value = categoria.calificacion;

    document.getElementById("categoriaForm").onsubmit = function (event) {
      event.preventDefault();
      actualizarCategoria(
        codigo,
        document.getElementById("nombreCat").value,
        document.getElementById("calificacion").value
      );
      mostrarCategorias();
    };
  }
}
function actualizarCategoria(codigo, nombre, calificacion) {
  const categorias = cargarCategorias();
  const categoria = categorias.find((cat) => cat.codigo === codigo);
  if (categoria) {
    categoria.nombre = nombre;
    categoria.calificacion = calificacion;
    guardarCategorias(categorias);
    eliminarCategoria(codigo, nombre, true);
    return categoria;
  } else {
    console.log("Categoría no encontrada");
    return null;
  }
}
export function eliminarCategoria(codigo, nombre, editar) {
  if (editar === true) {
    let categorias = cargarCategorias();
    categorias = categorias.filter((cat) => cat.codigo !== codigo);
    guardarCategorias(categorias);
    mostrarCategorias();
    cargartabla();
    return;
  }

  swal
    .fire({
      title: "Atención",
      text: `¿Estás seguro que deseas eliminar la pelicula de ${nombre}? Esta acción es irreversible.`,
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, cancelar",
    })
    .then((result) => {
      if (result.isConfirmed) {
        let categorias = cargarCategorias();
        categorias = categorias.filter((cat) => cat.codigo !== codigo);
        guardarCategorias(categorias);
        mostrarCategorias();
        cargartabla();
        swal.fire({
          title: "Exito",
          text: `Categoria ${nombre} eliminado correctamente`,
          icon: "success",
          showConfirmButton: true,
          showCancelButton: false,
          confirmButtonText: "Que pena",
        });
      }
    });
}
