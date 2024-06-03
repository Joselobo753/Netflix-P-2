export class pelicula {
    constructor (titulo,tipo,caratula,trailer,descripcion){
        this.codigo = window.self.crypto.randomUUID()
        this.titulo = titulo
        this.tipo = tipo
        this.caratula = caratula
        this.trailer = trailer
        this.descripcion = descripcion
        this.destacada = false;
    }
}
