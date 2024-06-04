import { obtenerPeliculasDeLS } from "./utils.js";

const $header = document.querySelector("header");
const $btnCerrar = document.querySelector("#btnCerrar");
const $btnLogin = document.querySelector("#btnLogin");
const pageTitle = document.title;

if (pageTitle === "Administrador") {
  $btnCerrar.classList.remove("d-none");
  $btnLogin.classList.add("d-none");
}

$btnCerrar.addEventListener("click", (event) => {
  event.preventDefault();
  sessionStorage.removeItem("estaLogueado");
  window.location.replace("../index.html");
});

window.addEventListener("scroll", () => {
  let scroll = window.scrollY;
  if (scroll > 0) {
    $header.style.backgroundColor = "rgba(0,0,0,0.7)";
  } else {
    $header.style.backgroundColor = "transparent";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    const peliculas = obtenerPeliculasDeLS();

    const filteredPeliculas = peliculas.filter(
      (pelicula) =>
        pelicula.titulo.toLowerCase().includes(term) ||
        pelicula.categoria.toLowerCase().includes(term)
    );

    // Limpiar los resultados anteriores
    searchResults.innerHTML = "";

    // Mostrar los resultados filtrados
    filteredPeliculas.forEach((pelicula) => {
      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item");
      const listA = document.createElement("a");
      if (pageTitle === "Netflix") {
        listA.href = `./pages/ver.html?codigo=${pelicula.codigo}`;
      } else {
        listA.href = `./ver.html?codigo=${pelicula.codigo}`;
      }
      listA.textContent = `${pelicula.titulo}`;
      listItem.appendChild(listA);
      searchResults.appendChild(listItem);
    });
  });
});
