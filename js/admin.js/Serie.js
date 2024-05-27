import { pelicula } from "./Pelicula.js";

export class serie extends pelicula{
    constructor(titulo, tipo, caratula, trailer, descripcion, capitulos) {
        super(titulo, tipo, caratula, trailer, descripcion);
        this.capitulos = capitulos;  
    }
}