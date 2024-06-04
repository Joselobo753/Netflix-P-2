
import { validateNombre, validateEmail, validateMsg } from "../validadores.js";
import { MensajeContacto } from "./MensajeContacto.js";
import { agregarALS, enviarMail, resetInput } from "../utils.js";

const $formularioCompleto = document.querySelector("#formularioCompleto");

const $inputNombre = document.querySelector("#inputNombre");
const $inputEmail = document.querySelector("#inputEmail");
const $inputMensaje = document.querySelector("#inputMensaje");

const $btnEnviar = document.querySelector("#btnEnviar");
const $btnBorrar = document.querySelector("#btnBorrar");

$inputNombre.addEventListener("blur", () => {
  validateNombre($inputNombre);
});
$inputEmail.addEventListener("blur", () => {
  validateEmail($inputEmail);
});

$inputMensaje.addEventListener("blur", () => {
  validateMsg($inputMensaje);
});

$btnBorrar.addEventListener("click", (event) => {
  event.preventDefault();

  $formularioCompleto.reset();
});

$btnEnviar.addEventListener("click", (event) => {
  event.preventDefault();

  if (
    !validateNombre($inputNombre) ||
    !validateEmail($inputEmail) ||
    !validateMsg($inputMensaje)
  ) {
    alert("Revisa los campos ingresados");
    //REEMPLAZAR ALERT POR SWEETALERT
    return;
  }

  let nombre = $inputNombre.value;
  let email = $inputEmail.value;
  let msg = $inputMensaje.value;

  const mensaje = new MensajeContacto(nombre, email, msg);
  agregarALS(mensaje, "listaMensajes");

  let msgMail = `Se recibio un formulario de contacto de ${email}: ${msg}`;
  let tituloMail = `Formulario de contacto de ${nombre}`;
  enviarMail(tituloMail, msgMail);

  //REEMPLAZAR ALERT POR SWEETALERT
  resetInput($inputEmail);
  resetInput($inputNombre);
  resetInput($inputMensaje);
  $formularioCompleto.reset();
  Swal.fire("Formulario enviado correctamente!");
  return;
});
