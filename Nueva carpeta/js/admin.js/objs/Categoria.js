export class Categoria {
    constructor (nombre,calificacion){
       this.codigo = window.self.crypto.randomUUID
       this.nombre = nombre
       this.calificacion = calificacion
       
    }
}
