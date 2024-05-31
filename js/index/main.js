// ----- ----- Event Listener para scroll. ----- -----
import { obtenerContactosDeLS } from '../utils.js';

// ----------------------------------
// 1. Seleccion de elementos
// ----------------------------------

const $select = document.getElementById('select-contactos');
const $sectionContactos = document.getElementById('section-contactos');
const contactos = obtenerContactosDeLS();

// ----------------------------------
// 2. Carga en el select
// ----------------------------------

contactos.forEach((contacto) => {
  const $option = document.createElement('option');
  $option.value = contacto.codigo;
  $option.innerText = contacto.nombre;
  $select.appendChild($option);
});

// ----------------------------------
// 3. Carga en el body
// ----------------------------------

contactos.forEach((contacto) => {
  const $article = document.createElement('article');
  $article.innerText = contacto.nombre;
  $sectionContactos.appendChild($article);
});



/* <div class="pelicula">
                <a href="#"><img src="resources/index/img1.jpg" alt="" /></a>
              </div>
*/
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
  
