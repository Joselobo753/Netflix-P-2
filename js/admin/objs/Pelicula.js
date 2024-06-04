export class pelicula {
  constructor(titulo, tipo, categoria, caratula, trailer, descripcion) {
    this.codigo = window.self.crypto.randomUUID();
    this.titulo = titulo;
    this.tipo = tipo;
    this.categoria = categoria || "sin categoria";
    this.caratula = caratula;
    this.trailer = trailer;
    this.descripcion = descripcion;

    this.destacada = false;
  }
}
