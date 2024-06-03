import { estaLogueado } from "../utils.js";
import { Usuario } from "./Usuario.js";
import { validateEmail, validateNombre, validatePss } from "../validadores.js";

const currentURL = window.location.href;
console.log(currentURL);

const $btnLogin = document.querySelector("#btnLogin");
const $logemail = document.querySelector("#logemail");
const $logpass = document.querySelector("#logpass");
const $logname = document.querySelector("#logname");
const $btnRegistro = document.querySelector("#btnRegistro");
const $btnIS = document.querySelector("#btnIS");
const $logssemail = document.querySelector("#logssemail");
const $logsspass = document.querySelector("#logsspass");

//Usuario del administrador
const usuarioAdmin = new Usuario("admin", "admin12345");

//Boton que redirije a admin si esta logueado
$btnLogin.addEventListener("click", () => {
  if (estaLogueado()) {
    if (currentURL === "index.html") {
      window.location.replace("./pages/admin.html");
    }
    window.location.replace("./admin.html");
  }

  return;
});

//Registro
$logemail.addEventListener("blur", () => {
  validateEmail($logemail);
});

$logname.addEventListener("blur", () => {
  validateNombre($logname);
});

$logpass.addEventListener("blur", () => {
  validatePss($logpass);
});

$btnRegistro.addEventListener("click", () => {
  if (
    !validateEmail($logemail) ||
    !validateNombre($logname) ||
    !validatePss($logpass)
  ) {
    return;
  }

  if (currentURL === "index.html") {
    window.location.replace("./pages/error404.html");
  }
  window.location.replace("./error404.html");
});

//Login
$btnIS.addEventListener("click", () => {
  let email = $logssemail.value;
  let pass = $logsspass.value;
  if (email === usuarioAdmin.email && pass === usuarioAdmin.contrasenia) {
    if (currentURL === "index.html") {
      window.location.replace("./pages/admin.html");
    }
    window.location.replace("./admin.html");
    sessionStorage.setItem("estaLogueado", true);
    return;
  }

  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "El mail o la contraseña son incorrectos",
    width: 600,
    padding: "3em",
    color: "#E50914",
    background: "#141414",
  });
});
