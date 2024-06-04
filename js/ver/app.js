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
 
  
  const $descripcion = document.querySelector("#descripcion");
  const $traileraso = document.querySelector("#traileraso");

  $imagenFondo.style.backgroundImage = `url(${pelicula.caratula})`;
  
  $titulo.textContent = pelicula.titulo ; // Suponiendo que tienes una duración
  $descripcion.textContent = pelicula.descripcion;
  $traileraso.src = pelicula.trailer;
} else {
    window.location.href = "./error404.html";
  // Puedes redirigir a una página de error o mostrar un mensaje de error
}