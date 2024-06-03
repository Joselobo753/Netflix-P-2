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


