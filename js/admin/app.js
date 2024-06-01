import { validateImg, validateTexto, validateUrl } from "../validadores.js";
import { cargarTabla } from "./ultis.js";



cargarTabla();



const $form = document.getElementById("formulario")
const $inputNombre = document.getElementById("nombre")
const $inputTipo = document.getElementById("tipo")
const $inputCaratula = document.getElementById("caratula")
const $inputTrailer = document.getElementById("trailer")
const $inputDescripcion = document.getElementById("descripcion")

$inputNombre.addEventListener("blur",()=>{
    validateTexto($inputNombre)
})
$inputCaratula.addEventListener("blur",()=>{
    validateImg($inputCaratula)
})
$inputTrailer.addEventListener("blur",()=>{
    validateUrl($inputTrailer)
})
$inputDescripcion.addEventListener("blur",()=>{
    validateTexto($inputDescripcion)
})

$form.addEventListener("submit",(e)=>{
    e.preventDefault();
    if (
        !validateTexto($inputNombre)||
        !validateImg($inputCaratula)||
        !validateUrl($inputTrailer)||
        !validateTexto($inputDescripcion)
    ) {
        alert("Revisar los campos")
        return;
    }
    const titulo = $inputNombre.value
    const tipo = $inputTipo.value
    const caratula = $inputCaratula.value
    const trailer = $inputCaratula.value
    const descripcion = $inputDescripcion.value

    (titulo,tipo,caratula,trailer,descripcion)


$form.reset();
  $inputNombre.classList.remove('is-valid', 'is-invalid');
  $inputTipo.classList.remove('is-valid', 'is-invalid');
  $inputCaratula.classList.remove('is-valid', 'is-invalid');
  $inputTrailer.classList.remove('is-valid', 'is-invalid');
  $inputDescripcion.classList.remove('is-valid', 'is-invalid');

  // D. Actualizar tabla

  cargarTabla();

  // E. Notificar al usuario

  let mensaje = `Nueva pelicula creada`;
  if (estaEditando()) mensaje = 'Pelicula editado exitosamente';

  swal.fire({
    title: 'Exito',
    text: mensaje,
    icon: 'success',
    showConfirmButton: true,
    showCancelButton: false,
    confirmButtonText: 'Tremen2',
  });
});