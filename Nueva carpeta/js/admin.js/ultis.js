import { obtenerPeliculasDeLS } from "../utils.js";
import { eliminarPelicula } from "./abm.js";
import { pelicula } from "./objs/Pelicula.js";

export const agregarPeliculaALS = (pelicula) => {
  const peliculas = obtenerPeliculas();
  peliculas.push(pelicula);
  localStorage.setItem("pelicula", JSON.stringify(peliculas));
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
  $tr.appendChild($tdNombre);

  
  const $tdTipo = document.createElement("td");
  $tdTipo.textContent = pelicula.tipo;
  $tr.appendChild($tdNumero);

  
  const $tdTrailer = document.createElement("td");
  const $aTrailer = document.createElement("a");
  $aTrailer.href = `${pelicula.trailer}`;
  $aTrailer.textContent = "Trailer";
  $tdTrailer.appendChild($aEmail);
  $tr.appendChild($tdTrailer)


  const $tdDescripcion = document.createElement("td");
  $tdDescripcion.textContent = pelicula.descripcion;
  $tr.appendChild($tdNotas);


  const $tdAcciones = document.createElement("td");
  const $btnEditar = document.createElement("button");
  const $btnEliminar = document.createElement("button");
  $btnEditar.classList.add("btn", "btn-sm", "btn-warning", "me-2");
  $btnEliminar.classList.add("btn", "btn-sm", "btn-danger");
  $btnEditar.textContent = "Editar";
  $btnEliminar.textContent = "Eliminar";
  $btnEditar.onclick = () => {
    prepararEdicionPelicula(pelicula);
  };
  $btnEliminar.onclick = () => {
    eliminarPelicula(pelicula.codigo, pelicula.nombre);
  };
  $tdAcciones.appendChild($btnEditar);
  $tdAcciones.appendChild($btnEliminar);
  $tr.appendChild($tdAcciones);

  $tbody.appendChild($tr);
};



export const cargarTabla = () => {

  const peliculas = obtenerPeliculasDeLS();

  const $tbody = document.getElementById("tbody-peliculas");
  $tbody.innerHTML = "";

 
  peliculas.forEach((pelicula, indice) => {
   
    cargarFilaTabla(pelicula, indice + 1);
  });
};

export const prepararEdicionPelicula = (pelicula) => {
 
  const $inputNombre = document.getElementById("nombre")
const $inputTipo = document.getElementById("tipo")
const $inputCaratula = document.getElementById("caratula")
const $inputTrailer = document.getElementById("trailer")
const $inputDescripcion = document.getElementById("descripcion")

  // 2. Cargar la info
  $inputNombre.value = pelicula.titulo
  $inputTipo.value = pelicula.tipo;
  $inputCaratula.value = pelicula.caratula;
  $inputTrailer.value = pelicula.trailer;
  $inputDescripcion.value = pelicula.descripcion;

  // 3. Guardar código
  sessionStorage.setItem("codigoPelicula", pelicula.codigo);

  // 4. Mostrar alert
  const $alert = document.getElementById("alert-edicion-contacto");
  const $spanPelicula = document.getElementById("nombre-contacto-edicion");
  $alert.classList.remove("d-none");
  $spanPelicula.textContent = pelicula.titulo;

  // 5. Mostrar boton
  const $button = document.getElementById("button-cancelar");
  $button.classList.remove("d-none");

};

export const estaEditando = () => {

  return !!sessionStorage.getItem("codigoPelicula");
};
