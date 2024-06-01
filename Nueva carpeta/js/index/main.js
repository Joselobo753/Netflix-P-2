// ----- ----- Event Listener para scroll. ----- -----
import { Categoria } from '../admin.js/objs/Categoria.js';
import { obtenerPeliculasDeLS } from '../utils.js';

const $sectionContactos = document.getElementById('galeria');
const peliculas = obtenerPeliculasDeLS();

  Categoria.forEach((Categorias) =>{
  const $divP = document.createElement("div")
  $divP.id = "carousel1"
  
  })
// ----------------------------------
// 3. Carga en el body
// ----------------------------------
function generarPeliculas(carruselId, titulo, peliculas) {
  // Cambiar el título del carrusel
  document.getElementById('carousel-title').innerText = titulo;

  // Obtener el contenedor del carrusel
  const contenedor = document.getElementById(carruselId);

  // Obtener el contenedor donde se añadirán las películas
  const carouselContainer = contenedor.querySelector('#carousel-container');

  // Limpiar el contenedor de películas
  carouselContainer.innerHTML = '';

peliculas.forEach(pelicula => {
  const peliculaDiv = document.createElement('div');
  peliculaDiv.className = 'pelicula';
  
  const enlace = document.createElement('a');
  enlace.href = './pages/error404.html';

  const imagen = document.createElement('img');
  imagen.src = pelicula.caratula;
  imagen.alt = pelicula.titulo;

  const texto = document.createElement('p');
  texto.className = 'pelicula-texto';
  texto.innerText = pelicula.titulo;

  enlace.appendChild(imagen);
  peliculaDiv.appendChild(enlace);
  peliculaDiv.appendChild(texto);

  carouselContainer.appendChild(peliculaDiv);
});
}
//!
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.classList.remove("transparent");
    navbar.classList.add("solid");
  } else {
    navbar.classList.remove("solid");
    navbar.classList.add("transparent");
  }
});

// ----- ----- Carrusel. ----- -----
document.querySelectorAll(".peliculas-carousel").forEach((carousel, index) => {
    const fila = carousel.querySelector(".contenedor-carousel .carousel");
    const peliculas = carousel.querySelectorAll(".pelicula");
    const flechaIzquierda = carousel.querySelector(".flecha-izquierda");
    const flechaDerecha = carousel.querySelector(".flecha-derecha");
    const indicadoresContainer = carousel.querySelector(".indicadores");
  
    // ----- ----- Paginación. ----- -----
    const numeroPaginas = Math.ceil(peliculas.length / 5);
    for (let i = 0; i < numeroPaginas; i++) {
      const indicador = document.createElement("button");
      if (i === 0) {
        indicador.classList.add("activo");
      }
      indicadoresContainer.appendChild(indicador);
      indicador.addEventListener("click", (e) => {
        fila.scrollLeft = i * fila.offsetWidth;
        carousel.querySelector(".indicadores .activo").classList.remove("activo");
        e.target.classList.add("activo");
      });
    }
  
    // ----- ----- Flechas de navegación. ----- -----
    flechaIzquierda.addEventListener("click", () => {
      const activeIndex = Array.from(indicadoresContainer.children).indexOf(
        carousel.querySelector(".indicadores .activo")
      );
      const newIndex = Math.max(activeIndex - 1, 0);
      fila.scrollLeft = newIndex * fila.offsetWidth;
      carousel.querySelector(".indicadores .activo").classList.remove("activo");
      indicadoresContainer.children[newIndex].classList.add("activo");
    });
  
    flechaDerecha.addEventListener("click", () => {
      const activeIndex = Array.from(indicadoresContainer.children).indexOf(
        carousel.querySelector(".indicadores .activo")
      );
      const newIndex = Math.min(activeIndex + 1, numeroPaginas - 1);
      fila.scrollLeft = newIndex * fila.offsetWidth;
      carousel.querySelector(".indicadores .activo").classList.remove("activo");
      indicadoresContainer.children[newIndex].classList.add("activo");
    });
  
    // ----- ----- Hover. ----- -----
    peliculas.forEach((pelicula) => {
      pelicula.addEventListener("mouseenter", (e) => {
        const elemento = e.currentTarget;
        setTimeout(() => {
          peliculas.forEach((pelicula) => pelicula.classList.remove("hover"));
          elemento.classList.add("hover");
        }, 300);
      });
    });
  
    fila.addEventListener("mouseleave", () => {
      peliculas.forEach((pelicula) => pelicula.classList.remove("hover"));
    });
  });
  
