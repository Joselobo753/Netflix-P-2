import { pelicula } from "./pelicula.js";

export const agregarPeliculaALS = (pelicula) =>{
    const peliculas = obtenerPeliculas();
    peliculas.push(pelicula)
    localStorage.setItem("pelicula",JSON.stringify(peliculas))
}