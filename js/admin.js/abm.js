import { obtenerPeliculasDeLS } from "../utils.js";
import { pelicula, pelicula } from "./Pelicula.js";
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

const editarPelicula = (titulo, tipo, caratula, trailer, descripcion) =>{
  const pelicula = obtenerPeliculasDeLS();
  const codigoPelicula = sessionStorage.getItem("codigoPelicula")
  const posicionPelicula = pelicula.findIndex((pelicula)=>{
    return pelicula.codigo === codigoPelicula;
  })
  if (posicionPelicula === -1){
    alert("No se encontro la pelicula")
    sessionStorage.removeItem("codigoPelicula")
  return;
  }
  const nuevaPelicula = new pelicula(titulo, tipo, caratula, trailer, descripcion)
  pelicula.splice(posicionPelicula,1,nuevaPelicula)

  localStorage.setItem("pelicula",JSON.stringify(pelicula))

  sessionStorage.removeItem("codigoPelicula")
  

  const $alerta = document.getElementById('alerta-edicion-contacto');
  $alerta.classList.add('d-none');

  
  const $boton = document.getElementById('boton-cancelar');
  $boton.classList.add('d-none');
}


export const eliminarPelicula = (id)