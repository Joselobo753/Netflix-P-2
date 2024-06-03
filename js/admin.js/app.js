import { validateImg, validateTexto, validateUrl } from "../validadores.js";
import { agregarPelicula, crearCategoria, editarPelicula } from "./abm.js";
import { cargarTablaPeliculas, cargartabla, estaEditando, leerCategorias } from "./ultis.js";



cargarTablaPeliculas();



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

$form.addEventListener("click",(e)=>{
    e.preventDefault();
    /* if (
        !validateTexto($inputNombre)||
        !validateImg($inputCaratula)||
        !validateUrl($inputTrailer)||
        !validateTexto($inputDescripcion)
    ) {
        alert("Revisar los campos")
        return;
    }
*/    const titulo = $inputNombre.value
    const tipo = $inputTipo.value
    const caratula = $inputCaratula.value
    const trailer = $inputCaratula.value
    const descripcion = $inputDescripcion.value
 if (estaEditando()) {
    agregarPelicula(titulo,tipo,caratula,trailer,descripcion)
    
 }else{
    editarPelicula(titulo,tipo,caratula,trailer,descripcion)
}
   


    document.getElementById("formularioPeliculas").reset();
  $inputNombre.classList.remove('is-valid', 'is-invalid');
  $inputTipo.classList.remove('is-valid', 'is-invalid');
  $inputCaratula.classList.remove('is-valid', 'is-invalid');
  $inputTrailer.classList.remove('is-valid', 'is-invalid');
  $inputDescripcion.classList.remove('is-valid', 'is-invalid');

  

  cargarTablaPeliculas();

  

  let mensaje = `Nueva pelicula creada`;

  swal.fire({
    title: 'Exito',
    text: mensaje,
    icon: 'success',
    showConfirmButton: true,
    showCancelButton: false,
    confirmButtonText: 'Genial',
  });
});

document.getElementById('categoriaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombreCat').value;
    const calificacion = document.getElementById('calificacion').value;
    crearCategoria(nombre,calificacion);
    mostrarCategorias();
    cargartabla()
    document.getElementById('categoriaForm').reset();
});

export function mostrarCategorias() {
    const categorias = leerCategorias();
    const selectCategoria = document.getElementById('categoria');
    selectCategoria.innerHTML = '';
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.codigo;
        option.textContent = categoria.nombre;
        selectCategoria.appendChild(option);
    });
}
mostrarCategorias();
cargartabla()