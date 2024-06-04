const params = new URLSearchParams(window.location.search);
const codigoPelicula = params.get('codigo');

const obtenerPeliculasDeLS = () => {
  // Tu código para obtener las películas desde el localStorage
  return JSON.parse(localStorage.getItem('peliculas')) || [];
};

const peliculas = obtenerPeliculasDeLS();
const pelicula = peliculas.find(p => p.codigo === codigoPelicula);

if (pelicula) {
  const $imagenFondo = document.querySelector(".portada");
  
  const $titulo = document.querySelector("#titulo");
  const $titulog = document.querySelector("#titulog")
  
  const $descripcion = document.querySelector("#descripcion");
  const $traileraso = document.querySelector("#traileraso");
  const $categoria = document.querySelector("#cate")
  $imagenFondo.style.backgroundImage = `url(${pelicula.caratula})`;
  $titulog.textContent = pelicula.titulo
  $titulo.textContent = pelicula.titulo+" " ; // Suponiendo que tienes una duración
  $descripcion.textContent = pelicula.descripcion;
  $traileraso.src = pelicula.trailer;
  $categoria.textContent = pelicula.categoria
} else {
    window.location.href = "./error404.html";
  // Puedes redirigir a una página de error o mostrar un mensaje de error
}