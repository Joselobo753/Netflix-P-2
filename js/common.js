import { obtenerPeliculasDeLS } from "./utils.js";

const $header = document.querySelector("header");

window.addEventListener("scroll", () => {
  let scroll = window.scrollY;
  if (scroll > 0) {
    $header.style.backgroundColor = "rgba(0,0,0,0.7)";
  } else {
    $header.style.backgroundColor = "transparent";
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase();
    const peliculas = obtenerPeliculasDeLS();
    
    const filteredPeliculas = peliculas.filter(pelicula => 
      pelicula.titulo.toLowerCase().includes(term) || 
      pelicula.categoria.toLowerCase().includes(term)
    );

    // Limpiar los resultados anteriores
    searchResults.innerHTML = '';

    // Mostrar los resultados filtrados
    filteredPeliculas.forEach(pelicula => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item');
      listItem.textContent = `${pelicula.titulo}`;
      listItem.addEventListener('click', () => {
        // window.location.href = `/path_to_your_movie_page/${pelicula.id}`; // Ajustar el path 
      });
      searchResults.appendChild(listItem);
    });
  });
});

