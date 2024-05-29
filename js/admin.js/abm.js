import { obtenerPeliculasDeLS } from "../utils.js";
import { pelicula, pelicula } from "./objs/Pelicula.js";
import { agregarPeliculaALS } from "./ultis.js";

export const agregarPelicula = (
  titulo,
  tipo,
  caratula,
  trailer,
  descripcion
) => {
  const pelicula = new pelicula(titulo, tipo, caratula, trailer, descripcion);
  agregarPeliculaALS(pelicula);
};

const editarPelicula = (titulo, tipo, caratula, trailer, descripcion) => {
  const pelicula = obtenerPeliculasDeLS();
  const codigoPelicula = sessionStorage.getItem("codigoPelicula");
  const posicionPelicula = pelicula.findIndex((pelicula) => {
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
    caratula,
    trailer,
    descripcion
  );
  pelicula.splice(posicionPelicula, 1, nuevaPelicula);

  localStorage.setItem("pelicula", JSON.stringify(pelicula));

  sessionStorage.removeItem("codigoPelicula");

  const $alerta = document.getElementById("alerta-edicion-contacto");
  $alerta.classList.add("d-none");

  const $boton = document.getElementById("boton-cancelar");
  $boton.classList.add("d-none");
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

        cargarTabla();

        swal.fire({
          title: "Exito",
          text: `Contacto ${nombrePelicula} eliminado correctamente`,
          icon: "success",
          showConfirmButton: true,
          showCancelButton: false,
          confirmButtonText: "Tremen2",
        });
      }
    });
};
