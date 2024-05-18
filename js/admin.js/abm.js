import { pelicula } from "./pelicula.js";
import { agregarPeliculaALS } from "./ultis.js";

export const agregarPelicula = (titulo,tipo,caratula,trailer,descripcion) =>{
    const pelicula  = new pelicula(titulo,tipo,caratula,trailer,descripcion);
    agregarPeliculaALS(pelicula)
}