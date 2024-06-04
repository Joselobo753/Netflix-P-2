import { obtenerPeliculasDeLS } from "../utils.js";





// ----- ----- Event Listener para scroll. ----- -----
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

const crearCarrusel = (titulo, peliculas) => {
  const $carouselContainer1 = document.createElement("div");
  $carouselContainer1.classList.add("carousel");
  const $carouselContainer2 = document.createElement("div");
  $carouselContainer2.classList.add("contenedor-carousel");

  peliculas.forEach((pelicula) => {
    const $card = document.createElement("div");
    $card.classList.add("pelicula");
    const $linkPelicula = document.createElement("a");
    $linkPelicula.href = `./pages/ver.html?codigo=${pelicula.codigo}`;
    const $portadaPelicula = document.createElement("img");
    $portadaPelicula.src = `${pelicula.caratula}`;
    $portadaPelicula.alt = `${pelicula.descripcion}`;
    $linkPelicula.appendChild($portadaPelicula);
    $card.appendChild($linkPelicula);
    $carouselContainer1.appendChild($card);
  });

  $carouselContainer2.appendChild($carouselContainer1);

  const $btnL = document.createElement("button");
  $btnL.role = "button";
  $btnL.classList.add("flecha-izquierda");
  const $iconoL = document.createElement("i");
  $iconoL.classList.add("fas", "fa-angle-left");
  $btnL.appendChild($iconoL);

  const $btnR = document.createElement("button");
  $btnR.role = "button";
  $btnR.classList.add("flecha-derecha");
  const $iconoR = document.createElement("i");
  $iconoR.classList.add("fas", "fa-angle-right");
  $btnR.appendChild($iconoR);

  const $contenedorPrincipal = document.createElement("div");
  $contenedorPrincipal.classList.add("contenedor-principal");
  $contenedorPrincipal.appendChild($btnL);
  $contenedorPrincipal.appendChild($carouselContainer2);
  $contenedorPrincipal.appendChild($btnR);

  const $h5 = document.createElement("h5");
  $h5.textContent = `${titulo}`;
  const $indicadores = document.createElement("div");
  $indicadores.classList.add("indicadores");
  const $contenedorTituloControles = document.createElement("div");
  $contenedorTituloControles.classList.add("contenedor-titulo-controles");
  $contenedorTituloControles.appendChild($h5);
  $contenedorTituloControles.appendChild($indicadores);

  const $carousel = document.createElement("div");
  $carousel.classList.add("peliculas-carousel", "contenedor");
  $carousel.appendChild($contenedorTituloControles);
  $carousel.appendChild($contenedorPrincipal);

  const $main = document.querySelector("main");
  $main.appendChild($carousel);
};

// Main function to create all carousels
const crearTodosLosCaruseles = () => {
  const peliculas = obtenerPeliculasDeLS();
  const categorias = JSON.parse(localStorage.getItem("categorias"));

  // Predefined categories
  const predefinedCategories = [ "Recomendación de Eze"];
  predefinedCategories.forEach(categoria => {
    crearCarrusel(categoria, peliculas);
  });

  // Additional categories from local storage
  categorias.forEach(categoria => {
    const peliculasFiltradas = peliculas.filter(pelicula => pelicula.categoria === categoria.nombre);
    crearCarrusel(categoria.nombre, peliculasFiltradas);
  });
};

// Call the main function to create all carousels
crearTodosLosCaruseles();
// ----- ----- Carrusel. ----- -----
document.querySelectorAll(".peliculas-carousel").forEach((carousel) => {
  const fila = carousel.querySelector(".contenedor-carousel");
  const peliculas = carousel.querySelectorAll(".pelicula");
  const flechaIzquierda = carousel.querySelector(".flecha-izquierda");
  const flechaDerecha = carousel.querySelector(".flecha-derecha");
  const indicadoresContainer = carousel.querySelector(".indicadores");

  // Paginación
  const numeroPaginas = Math.ceil(peliculas.length / 5);
  for (let i = 0; i < numeroPaginas; i++) {
    const indicador = document.createElement("button");
    if (i === 0) {
      indicador.classList.add("activo");
    }
    indicadoresContainer.appendChild(indicador);
    indicador.addEventListener("click", (e) => {
      fila.scrollLeft = i * fila.offsetWidth;
      actualizarIndicadores(i);
    });
  }

  // Flechas de navegación
  flechaIzquierda.addEventListener("click", () => {
    const activeIndex = Array.from(indicadoresContainer.children).indexOf(
      carousel.querySelector(".indicadores .activo")
    );
    const newIndex = Math.max(activeIndex - 1, 0);
    fila.scrollLeft = newIndex * fila.offsetWidth;
    actualizarIndicadores(newIndex);
  });

  flechaDerecha.addEventListener("click", () => {
    const activeIndex = Array.from(indicadoresContainer.children).indexOf(
      carousel.querySelector(".indicadores .activo")
    );
    const newIndex = Math.min(activeIndex + 1, numeroPaginas - 1);
    fila.scrollLeft = newIndex * fila.offsetWidth;
    actualizarIndicadores(newIndex);
  });

  // Hover
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

  function actualizarIndicadores(index) {
    const activo = carousel.querySelector(".indicadores .activo");
    if (activo) activo.classList.remove("activo");
    indicadoresContainer.children[index].classList.add("activo");
  }
});

cargarPaginaPrincipal();
export function cargarPaginaPrincipal() {
  const $fondoPrincipal = document.querySelector("#fondoPrincipal");
  const $tituloPrincipal = document.querySelector("#tituloPrincipal");
  const $descripcionPrincipal = document.querySelector("#descripcionPrincipal");

  const peliculas = obtenerPeliculasDeLS();
  peliculas.forEach((pelicula) => {
    if (pelicula.destacada === true) {
      $fondoPrincipal.style.backgroundImage = `url(${pelicula.caratula})`;
      $tituloPrincipal.textContent = `${pelicula.titulo}`;
      $descripcionPrincipal.textContent = `${pelicula.descripcion}`;
    }
  });
}

/*
//PELICULA DESTACADA
const $card = document.createElement("div");
$card.classList.add("pelicula");
const $linkPelicula = document.createElement("a");
$linkPelicula.href = `./pages/error404.html`;
const $portadaPelicula = document.createElement("img");
$portadaPelicula.src = `${pelicula.caratula}`;
$portadaPelicula.alt = `${pelicula.nombre}`;
*/
/* 
Falta llamar al objeto del LS u obtener el objeto de otro lado
 */

//ESTRUCTURA CARD A ENCERRAR EN UN FOREACH
/* 
const $card = document.createElement("div");
$card.classList.add("pelicula");
const $linkPelicula = document.createElement("a");
$linkPelicula.href = `${inserteLinkPelicula}`;
const $portadaPelicula = document.createElement("img");
$portadaPelicula.src = `${inserteLinkPortada}`;
$portadaPelicula.alt = `${inserteDescripcion}`;
*/

//ESTRUCTURA CAROUSEL COMPLETO
/*
Se crean los dos contenedores que contrendan a las cartas
const $carouselContainer1 = document.createElement("div");
$carouselContainer1.classList.add("carousel");
const $carouselContainer2 = document.createElement("div");
$carouselContainer2.classList.add("carousel-container");

Se crean las cartas y se mete todo dentro uno de otro
APLICAR FOREACH
const $card = document.createElement("div");
$card.classList.add("pelicula");
const $linkPelicula = document.createElement("a");
$linkPelicula.href = `${inserteLinkPelicula}`;
const $portadaPelicula = document.createElement("img");
$portadaPelicula.src = `${inserteLinkPortada}`;
$portadaPelicula.alt = `${inserteDescripcion}`;
$linkPelicula.appendChild($portadaPelicula);
$card.appendChild($linkPelicula);
$carouselContainer1.appendChild($card);

Por aparte se hace el appenChild al Container2
$carouselContainer2.appendChild($carouselContainer1)

Se crean los botones
Boton Izquierdo
const $btnL = document.createElement("button");
$btnL.role = "button";
$btnL.classList.add("flecha-izquierda");
const $iconoL = document.createElement("i");
$iconoL.classList("fas", "fa-angle-left");
$btnL.appendChild("iconoL");
Boton Derecho
const $btnR = document.createElement("button");
$btnR.role = "button";
$btnR.classList.add("flecha-derecha");
const $iconoR = document.createElement("i");
$iconoR.classList("fas", "fa-angle-right");
$btnR.appendChild("iconoR");

Se crea el contenedor principal y se guarda todo dentro EN ORDEN
const $contenedorPrincipal = document.createElement("div");
$contenedorPrincipal.classList.add("contenedor-principal");
$contenedorPrincipal.appendChild($btnL);
$contenedorPrincipal.appendChild($carouselContainer2);
$contenedorPrincipal.appendChild($btnR);

Se crea el contenedor del titulo con los indicadores
const $h5 = document.createElement("h5");
$h5.textContent(`${Titulo}`);
const $indicadores = document.createElement("div");
$indicadores.classList.add("indicadores");
const $contenedorTituloControles = document.createElement("div");
$contenedorTituloControles.classList.add("contenedor-titulo-controles");
$contenedorTituloControles.appendChild($h5);
$contenedorTituloControles.appendChild($indicadores);

Se crea el ultimo contenedor que seria el carousel en si mismo
const $carousel = document.createElement("div");
$carousel.id = `${inserteID}`;
$carousel.classList.add("peliculas-carousel", "contenedor");
$carousel.appendChild($contenedorTituloControles);
$carousel.appendChild($contenedorPrincipal);

Y ya estaria listo para integrarse al main con un appendChild
          */
