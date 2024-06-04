const $header = document.querySelector("header");

window.addEventListener("scroll", () => {
  let scroll = window.scrollY;
  if (scroll > 0) {
    $header.style.backgroundColor = "rgba(0,0,0,0.7)";
  } else {
    $header.style.backgroundColor = "transparent";
  }
});
